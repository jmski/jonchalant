'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ── Outline vertex shader ────────────────────────────────────────────────────
// Skinning-aware: expands vertices along normals in object space.
const OUTLINE_VS = /* glsl */ `
  #include <common>
  #include <skinning_pars_vertex>

  uniform float outlineThickness;

  void main() {
    #include <skinbase_vertex>

    vec3 objectNormal = vec3( normal );
    #include <skinnormal_vertex>

    vec3 transformed = vec3( position );
    #include <skinning_vertex>

    transformed += normalize( objectNormal ) * outlineThickness;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
  }
`;

const OUTLINE_FS = /* glsl */ `
  uniform vec3  outlineColor;
  uniform float outlineOpacity;

  void main() {
    gl_FragColor = vec4( outlineColor, outlineOpacity );
  }
`;

// Blender → GLB exports in metres. Auto-scale fits model to TARGET_HEIGHT world units.
const TARGET_HEIGHT = 1.8;
const OUTLINE_WORLD = 0.018;

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let mounted = true;

    // ── Renderer — sized to container, not fixed constants ────────────────────
    const w0 = container.clientWidth  || 500;
    const h0 = container.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w0, h0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    // FOV 50° gives slightly wider framing — better for portrait canvas on mobile
    const camera = new THREE.PerspectiveCamera(50, w0 / h0, 0.1, 100);

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    // ── ResizeObserver — keeps renderer in sync with CSS-driven container ──────
    const ro = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(container);

    // ── Floor circle ──────────────────────────────────────────────────────────
    const FLOOR_SEGS = 64;
    const floorBuf   = new Float32Array(FLOOR_SEGS * 3);
    for (let i = 0; i < FLOOR_SEGS; i++) {
      const a              = (i / FLOOR_SEGS) * Math.PI * 2;
      floorBuf[i * 3]     = Math.cos(a);
      floorBuf[i * 3 + 1] = 0;
      floorBuf[i * 3 + 2] = Math.sin(a);
    }
    const floorGeo = new THREE.BufferGeometry();
    floorGeo.setAttribute('position', new THREE.BufferAttribute(floorBuf, 3));
    const floorMat = new THREE.LineBasicMaterial({
      color: 0x4a3a5c, transparent: true, opacity: 0.12,
    });
    scene.add(new THREE.LineLoop(floorGeo, floorMat));

    // ── Fill material ─────────────────────────────────────────────────────────
    // colorWrite:false → body writes to depth buffer only, renders invisible.
    // This occludes back-face geometry behind the silhouette (no bleed-through)
    // while keeping the figure clean outline-only with zero texture detail showing.
    const fillMat = new THREE.MeshBasicMaterial({
      color:       0x4a3a5c,
      transparent: true,
      opacity:     0,
      depthWrite:  true,
      colorWrite:  false,
      side:        THREE.FrontSide,
    });

    const outlineMats: THREE.ShaderMaterial[] = [];
    let   mixer: THREE.AnimationMixer | null   = null;

    // Camera orbit state — updated once model bounds are known
    let orbitRadius  = 5;
    let lookAtHeight = 0.85;
    const fixedTheta = 0.5;
    let currentPhi   = 0.85;
    let targetPhi    = 0.85;

    // ── GLTF load ─────────────────────────────────────────────────────────────
    const danceFile = `/models/dance${Math.floor(Math.random() * 5) + 1}.glb`;
    const loader = new GLTFLoader();
    loader.load(
      danceFile,
      (gltf) => {
        if (!mounted) return;

        const model = gltf.scene;

        // Auto-scale: measure native bounds, fit to TARGET_HEIGHT
        const rawBbox      = new THREE.Box3().setFromObject(model);
        const rawSize      = rawBbox.getSize(new THREE.Vector3());
        const autoScale    = rawSize.y > 0 ? TARGET_HEIGHT / rawSize.y : 1.0;
        const outlineLocal = OUTLINE_WORLD / autoScale;

        model.scale.setScalar(autoScale);

        // ── Apply NPR materials ────────────────────────────────────────────────
        model.traverse((child: THREE.Object3D) => {
          if (!(child as THREE.Mesh).isMesh) return;
          const mesh = child as THREE.Mesh;

          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m: THREE.Material) => m.dispose());
          } else {
            mesh.material.dispose();
          }
          mesh.material    = fillMat;
          mesh.renderOrder = 1;

          const outlineMat = new THREE.ShaderMaterial({
            defines: { USE_SKINNING: '' },
            uniforms: {
              outlineThickness: { value: outlineLocal },
              outlineColor:     { value: new THREE.Color(0x4a3a5c) },
              outlineOpacity:   { value: 0.8 },
            },
            vertexShader:   OUTLINE_VS,
            fragmentShader: OUTLINE_FS,
            side:        THREE.BackSide,
            transparent: true,
            depthTest:   true,
            depthWrite:  false,
          });
          outlineMats.push(outlineMat);

          let outlineMesh: THREE.Mesh;
          if (mesh instanceof THREE.SkinnedMesh) {
            const sm = new THREE.SkinnedMesh(mesh.geometry, outlineMat);
            sm.bind(mesh.skeleton, mesh.bindMatrix);
            outlineMesh = sm;
          } else {
            outlineMesh = new THREE.Mesh(mesh.geometry, outlineMat);
          }
          outlineMesh.renderOrder = 0;
          outlineMesh.position.copy(mesh.position);
          outlineMesh.quaternion.copy(mesh.quaternion);
          outlineMesh.scale.copy(mesh.scale);

          (mesh.parent ?? scene).add(outlineMesh);
        });

        // Ground model: feet at y = 0, centred on x/z
        const bbox   = new THREE.Box3().setFromObject(model);
        const size   = bbox.getSize(new THREE.Vector3());
        const centre = bbox.getCenter(new THREE.Vector3());
        model.position.set(-centre.x, -bbox.min.y, -centre.z);

        scene.add(model);

        // Camera orbit radius derived from model height
        const modelHeight = size.y > 0 ? size.y : TARGET_HEIGHT;
        orbitRadius       = modelHeight * 1.8;
        lookAtHeight      = modelHeight * 0.6;

        // ── Animation ──────────────────────────────────────────────────────────
        const boneMap = new Map<string, THREE.Bone>();
        model.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Bone) boneMap.set(child.name, child);
        });

        if (boneMap.size > 0 && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          mixer.clipAction(gltf.animations[0]).play();
        }

        if (mounted) setLoading(false);
      },
      undefined,
      (err) => {
        console.error('[HeroCanvas] GLTF load error:', err);
        if (mounted) setLoading(false);
      },
    );

    // ── Mouse — vertical orbit only ───────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const my   = e.clientY - rect.top;
      targetPhi  = Math.max(0.18, Math.min(1.38,
        0.2 + (my / rect.height) * 1.15,
      ));
    };
    container.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Render loop ───────────────────────────────────────────────────────────
    let rafId: number;
    let prevTime = performance.now();

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const now = performance.now();
      const dt  = Math.min((now - prevTime) / 1000, 0.05);
      prevTime  = now;

      mixer?.update(dt);

      currentPhi += (targetPhi - currentPhi) * 0.035;
      const r = orbitRadius;
      camera.position.x = r * Math.sin(currentPhi) * Math.sin(fixedTheta);
      camera.position.y = r * Math.cos(currentPhi) + (lookAtHeight * 0.3);
      camera.position.z = r * Math.sin(currentPhi) * Math.cos(fixedTheta);
      camera.lookAt(0, lookAtHeight, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      floorGeo.dispose();
      floorMat.dispose();
      fillMat.dispose();
      outlineMats.forEach((m) => m.dispose());
      mixer?.stopAllAction();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={loading ? 'hero-canvas-container hero-canvas-loading-pulse' : 'hero-canvas-container'}
    >
      {loading && (
        <div className="hero-canvas-loading" aria-label="Loading animation">
          <span className="hero-canvas-loading-dot" />
        </div>
      )}
    </div>
  );
}
