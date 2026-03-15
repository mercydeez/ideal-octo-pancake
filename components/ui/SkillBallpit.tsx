"use client";

import { useEffect, useRef } from "react";
import {
  Vector3,
  MeshStandardMaterial,
  InstancedMesh,
  Clock,
  AmbientLight,
  SphereGeometry,
  ShaderChunk,
  Scene,
  Color,
  Object3D,
  SRGBColorSpace,
  MathUtils,
  PMREMGenerator,
  Vector2,
  WebGLRenderer,
  PerspectiveCamera,
  PointLight,
  ACESFilmicToneMapping,
  Plane,
  Raycaster
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// --- Helpers ---
class ThreeApp {
  privateConfig: any;
  canvas!: HTMLCanvasElement;
  camera: PerspectiveCamera;
  cameraMinAspect?: number;
  cameraMaxAspect?: number;
  cameraFov: number;
  maxPixelRatio?: number;
  minPixelRatio?: number;
  scene: Scene;
  renderer!: WebGLRenderer;
  privatePostprocessing: any;
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  render!: () => void;
  onBeforeRender: (clock: any) => void = () => {};
  onAfterRender: (clock: any) => void = () => {};
  onAfterResize: (size: any) => void = () => {};
  privateIntersecting = false;
  privateAnimating = false;
  isDisposed = false;
  privateIntersectionObserver?: IntersectionObserver;
  privateResizeObserver?: ResizeObserver;
  privateResizeTimeout: any;
  privateClock = new Clock();
  privateClockData = { elapsed: 0, delta: 0 };
  privateRafId?: number;

  constructor(config: any) {
    this.privateConfig = { ...config };
    this.camera = new PerspectiveCamera();
    this.cameraFov = this.camera.fov;
    this.scene = new Scene();
    
    if (this.privateConfig.canvas) {
      this.canvas = this.privateConfig.canvas;
    } else if (this.privateConfig.id) {
      this.canvas = document.getElementById(this.privateConfig.id) as HTMLCanvasElement;
    } else {
      throw new Error('Three: Missing canvas or id parameter');
    }
    
    this.canvas.style.display = 'block';
    
    const rendererOpts = {
      canvas: this.canvas,
      powerPreference: 'high-performance' as WebGLPowerPreference,
      ...(this.privateConfig.rendererOptions ?? {})
    };
    this.renderer = new WebGLRenderer(rendererOpts);
    this.renderer.outputColorSpace = SRGBColorSpace;
    
    this.resize();
    this.render = this.privateRenderScene.bind(this);
    this.privateBindEvents();
  }

  privateBindEvents() {
    if (!(this.privateConfig.size instanceof Object)) {
      window.addEventListener('resize', this.privateHandleResize);
      if (this.privateConfig.size === 'parent' && this.canvas.parentNode) {
        this.privateResizeObserver = new ResizeObserver(this.privateHandleResize);
        this.privateResizeObserver.observe(this.canvas.parentNode as Element);
      }
    }
    this.privateIntersectionObserver = new IntersectionObserver(this.privateHandleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0
    });
    this.privateIntersectionObserver.observe(this.canvas);
    document.addEventListener('visibilitychange', this.privateHandleVisibility);
  }

  privateUnbindEvents() {
    window.removeEventListener('resize', this.privateHandleResize);
    this.privateResizeObserver?.disconnect();
    this.privateIntersectionObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.privateHandleVisibility);
  }

  privateHandleIntersection = (e: IntersectionObserverEntry[]) => {
    this.privateIntersecting = e[0].isIntersecting;
    this.privateIntersecting ? this.privateStart() : this.privateStop();
  }

  privateHandleVisibility = () => {
    if (this.privateIntersecting) {
      document.hidden ? this.privateStop() : this.privateStart();
    }
  }

  privateHandleResize = () => {
    if (this.privateResizeTimeout) clearTimeout(this.privateResizeTimeout);
    this.privateResizeTimeout = setTimeout(() => {
      this.resize();
      this.onAfterResize(this.size);
    }, 100);
  }

  resize() {
    let width, height;
    if (this.privateConfig.size instanceof Object) {
      width = this.privateConfig.size.width;
      height = this.privateConfig.size.height;
    } else if (this.privateConfig.size === 'parent' && this.canvas.parentNode) {
      width = (this.canvas.parentNode as HTMLElement).offsetWidth;
      height = (this.canvas.parentNode as HTMLElement).offsetHeight;
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    this.size.width = width;
    this.size.height = height;
    this.size.ratio = width / height;

    this.camera.aspect = this.size.ratio;
    if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
      this.camera.aspect = this.cameraMinAspect;
    }
    if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
      this.camera.aspect = this.cameraMaxAspect;
    }
    this.camera.fov = this.cameraFov;
    this.camera.updateProjectionMatrix();

    const wsize = new Vector3();
    this.camera.getWorldPosition(wsize);
    // Approximate world height for PerspectiveCamera based on distance and fov
    this.size.wHeight = 2 * Math.tan((this.camera.fov * Math.PI) / 180 / 2) * this.camera.position.z;
    this.size.wWidth = this.size.wHeight * this.camera.aspect;

    this.size.pixelRatio = Math.min(
      this.maxPixelRatio ?? 2,
      Math.max(this.minPixelRatio ?? 1, window.devicePixelRatio)
    );
    this.canvas.width = this.size.width * this.size.pixelRatio;
    this.canvas.height = this.size.height * this.size.pixelRatio;
    this.canvas.style.width = `${this.size.width}px`;
    this.canvas.style.height = `${this.size.height}px`;

    this.renderer.setPixelRatio(this.size.pixelRatio);
    this.renderer.setSize(this.size.width, this.size.height);
  }

  privateStart() {
    if (this.privateAnimating) return;
    this.privateAnimating = true;
    this.privateClock.start();
    this.privateRafId = requestAnimationFrame(this.privateTick);
  }

  privateStop() {
    if (!this.privateAnimating) return;
    this.privateAnimating = false;
    this.privateClock.stop();
    if (this.privateRafId) cancelAnimationFrame(this.privateRafId);
  }

  privateTick = () => {
    this.privateClockData.delta = this.privateClock.getDelta();
    this.privateClockData.elapsed = this.privateClock.getElapsedTime();
    this.onBeforeRender(this.privateClockData);
    this.render();
    this.onAfterRender(this.privateClockData);
    this.privateRafId = requestAnimationFrame(this.privateTick);
  }

  privateRenderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.privateStop();
    this.privateUnbindEvents();
    this.renderer.dispose();
    this.isDisposed = true;
  }
}

