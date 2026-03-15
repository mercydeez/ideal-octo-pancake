"use client";

import React, { useEffect, useRef } from 'react';
import {
  Vector3,
  Clock,
  AmbientLight,
  Scene,
  SRGBColorSpace,
  MathUtils,
  PMREMGenerator,
  Vector2,
  WebGLRenderer,
  PerspectiveCamera,
  PointLight,
  ACESFilmicToneMapping,
  Plane,
  Raycaster,
  Mesh,
  SphereGeometry,
  MeshPhysicalMaterial,
  CanvasTexture,
  Group,
  Object3D,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// --- Types ---

export interface Skill {
  name: string;
  color?: string;
  logo?: string;
}

export interface BallpitProps {
  className?: string;
  skills?: Skill[];
  followCursor?: boolean;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  minSize?: number;
  maxSize?: number;
  size0?: number;
  maxVelocity?: number;
  maxX?: number;
  maxY?: number;
  maxZ?: number;
}

interface Size {
  width: number;
  height: number;
  wWidth: number;
  wHeight: number;
  ratio: number;
  pixelRatio: number;
}

interface ClockData {
  elapsed: number;
  delta: number;
}

interface PhysicsConfig {
  count: number;
  minSize: number;
  maxSize: number;
  size0: number;
  gravity: number;
  friction: number;
  wallBounce: number;
  maxVelocity: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  controlSphere0: boolean;
}

// --- Helpers ---

class ThreeApp {
  canvas: HTMLCanvasElement;
  camera: PerspectiveCamera;
  cameraFov: number;
  cameraMaxAspect?: number;
  maxPixelRatio?: number;
  minPixelRatio?: number;
  scene: Scene;
  renderer: WebGLRenderer;
  size: Size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  render: () => void;
  onBeforeRender: (clock: ClockData) => void = () => { };
  onAfterRender: (clock: ClockData) => void = () => { };
  onAfterResize: (size: Size) => void = () => { };

  private _cfg: any;
  private _visible = false;
  private _running = false;
  isDisposed = false;
  private _iObs?: IntersectionObserver;
  private _rObs?: ResizeObserver;
  private _resizeTimer?: any;
  private _clock = new Clock();
  private _cd: ClockData = { elapsed: 0, delta: 0 };
  private _raf?: number;

  constructor(cfg: any) {
    this._cfg = { ...cfg };
    this.camera = new PerspectiveCamera();
    this.cameraFov = this.camera.fov;
    this.scene = new Scene();
    this.canvas = cfg.canvas || (document.getElementById(cfg.id) as HTMLCanvasElement);
    this.canvas.style.display = 'block';
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      powerPreference: 'high-performance',
      ...(cfg.rendererOptions ?? {})
    });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.render = () => this.renderer.render(this.scene, this.camera);
    this.resize();
    this._bind();
  }

  private _bind() {
    if (!(this._cfg.size instanceof Object)) {
      window.addEventListener('resize', this._onResize);
      if (this._cfg.size === 'parent' && this.canvas.parentNode) {
        this._rObs = new ResizeObserver(this._onResize);
        this._rObs.observe(this.canvas.parentNode as Element);
      }
    }
    this._iObs = new IntersectionObserver(([e]) => {
      this._visible = e.isIntersecting;
      this._visible ? this._start() : this._stop();
    }, { threshold: 0 });
    this._iObs.observe(this.canvas);
    document.addEventListener('visibilitychange', this._onVis);
  }

  private _onResize = () => {
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => { this.resize(); this.onAfterResize(this.size); }, 100);
  };
  
  private _onVis = () => { if (this._visible) { document.hidden ? this._stop() : this._start(); } };

  resize() {
    const cfg = this._cfg;
    let W, H;
    if (cfg.size instanceof Object) {
      W = cfg.size.width;
      H = cfg.size.height;
    } else if (cfg.size === 'parent' && this.canvas.parentNode) {
      W = (this.canvas.parentNode as HTMLElement).offsetWidth;
      H = (this.canvas.parentNode as HTMLElement).offsetHeight;
    } else {
      W = window.innerWidth;
      H = window.innerHeight;
    }
    this.size.width = W;
    this.size.height = H;
    this.size.ratio = W / H;
    this.camera.aspect = W / H;
    if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
      const tH = Math.tan(MathUtils.degToRad(this.cameraFov / 2)) / (this.camera.aspect / this.cameraMaxAspect);
      this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(tH));
    } else {
      this.camera.fov = this.cameraFov;
    }
    this.camera.updateProjectionMatrix();

    const fR = (this.camera.fov * Math.PI) / 180;
    this.size.wHeight = 2 * Math.tan(fR / 2) * this.camera.position.length();
    this.size.wWidth = this.size.wHeight * this.camera.aspect;

    this.renderer.setSize(W, H);
    let dpr = window.devicePixelRatio;
    if (this.maxPixelRatio) dpr = Math.min(dpr, this.maxPixelRatio);
    if (this.minPixelRatio) dpr = Math.max(dpr, this.minPixelRatio);
    this.renderer.setPixelRatio(dpr);
    this.size.pixelRatio = dpr;
  }

  private _start() {
    if (this._running) return;
    this._running = true;
    this._clock.start();
    const tick = () => {
      this._raf = requestAnimationFrame(tick);
      this._cd.delta = this._clock.getDelta();
      this._cd.elapsed += this._cd.delta;
      this.onBeforeRender(this._cd);
      this.render();
      this.onAfterRender(this._cd);
    };
    tick();
  }

  private _stop() {
    if (!this._running) return;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._running = false;
    this._clock.stop();
  }

  dispose() {
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('visibilitychange', this._onVis);
    this._rObs?.disconnect();
    this._iObs?.disconnect();
    this._stop();
    this.scene.traverse(obj => {
      if ((obj as Mesh).isMesh) {
        (obj as Mesh).geometry?.dispose();
        ((obj as Mesh).material as any)?.dispose();
      }
    });
    this.scene.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.isDisposed = true;
  }
}

