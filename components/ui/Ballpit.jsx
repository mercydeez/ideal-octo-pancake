"use client";
import { useEffect, useRef } from 'react';
import {
  Vector3 as a,
  Clock as e,
  AmbientLight as f,
  Scene as i,
  SRGBColorSpace as n,
  MathUtils as o,
  PMREMGenerator as p,
  Vector2 as r,
  WebGLRenderer as s,
  PerspectiveCamera as t,
  PointLight as u,
  ACESFilmicToneMapping as v,
  Plane as w,
  Raycaster as y,
  Mesh,
  SphereGeometry,
  MeshPhysicalMaterial,
  CanvasTexture,
  Group,
  Object3D as m,
} from 'three';
import { RoomEnvironment as z } from 'three/examples/jsm/environments/RoomEnvironment.js';

// ── ThreeApp ──────────────────────────────────────────────────────────────────
class ThreeApp {
  canvas; camera; cameraFov; cameraMaxAspect; maxPixelRatio; minPixelRatio;
  scene; renderer; size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  render; onBeforeRender = () => { }; onAfterRender = () => { }; onAfterResize = () => { };
  #cfg; #visible = false; #running = false; isDisposed = false;
  #iObs; #rObs; #resizeTimer; #clock = new e(); #cd = { elapsed: 0, delta: 0 }; #raf;

  constructor(cfg) {
    this.#cfg = { ...cfg };
    this.camera = new t(); this.cameraFov = this.camera.fov;
    this.scene = new i();
    this.canvas = cfg.canvas || document.getElementById(cfg.id);
    this.canvas.style.display = 'block';
    this.renderer = new s({ canvas: this.canvas, powerPreference: 'high-performance', ...(cfg.rendererOptions ?? {}) });
    this.renderer.outputColorSpace = n;
    this.render = () => this.renderer.render(this.scene, this.camera);
    this.resize();
    this.#bind();
  }

  #bind() {
    if (!(this.#cfg.size instanceof Object)) {
      window.addEventListener('resize', this.#onResize);
      if (this.#cfg.size === 'parent' && this.canvas.parentNode) {
        this.#rObs = new ResizeObserver(this.#onResize);
        this.#rObs.observe(this.canvas.parentNode);
      }
    }
    this.#iObs = new IntersectionObserver(([e]) => {
      this.#visible = e.isIntersecting;
      this.#visible ? this.#start() : this.#stop();
    }, { threshold: 0 });
    this.#iObs.observe(this.canvas);
    document.addEventListener('visibilitychange', this.#onVis);
  }

  #onResize = () => {
    clearTimeout(this.#resizeTimer);
    this.#resizeTimer = setTimeout(() => { this.resize(); this.onAfterResize(this.size); }, 100);
  };
  #onVis = () => { if (this.#visible) { document.hidden ? this.#stop() : this.#start(); } };