// --- Physics ---
const tmpVec3 = new Vector3();
const tmpPlane = new Plane();
const tmpRaycaster = new Raycaster();

class Physics {
  config: any;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center = new Vector3();
  privateGravity = new Vector3();
  privatePlane = new Plane(new Vector3(0, 1, 0), 0);
  privateBounce = 0.6;
  privateFriction = 0.9;
  privateMinSize = 0.5;
  privateMaxSize = 1.5;
  privateMaxSpeed = 0.1;
  privateMaxForce = 0.001;
  privateCollisionRadius = 0.7;
  privateCollisionForce = 0.0001;

  constructor(config: any) {
    this.config = { ...config };
    this.positionData = new Float32Array(this.config.count * 3);
    this.velocityData = new Float32Array(this.config.count * 3);
    this.sizeData = new Float32Array(this.config.count);

    for (let i = 0; i < this.config.count; i++) {
      this.positionData[i * 3 + 0] = MathUtils.randFloatSpread(10);
      this.positionData[i * 3 + 1] = MathUtils.randFloatSpread(10);
      this.positionData[i * 3 + 2] = MathUtils.randFloatSpread(10);
      this.sizeData[i] = MathUtils.randFloat(this.privateMinSize, this.privateMaxSize);
    }
  }

  update(clockData: any) {
    const delta = clockData.delta;
    const gravity = this.config.gravity;
    const followCursor = this.config.followCursor;

    // Update gravity based on config
    this.privateGravity.set(0, -gravity, 0);

    for (let i = 0; i < this.config.count; i++) {
      const i3 = i * 3;

      // Apply gravity
      this.velocityData[i3 + 1] += this.privateGravity.y * delta;

      // Apply attraction to center if followCursor is true
      if (followCursor) {
        tmpVec3.set(
          this.center.x - this.positionData[i3 + 0],
          this.center.y - this.positionData[i3 + 1],
          this.center.z - this.positionData[i3 + 2]
        );
        const dist = tmpVec3.length();
        if (dist > 0.1) {
          tmpVec3.normalize().multiplyScalar(this.privateMaxForce * delta);
          this.velocityData[i3 + 0] += tmpVec3.x;
          this.velocityData[i3 + 1] += tmpVec3.y;
          this.velocityData[i3 + 2] += tmpVec3.z;
        }
      }

      // Collision with plane
      tmpVec3.set(
        this.positionData[i3 + 0],
        this.positionData[i3 + 1],
        this.positionData[i3 + 2]
      );
      const distanceToPlane = this.privatePlane.distanceToPoint(tmpVec3);
      const radius = this.sizeData[i] / 2;

      if (distanceToPlane < radius) {
        // Project velocity onto plane normal
        tmpPlane.copy(this.privatePlane).translate(tmpVec3.negate().normalize().multiplyScalar(radius));
        const normal = tmpPlane.normal;
        const velocityDotNormal =
          this.velocityData[i3 + 0] * normal.x +
          this.velocityData[i3 + 1] * normal.y +
          this.velocityData[i3 + 2] * normal.z;

        // Reflect velocity
        this.velocityData[i3 + 0] -= 2 * velocityDotNormal * normal.x;
        this.velocityData[i3 + 1] -= 2 * velocityDotNormal * normal.y;
        this.velocityData[i3 + 2] -= 2 * velocityDotNormal * normal.z;

        // Apply bounce and friction
        this.velocityData[i3 + 0] *= this.privateBounce * this.privateFriction;
        this.velocityData[i3 + 1] *= this.privateBounce;
        this.velocityData[i3 + 2] *= this.privateBounce * this.privateFriction;

        // Adjust position to be on the plane
        tmpRaycaster.ray.origin.copy(tmpVec3);
        tmpRaycaster.ray.direction.copy(normal).negate();
        const intersectionPoint = new Vector3();
        tmpRaycaster.ray.intersectPlane(this.privatePlane, intersectionPoint);
        this.positionData[i3 + 0] = intersectionPoint.x + normal.x * radius;
        this.positionData[i3 + 1] = intersectionPoint.y + normal.y * radius;
        this.positionData[i3 + 2] = intersectionPoint.z + normal.z * radius;
      }

      // Collision with other spheres
      for (let j = i + 1; j < this.config.count; j++) {
        const j3 = j * 3;
        const dx = this.positionData[i3 + 0] - this.positionData[j3 + 0];
        const dy = this.positionData[i3 + 1] - this.positionData[j3 + 1];
        const dz = this.positionData[i3 + 2] - this.positionData[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        const minDistance = (this.sizeData[i] + this.sizeData[j]) / 2;
        const minDistanceSq = minDistance * minDistance;

        if (distSq < minDistanceSq) {
          const dist = Math.sqrt(distSq);
          const normalX = dx / dist;
          const normalY = dy / dist;
          const normalZ = dz / dist;

          // Separate spheres
          const overlap = minDistance - dist;
          this.positionData[i3 + 0] += normalX * overlap * 0.5;
          this.positionData[i3 + 1] += normalY * overlap * 0.5;
          this.positionData[i3 + 2] += normalZ * overlap * 0.5;
          this.positionData[j3 + 0] -= normalX * overlap * 0.5;
          this.positionData[j3 + 1] -= normalY * overlap * 0.5;
          this.positionData[j3 + 2] -= normalZ * overlap * 0.5;

          // Apply impulse
          const impulse = this.privateCollisionForce * delta;
          this.velocityData[i3 + 0] += normalX * impulse;
          this.velocityData[i3 + 1] += normalY * impulse;
          this.velocityData[i3 + 2] += normalZ * impulse;
          this.velocityData[j3 + 0] -= normalX * impulse;
          this.velocityData[j3 + 1] -= normalY * impulse;
          this.velocityData[j3 + 2] -= normalZ * impulse;
        }
      }

      // Limit speed
      const speed = Math.sqrt(
        this.velocityData[i3 + 0] * this.velocityData[i3 + 0] +
        this.velocityData[i3 + 1] * this.velocityData[i3 + 1] +
        this.velocityData[i3 + 2] * this.velocityData[i3 + 2]
      );
      if (speed > this.privateMaxSpeed) {
        this.velocityData[i3 + 0] *= this.privateMaxSpeed / speed;
        this.velocityData[i3 + 1] *= this.privateMaxSpeed / speed;
        this.velocityData[i3 + 2] *= this.privateMaxSpeed / speed;
      }

      // Update position
      this.positionData[i3 + 0] += this.velocityData[i3 + 0];
      this.positionData[i3 + 1] += this.velocityData[i3 + 1];
      this.positionData[i3 + 2] += this.velocityData[i3 + 2];
    }
  }
}

// --- Interaction ---
const setupInteraction = (opts: any) => {
  const state = {
    isDown: false,
    x: 0,
    y: 0,
    nPosition: new Vector2(),
    coords: new Vector2(),
    delta: new Vector2(),
    event: null,
  };

  const onDown = (e: any) => {
    state.isDown = true;
    state.event = e;
    updateCoords(e);
    opts.onDown?.(state);
  };

  const onMove = (e: any) => {
    if (!state.isDown) return;
    state.event = e;
    const prevX = state.x;
    const prevY = state.y;
    updateCoords(e);
    state.delta.set(state.x - prevX, state.y - prevY);
    opts.onMove?.(state);
  };

  const onUp = (e: any) => {
    state.isDown = false;
    state.event = e;
    opts.onUp?.(state);
  };

  const onLeave = (e: any) => {
    opts.onLeave?.(state);
  };

  const updateCoords = (e: any) => {
    if (!opts.domElement || !e || e.clientX === undefined) return;
    const rect = opts.domElement.getBoundingClientRect();
    state.x = e.clientX - rect.left;
    state.y = e.clientY - rect.top;
    state.nPosition.set(
      (state.x / rect.width) * 2 - 1,
      -(state.y / rect.height) * 2 + 1
    );
    state.coords.set(state.x, state.y);
  };

  if(!opts.domElement) return { state, dispose: () => {} };

  opts.domElement.addEventListener("mousedown", onDown);
  opts.domElement.addEventListener("mousemove", onMove);
  opts.domElement.addEventListener("mouseup", onUp);
  opts.domElement.addEventListener("mouseleave", onLeave);
  opts.domElement.addEventListener("touchstart", onDown);
  opts.domElement.addEventListener("touchmove", onMove);
  opts.domElement.addEventListener("touchend", onUp);

  const dispose = () => {
    opts.domElement.removeEventListener("mousedown", onDown);
    opts.domElement.removeEventListener("mousemove", onMove);
    opts.domElement.removeEventListener("mouseup", onUp);
    opts.domElement.removeEventListener("mouseleave", onLeave);
    opts.domElement.removeEventListener("touchstart", onDown);
    opts.domElement.removeEventListener("touchmove", onMove);
    opts.domElement.removeEventListener("touchend", onUp);
  };

  return { state, dispose };
};

// --- Instanced Balls ---
const dummyObj = new Object3D();

class InstancedBalls extends InstancedMesh {
  config: any;
  physics: Physics;
  pointLight: PointLight;