// --- Pointer tracker ---

interface PointerState {
  position: Vector2;
  nPosition: Vector2;
  hover: boolean;
  touching: boolean;
  onEnter: (st: PointerState) => void;
  onMove: (st: PointerState) => void;
  onLeave: (st: PointerState) => void;
  domElement: HTMLCanvasElement;
  dispose?: () => void;
}

const ptrMap = new Map<HTMLCanvasElement, PointerState>();
const globalPos = new Vector2();
let ptrBound = false;

function makePointer(opts: { domElement: HTMLCanvasElement } & Partial<PointerState>): PointerState {
  const state: PointerState = {
    position: new Vector2(),
    nPosition: new Vector2(),
    hover: false,
    touching: false,
    onEnter: () => { },
    onMove: () => { },
    onLeave: () => { },
    ...opts,
    domElement: opts.domElement,
  };

  if (!ptrMap.has(opts.domElement)) {
    ptrMap.set(opts.domElement, state);
    if (!ptrBound) {
      document.body.addEventListener('pointermove', onPtrMove);
      document.body.addEventListener('pointerleave', onPtrLeave);
      document.body.addEventListener('touchstart', onTouchStart, { passive: false });
      document.body.addEventListener('touchmove', onTouchMove, { passive: false });
      document.body.addEventListener('touchend', onTouchEnd, { passive: false });
      document.body.addEventListener('touchcancel', onTouchEnd, { passive: false });
      ptrBound = true;
    }
  }

  state.dispose = () => {
    ptrMap.delete(opts.domElement);
    if (ptrMap.size === 0) {
      document.body.removeEventListener('pointermove', onPtrMove);
      document.body.removeEventListener('pointerleave', onPtrLeave);
      document.body.removeEventListener('touchstart', onTouchStart);
      document.body.removeEventListener('touchmove', onTouchMove);
      document.body.removeEventListener('touchend', onTouchEnd);
      document.body.removeEventListener('touchcancel', onTouchEnd);
      ptrBound = false;
    }
  };

  return state;
}

function updateNPos(state: PointerState, elem: HTMLCanvasElement) {
  const rc = elem.getBoundingClientRect();
  state.position.set(globalPos.x - rc.left, globalPos.y - rc.top);
  state.nPosition.set((state.position.x / rc.width) * 2 - 1, (-state.position.y / rc.height) * 2 + 1);
}