  resize() {
    const cfg = this.#cfg; let W, H;
    if (cfg.size instanceof Object) { W = cfg.size.width; H = cfg.size.height; }
    else if (cfg.size === 'parent' && this.canvas.parentNode) { W = this.canvas.parentNode.offsetWidth; H = this.canvas.parentNode.offsetHeight; }
    else { W = window.innerWidth; H = window.innerHeight; }
    this.size.width = W; this.size.height = H; this.size.ratio = W / H;
    this.camera.aspect = W / H;
    if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
      const tH = Math.tan(o.degToRad(this.cameraFov / 2)) / (this.camera.aspect / this.cameraMaxAspect);
      this.camera.fov = 2 * o.radToDeg(Math.atan(tH));
    } else { this.camera.fov = this.cameraFov; }
    this.camera.updateProjectionMatrix();
    const fR = (this.camera.fov * Math.PI) / 180;
    this.size.wHeight = 2 * Math.tan(fR / 2) * this.camera.position.length();
    this.size.wWidth = this.size.wHeight * this.camera.aspect;
    this.renderer.setSize(W, H);
    let dpr = window.devicePixelRatio;
    if (this.maxPixelRatio) dpr = Math.min(dpr, this.maxPixelRatio);
    if (this.minPixelRatio) dpr = Math.max(dpr, this.minPixelRatio);
    this.renderer.setPixelRatio(dpr); this.size.pixelRatio = dpr;
  }

  #start() {
    if (this.#running) return;
    this.#running = true; this.#clock.start();
    const tick = () => {
      this.#raf = requestAnimationFrame(tick);
      this.#cd.delta = this.#clock.getDelta(); this.#cd.elapsed += this.#cd.delta;
      this.onBeforeRender(this.#cd); this.render(); this.onAfterRender(this.#cd);
    };
    tick();
  }
  #stop() { if (!this.#running) return; cancelAnimationFrame(this.#raf); this.#running = false; this.#clock.stop(); }

  dispose() {
    window.removeEventListener('resize', this.#onResize);
    document.removeEventListener('visibilitychange', this.#onVis);
    this.#rObs?.disconnect(); this.#iObs?.disconnect(); this.#stop();
    this.scene.traverse(obj => { if (obj.isMesh) { obj.geometry?.dispose(); obj.material?.dispose(); } });
    this.scene.clear(); this.renderer.dispose(); this.renderer.forceContextLoss(); this.isDisposed = true;
  }
}

// ── Pointer tracker ───────────────────────────────────────────────────────────
const ptrMap = new Map(); const globalPos = new r(); let ptrBound = false;
function makePointer(opts) {
  const state = {
    position: new r(), nPosition: new r(), hover: false, touching: false,
    onEnter() { }, onMove() { }, onLeave() { }, ...opts
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
function updateNPos(state, elem) {
  const rc = elem.getBoundingClientRect();
  state.position.set(globalPos.x - rc.left, globalPos.y - rc.top);
  state.nPosition.set((state.position.x / rc.width) * 2 - 1, (-state.position.y / rc.height) * 2 + 1);
}
function isOver(elem) {
  const rc = elem.getBoundingClientRect();
  return globalPos.x >= rc.left && globalPos.x <= rc.right && globalPos.y >= rc.top && globalPos.y <= rc.bottom;
}
function onPtrMove(e) {
  globalPos.set(e.clientX, e.clientY);
  for (const [el, st] of ptrMap) {
    updateNPos(st, el);
    if (isOver(el)) { if (!st.hover) { st.hover = true; st.onEnter(st); } st.onMove(st); }
    else if (st.hover && !st.touching) { st.hover = false; st.onLeave(st); }
  }
}
function onPtrLeave() { for (const st of ptrMap.values()) { if (st.hover) { st.hover = false; st.onLeave(st); } } }
function onTouchStart(e) {
  if (!e.touches.length) return; e.preventDefault();
  globalPos.set(e.touches[0].clientX, e.touches[0].clientY);
  for (const [el, st] of ptrMap) { if (isOver(el)) { st.touching = true; updateNPos(st, el); if (!st.hover) { st.hover = true; st.onEnter(st); } st.onMove(st); } }
}
function onTouchMove(e) {
  if (!e.touches.length) return; e.preventDefault();
  globalPos.set(e.touches[0].clientX, e.touches[0].clientY);
  for (const [el, st] of ptrMap) { updateNPos(st, el); if (isOver(el)) { if (!st.hover) { st.hover = true; st.touching = true; st.onEnter(st); } st.onMove(st); } else if (st.hover && st.touching) { st.onMove(st); } }
}
function onTouchEnd() { for (const [, st] of ptrMap) { if (st.touching) { st.touching = false; if (st.hover) { st.hover = false; st.onLeave(st); } } } }

// ── Physics ───────────────────────────────────────────────────────────────────
const { randFloat: rF, randFloatSpread: rFS } = o;
const pA = new a(), pB = new a(), pC = new a(), vA = new a(), vB = new a(), diff = new a(), push = new a();

class Physics {
  constructor(cfg) {
    this.config = { ...cfg };
    this.positionData = new Float32Array(3 * cfg.count).fill(0);
    this.velocityData = new Float32Array(3 * cfg.count).fill(0);
    this.sizeData = new Float32Array(cfg.count).fill(1);
    this.center = new a();
    // scatter balls initially
    for (let i = 1; i < cfg.count; i++) {
      const b = 3 * i;
      this.positionData[b] = rFS(2 * cfg.maxX);
      this.positionData[b + 1] = rFS(2 * cfg.maxY);
      this.positionData[b + 2] = rFS(2 * cfg.maxZ);
    }
    // sizes
    this.sizeData[0] = cfg.size0 || 0.8;
    for (let i = 1; i < cfg.count; i++)this.sizeData[i] = rF(cfg.minSize, cfg.maxSize);
  }

  update(clock) {
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

      // gravity (pulls down when >0)
      vA.y -= clock.delta * cfg.gravity * sz[i];

      // gentle pull toward origin when cursor not active (center attraction)
      if (!cfg.controlSphere0) {
        const toOriginX = -pos[b] * 0.0015;
        const toOriginY = -pos[b + 1] * 0.0015;
        vA.x += toOriginX; vA.y += toOriginY;
      }

      vA.multiplyScalar(cfg.friction);
      vA.clampLength(0, cfg.maxVelocity);
      pA.add(vA);
      pA.toArray(pos, b); vA.toArray(vel, b);
    }

    // ball-ball collisions
    for (let i = start; i < cfg.count; i++) {
      const bi = 3 * i;
      pA.fromArray(pos, bi); vA.fromArray(vel, bi);
      for (let j = i + 1; j < cfg.count; j++) {
        const bj = 3 * j;
        pB.fromArray(pos, bj); vB.fromArray(vel, bj);
        diff.copy(pB).sub(pA);
        const dist = diff.length(); const minD = sz[i] + sz[j];
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

      // cursor sphere repulsion
      if (cfg.controlSphere0) {
        pC.fromArray(pos, 0);
        diff.copy(pC).sub(pA);
        const d = diff.length(); const minD0 = sz[i] + sz[0];
        if (d < minD0 && d > 0.001) {
          const ov = minD0 - d;
          push.copy(diff).normalize().multiplyScalar(ov);
          const imp = push.clone().multiplyScalar(Math.max(vA.length(), 2));
          pA.sub(push); vA.sub(imp);
        }
      }

      // walls
      const { maxX, maxY, maxZ, wallBounce } = cfg; const r = sz[i];
      if (pA.x - r < -maxX) { pA.x = -maxX + r; vA.x = Math.abs(vA.x) * wallBounce; }
      if (pA.x + r > maxX) { pA.x = maxX - r; vA.x = -Math.abs(vA.x) * wallBounce; }
      if (cfg.gravity === 0) {
        if (pA.y - r < -maxY) { pA.y = -maxY + r; vA.y = Math.abs(vA.y) * wallBounce; }
        if (pA.y + r > maxY) { pA.y = maxY - r; vA.y = -Math.abs(vA.y) * wallBounce; }
      } else if (pA.y - r < -maxY) { pA.y = -maxY + r; vA.y = Math.abs(vA.y) * wallBounce; }
      if (Math.abs(pA.z) + r > Math.max(maxZ, cfg.maxSize || 1)) { pA.z = Math.sign(pA.z) * (maxZ - r); vA.z = -vA.z * wallBounce; }
      pA.toArray(pos, bi); vA.toArray(vel, bi);
    }
  }
}

// ── Logo texture baked onto sphere ────────────────────────────────────────────
function makeLogoTexture(skill) {
  return new Promise(resolve => {
    const S = 512; const cv = document.createElement('canvas');
    cv.width = cv.height = S; const ctx = cv.getContext('2d');
    // white background circle
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2); ctx.fill();

    const finish = () => resolve(new CanvasTexture(cv));

    const drawImg = img => {
      const pad = S * 0.22; const sz = S - pad * 2;
      if (img) {
        // subtle shadow to give depth
        ctx.shadowColor = 'rgba(0,0,0,0.15)'; ctx.shadowBlur = 8;
        ctx.drawImage(img, pad, pad, sz, sz);
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = '#444'; ctx.font = `bold ${Math.round(S * 0.2)}px monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText((skill.name || '').slice(0, 4), S / 2, S / 2);
      }
      finish();
    };

    if (skill.logo) {
      const img = new Image(); img.crossOrigin = 'anonymous';
      img.onload = () => drawImg(img); img.onerror = () => drawImg(null);
      img.src = skill.logo;
    } else { drawImg(null); }
  });
}

// ── Main ballpit creator ──────────────────────────────────────────────────────
function createBallpit(canvas, skills = [], opts = {}) {
  const cfg = {
    count: skills.length + 1,
    minSize: 0.5, maxSize: 1.1, size0: 0.8,
    gravity: opts.gravity ?? 0,
    friction: opts.friction ?? 0.9975,
    wallBounce: opts.wallBounce ?? 0.85,
    maxVelocity: 0.15, maxX: 5, maxY: 5, maxZ: 2,
    controlSphere0: false,
    ...opts,
    count: skills.length + 1,
  };

  const three = new ThreeApp({ canvas, size: 'parent', rendererOptions: { antialias: true, alpha: true } });
  three.renderer.toneMapping = v;
  three.camera.position.set(0, 0, 20);
  three.camera.lookAt(0, 0, 0);
  three.cameraMaxAspect = 1.5;
  three.resize();

  canvas.style.touchAction = 'none';
  canvas.style.userSelect = 'none';

  // env map for shiny balls
  const pmrem = new p(three.renderer, 0.04);
  const envMap = pmrem.fromScene(new z()).texture;
  pmrem.dispose();

  // lights
  three.scene.add(new f(0xffffff, 1.2));
  const ptLight = new u(0xffffff, 300);
  three.scene.add(ptLight);
  const ptLight2 = new u(0x8888ff, 100);
  ptLight2.position.set(-10, 10, 5);
  three.scene.add(ptLight2);

  // shared geometry
  const geo = new SphereGeometry(1, 64, 64);

  // physics
  const physics = new Physics(cfg);

  // scene group
  const group = new Group();
  three.scene.add(group);

  // cursor sphere (invisible)
  const cursorMesh = new Mesh(geo, new MeshPhysicalMaterial({ transparent: true, opacity: 0 }));
  group.add(cursorMesh);

  // skill meshes — white placeholders first, textures load async
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

  // load logo textures async and swap material map
  skills.forEach((skill, idx) => {
    makeLogoTexture(skill).then(tex => {
      tex.colorSpace = n;
      skillMeshes[idx].material = new MeshPhysicalMaterial({
        color: 0xffffff, map: tex, envMap,
        metalness: 0.05, roughness: 0.12,
        clearcoat: 1.0, clearcoatRoughness: 0.04,
      });
    });
  });

  // cursor interaction
  const raycaster = new y(); const plane = new w(new a(0, 0, 1), 0); const hitPt = new a();
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
      // reset center to origin so balls drift back
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

    // cursor sphere
    cursorMesh.position.fromArray(physics.positionData, 0);
    cursorMesh.scale.setScalar(physics.sizeData[0]);

    // skill balls — position + slow auto-rotation so logo shows all sides
    skillMeshes.forEach((mesh, i) => {
      const b = (i + 1) * 3;
      mesh.position.set(physics.positionData[b], physics.positionData[b + 1], physics.positionData[b + 2]);
      mesh.scale.setScalar(physics.sizeData[i + 1]);
      mesh.rotation.y += clock.delta * 0.25;
      mesh.rotation.x += clock.delta * 0.08;
    });

    // point light follows cursor sphere
    ptLight.position.fromArray(physics.positionData, 0);
  };

  return {
    three, physics,
    dispose() {
      ptr.dispose(); geo.dispose(); three.dispose();
    }
  };
}

// ── React component ───────────────────────────────────────────────────────────
const Ballpit = ({ className = '', skills = [], followCursor = true, ...props }) => {
  const canvasRef = useRef(null);
  const instRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = () => {
      if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) { requestAnimationFrame(init); return; }
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
      if (instRef.current) { instRef.current.dispose(); instRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className={`${className} w-full h-full block`} />;
};

export default Ballpit;