  constructor(renderer: WebGLRenderer, config: any) {
    const defaultBallConfig = {
      count: 100,
      colors: [0xff0000, 0x00ff00, 0x0000ff],
      gravity: 0.001,
      followCursor: true,
      ambientColor: 0xffffff,
      ambientIntensity: 0.5,
      lightIntensity: 100,
      materialParams: {},
    };
    const mergedConfig = { ...defaultBallConfig, ...config };

    const geometry = new SphereGeometry(0.5, 32, 32);
    const material = new MeshStandardMaterial({
      color: 0xffffff,
      ...mergedConfig.materialParams,
    });

    super(geometry, material, mergedConfig.count);
    this.config = mergedConfig;

    this.physics = new Physics({
      count: this.config.count,
      gravity: this.config.gravity,
      followCursor: this.config.followCursor,
    });

    this.instanceMatrix.setUsage(35048); // DynamicDrawUsage literal
    this.instanceColor = this.instanceColor || null; // Initialize instanceColor

    this.applyColors(this.config.colors);

    // Setup lights
    const ambientLight = new AmbientLight(
      this.config.ambientColor,
      this.config.ambientIntensity
    );
    this.add(ambientLight);

    this.pointLight = new PointLight(
      this.config.ambientColor,
      this.config.lightIntensity,
      100
    );
    this.pointLight.position.set(0, 0, 0);
    this.add(this.pointLight);

    // Environment map
    const pmremGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envMap = pmremGenerator.fromScene(new RoomEnvironment(renderer)).texture;
    material.envMap = envMap;
    material.envMapIntensity = 1;
    pmremGenerator.dispose();

    // Custom shader removed to fix compilation errors. Using standard MeshPhysicalMaterial.
  }