function isOver(elem: HTMLCanvasElement) {
  const rc = elem.getBoundingClientRect();
  return globalPos.x >= rc.left && globalPos.x <= rc.right && globalPos.y >= rc.top && globalPos.y <= rc.bottom;
}

function onPtrMove(e: PointerEvent) {
  globalPos.set(e.clientX, e.clientY);
  for (const [el, st] of ptrMap) {
    updateNPos(st, el);
    if (isOver(el)) {
      if (!st.hover) { st.hover = true; st.onEnter(st); }
      st.onMove(st);
    } else if (st.hover && !st.touching) {
      st.hover = false;
      st.onLeave(st);
    }
  }
}

function onPtrLeave() {
  for (const st of ptrMap.values()) {
    if (st.hover) {
      st.hover = false;
      st.onLeave(st);
    }
  }
}

function onTouchStart(e: TouchEvent) {
  if (!e.touches.length) return;
  e.preventDefault();
  globalPos.set(e.touches[0].clientX, e.touches[0].clientY);
  for (const [el, st] of ptrMap) {
    if (isOver(el)) {
      st.touching = true;
      updateNPos(st, el);
      if (!st.hover) { st.hover = true; st.onEnter(st); }
      st.onMove(st);
    }
  }
}

function onTouchMove(e: TouchEvent) {
  if (!e.touches.length) return;
  e.preventDefault();
  globalPos.set(e.touches[0].clientX, e.touches[0].clientY);
  for (const [el, st] of ptrMap) {
    updateNPos(st, el);
    if (isOver(el)) {
      if (!st.hover) { st.hover = true; st.touching = true; st.onEnter(st); }
      st.onMove(st);
    } else if (st.hover && st.touching) {
      st.onMove(st);
    }
  }
}

function onTouchEnd() {
  for (const st of ptrMap.values()) {
    if (st.touching) {
      st.touching = false;
      if (st.hover) {
        st.hover = false;
        st.onLeave(st);
      }
    }
  }
}

// --- Physics ---

const pA = new Vector3(), pB = new Vector3(), pC = new Vector3(), vA = new Vector3(), vB = new Vector3(), diff = new Vector3(), push = new Vector3();

class Physics {
  config: PhysicsConfig;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center = new Vector3();

  constructor(cfg: PhysicsConfig) {
    this.config = { ...cfg };
    this.positionData = new Float32Array(3 * cfg.count).fill(0);
    this.velocityData = new Float32Array(3 * cfg.count).fill(0);
    this.sizeData = new Float32Array(cfg.count).fill(1);

    // scatter balls initially
    for (let i = 1; i < cfg.count; i++) {
      const b = 3 * i;
      this.positionData[b] = MathUtils.randFloatSpread(2 * cfg.maxX);
      this.positionData[b + 1] = MathUtils.randFloatSpread(2 * cfg.maxY);
      this.positionData[b + 2] = MathUtils.randFloatSpread(2 * cfg.maxZ);
    }
    // sizes
    this.sizeData[0] = cfg.size0 || 0.8;
    for (let i = 1; i < cfg.count; i++) {
      this.sizeData[i] = MathUtils.randFloat(cfg.minSize, cfg.maxSize);
    }
  }