  applyColors(hexColors: number[]) {
    if (hexColors && hexColors.length > 0) {
      const getLerpedColor = (ratio: number, out = new Color()) => {
        const scaled = Math.max(0, Math.min(1, ratio)) * (hexColors.length - 1);
        const idx = Math.floor(scaled);
        const c1 = new Color(hexColors[idx]);
        if (idx >= hexColors.length - 1) return c1;
        const alpha = scaled - idx;
        const c2 = new Color(hexColors[idx + 1]);
        out.copy(c1).lerp(c2, alpha);
        return out;
      };
      
      const tmpColor = new Color();
      for (let i = 0; i < this.config.count; i++) {
        getLerpedColor(i / (this.config.count - 1), tmpColor);
        this.setColorAt(i, tmpColor);
      }
      if (this.instanceColor) this.instanceColor.needsUpdate = true;
    }
  }

  update(clockData: any) {
    this.physics.update(clockData);
    
    // Apply position and scales
    for (let i = 0; i < this.config.count; i++) {
      dummyObj.position.fromArray(this.physics.positionData, i * 3);
      const s = this.physics.sizeData[i];
      dummyObj.scale.set(s, s, s);
      dummyObj.updateMatrix();
      this.setMatrixAt(i, dummyObj.matrix);
    }
    if (this.instanceMatrix) this.instanceMatrix.needsUpdate = true;

    // Follow cursor sphere logic
    if (this.config.controlSphere0) {
      dummyObj.position.fromArray(this.physics.positionData, 0);
      this.pointLight.position.copy(dummyObj.position);
    }
  }
}

// --- Component Definition ---

export const SkillBallpit = ({
  className = "",
  skills = [] as any[],
  gravity = 0,
  followCursor = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // We extract colors randomly or sequentially from skills array
    const colors = skills.map((s) => s.color || "#ffffff");
    if (colors.length === 0) colors.push("#ffffff");

    // Create the ThreeApp
    const app = new ThreeApp({
      canvas,
      size: 'parent',
      rendererOptions: { antialias: true, alpha: true }
    });
    
    app.renderer.toneMapping = ACESFilmicToneMapping;
    app.camera.position.set(0, 0, 20);
    app.camera.lookAt(0, 0, 0);
    app.cameraMaxAspect = 1.5;
    app.resize();

    const count = Math.max(20, skills.length);
    
    // Our instanced mesh
    const balls = new InstancedBalls(app.renderer, {
      count,
      colors,
      gravity,
      followCursor,
      ambientColor: 0xffffff,
      ambientIntensity: 0.8,
      lightIntensity: 300,
      materialParams: {
        metalness: 0.1,
        roughness: 0.3
      }
    });
    
    app.scene.add(balls);
    
    app.onBeforeRender = (clockData: any) => {
      // Dynamic gravity lerp happens inside physics update
      balls.update(clockData);
    };

    let interaction = setupInteraction({
      domElement: canvas,
      onMove: (state: any) => {
        if (balls.config.followCursor) {
          const w = app.size.wWidth / 2;
          const h = app.size.wHeight / 2;
          balls.physics.center.set(
            state.nPosition.x * w,
            state.nPosition.y * h,
            0
          );
        }
      },
      onLeave: () => {
        balls.physics.center.set(0, 0, 0);
      }
    });

    engineRef.current = { app, interaction, balls };

    return () => {
      interaction.dispose();
      app.dispose();
    };
  }, [skills, followCursor]); 

  // Update gravity smoothly via prop change
  useEffect(() => {
    if (engineRef.current?.balls) {
      engineRef.current.balls.config.gravity = gravity;
    }
  }, [gravity]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
      />
    </div>
  );
};


export default SkillBallpit;