  update(clock: ClockData) {
    const { config: cfg, positionData: pos, velocityData: vel, sizeData: sz, center } = this;
    const start = cfg.controlSphere0 ? 1 : 0;

    // cursor sphere lerps to center
    if (cfg.controlSphere0) {
      pA.fromArray(pos, 0).lerp(center, 0.1).toArray(pos, 0);
      vA.set(0, 0, 0).toArray(vel, 0);
    }

    for (let i = start; i < cfg.count; i++) {
      const b = 3 * i;
      pA.fromArray(pos, b); vA.fromArray(vel, b);

      // gravity
      vA.y -= clock.delta * cfg.gravity * sz[i];

      // center attraction when cursor not active
      if (!cfg.controlSphere0) {
        vA.x += -pos[b] * 0.0015;
        vA.y += -pos[b + 1] * 0.0015;
      }

      vA.multiplyScalar(cfg.friction);
      vA.clampLength(0, cfg.maxVelocity);
      pA.add(vA);
      pA.toArray(pos, b); vA.toArray(vel, b);
    }

    // collisions
    for (let i = start; i < cfg.count; i++) {
      const bi = 3 * i;
      pA.fromArray(pos, bi); vA.fromArray(vel, bi);
      for (let j = i + 1; j < cfg.count; j++) {
        const bj = 3 * j;
        pB.fromArray(pos, bj); vB.fromArray(vel, bj);
        diff.copy(pB).sub(pA);
        const dist = diff.length();
        const minD = sz[i] + sz[j];
        if (dist < minD && dist > 0.001) {
          const ov = minD - dist;
          push.copy(diff).normalize().multiplyScalar(0.5 * ov);
          pA.sub(push); pB.add(push);
          const impA = push.clone().multiplyScalar(Math.max(vA.length(), 1));
          const impB = push.clone().multiplyScalar(Math.max(vB.length(), 1));
          vA.sub(impA); vB.add(impB);
          pA.toArray(pos, bi); vA.toArray(vel, bi);
          pB.toArray(pos, bj); vB.toArray(vel, bj);
        }
      }

      if (cfg.controlSphere0) {
        pC.fromArray(pos, 0);
        diff.copy(pC).sub(pA);
        const d = diff.length();
        const minD0 = sz[i] + sz[0];
        if (d < minD0 && d > 0.001) {
          const ov = minD0 - d;
          push.copy(diff).normalize().multiplyScalar(ov);
          const imp = push.clone().multiplyScalar(Math.max(vA.length(), 2));
          pA.sub(push); vA.sub(imp);
        }
      }

      // walls
      const { maxX, maxY, maxZ, wallBounce } = cfg;
      const r = sz[i];
      if (pA.x - r < -maxX) { pA.x = -maxX + r; vA.x = Math.abs(vA.x) * wallBounce; }
      if (pA.x + r > maxX) { pA.x = maxX - r; vA.x = -Math.abs(vA.x) * wallBounce; }
      if (cfg.gravity === 0) {
        if (pA.y - r < -maxY) { pA.y = -maxY + r; vA.y = Math.abs(vA.y) * wallBounce; }
        if (pA.y + r > maxY) { pA.y = maxY - r; vA.y = -Math.abs(vA.y) * wallBounce; }
      } else if (pA.y - r < -maxY) {
        pA.y = -maxY + r; vA.y = Math.abs(vA.y) * wallBounce;
      }
      if (Math.abs(pA.z) + r > Math.max(maxZ, cfg.maxSize || 1)) {
        pA.z = Math.sign(pA.z) * (maxZ - r); vA.z = -vA.z * wallBounce;
      }
      pA.toArray(pos, bi); vA.toArray(vel, bi);
    }
  }
}

// --- Logo texture baked onto sphere ---

function makeLogoTexture(skill: Skill): Promise<CanvasTexture> {
  return new Promise(resolve => {
    const S = 512;
    const cv = document.createElement('canvas');
    cv.width = cv.height = S;
    const ctx = cv.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
    ctx.fill();

    const finish = () => resolve(new CanvasTexture(cv));

    const drawImg = (img: HTMLImageElement | null) => {
      const pad = S * 0.22;
      const sz = S - pad * 2;
      if (img) {
        ctx.shadowColor = 'rgba(0,0,0,0.15)';
        ctx.shadowBlur = 8;
        ctx.drawImage(img, pad, pad, sz, sz);
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = '#444';
        ctx.font = `bold ${Math.round(S * 0.2)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((skill.name || '').slice(0, 4), S / 2, S / 2);
      }
      finish();
    };

    if (skill.logo) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => drawImg(img);
      img.onerror = () => drawImg(null);
      img.src = skill.logo;
    } else {
      drawImg(null);
    }
  });
}

// --- Main constructor ---

function createBallpit(canvas: HTMLCanvasElement, skills: Skill[] = [], opts: any = {}) {
  const count = skills.length + 1;
  const cfg: PhysicsConfig = {
    count,
    minSize: 0.5,
    maxSize: 1.1,
    size0: 0.8,
    gravity: opts.gravity ?? 0,
    friction: opts.friction ?? 0.9975,
    wallBounce: opts.wallBounce ?? 0.85,
    maxVelocity: 0.15,
    maxX: 5,
    maxY: 5,
    maxZ: 2,
    controlSphere0: false,
    ...opts,
  };

  const three = new ThreeApp({ canvas, size: 'parent', rendererOptions: { antialias: true, alpha: true } });
  three.renderer.toneMapping = ACESFilmicToneMapping;
  three.camera.position.set(0, 0, 20);
  three.camera.lookAt(0, 0, 0);
  three.cameraMaxAspect = 1.5;
  three.resize();

  canvas.style.touchAction = 'none';
  canvas.style.userSelect = 'none';

  const pmrem = new PMREMGenerator(three.renderer);
  const envMap = pmrem.fromScene(new RoomEnvironment(three.renderer)).texture;
  pmrem.dispose();

  three.scene.add(new AmbientLight(0xffffff, 1.2));
  const ptLight = new PointLight(0xffffff, 300);
  three.scene.add(ptLight);
  const ptLight2 = new PointLight(0x8888ff, 100);
  ptLight2.position.set(-10, 10, 5);
  three.scene.add(ptLight2);

  const geo = new SphereGeometry(1, 64, 64);
  const physics = new Physics(cfg);
  const group = new Group();
  three.scene.add(group);

  const cursorMesh = new Mesh(geo, new MeshPhysicalMaterial({ transparent: true, opacity: 0 }));
  group.add(cursorMesh);

  const skillMeshes = skills.map(() => {
    const mat = new MeshPhysicalMaterial({
      color: 0xffffff, envMap,
      metalness: 0.05, roughness: 0.12,
      clearcoat: 1.0, clearcoatRoughness: 0.04,
    });
    const mesh = new Mesh(geo, mat);
    group.add(mesh);
    return mesh;
  });

  skills.forEach((skill, idx) => {
    makeLogoTexture(skill).then(tex => {
      tex.colorSpace = SRGBColorSpace;
      skillMeshes[idx].material = new MeshPhysicalMaterial({
        color: 0xffffff, map: tex, envMap,
        metalness: 0.05, roughness: 0.12,
        clearcoat: 1.0, clearcoatRoughness: 0.04,
      });
    });
  });

  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const hitPt = new Vector3();
  const ptr = makePointer({
    domElement: canvas,
    onMove() {
      raycaster.setFromCamera(ptr.nPosition, three.camera);
      three.camera.getWorldDirection(plane.normal);
      raycaster.ray.intersectPlane(plane, hitPt);
      physics.center.copy(hitPt);
      physics.config.controlSphere0 = true;
    },
    onLeave() {
      physics.center.set(0, 0, 0);
      physics.config.controlSphere0 = false;
    },
  });

  three.onAfterResize = sz => {
    physics.config.maxX = sz.wWidth / 2;
    physics.config.maxY = sz.wHeight / 2;
  };

  three.onBeforeRender = clock => {
    physics.update(clock);
    cursorMesh.position.fromArray(physics.positionData, 0);
    cursorMesh.scale.setScalar(physics.sizeData[0]);

    skillMeshes.forEach((mesh, i) => {
      const b = (i + 1) * 3;
      mesh.position.set(physics.positionData[b], physics.positionData[b + 1], physics.positionData[b + 2]);
      mesh.scale.setScalar(physics.sizeData[i + 1]);
      mesh.rotation.y += clock.delta * 0.25;
      mesh.rotation.x += clock.delta * 0.08;
    });

    ptLight.position.fromArray(physics.positionData, 0);
  };

  return {
    three,
    physics,
    dispose() {
      ptr.dispose?.();
      geo.dispose();
      three.dispose();
    }
  };
}

// --- Component ---

const Ballpit: React.FC<BallpitProps> = ({ className = '', skills = [], followCursor = true, ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = () => {
      if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        requestAnimationFrame(init);
        return;
      }
      instRef.current = createBallpit(canvas, skills, {
        followCursor,
        gravity: props.gravity ?? 0,
        friction: props.friction ?? 0.9975,
        wallBounce: props.wallBounce ?? 0.85,
        minSize: props.minSize ?? 0.5,
        maxSize: props.maxSize ?? 1.1,
      });
    };

    requestAnimationFrame(init);

    return () => {
      if (instRef.current) {
        instRef.current.dispose();
        instRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className={`${className} w-full h-full block`} />;
};

export default Ballpit;
