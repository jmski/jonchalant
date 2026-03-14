'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 2000;

// Brand color palette — moss green dominant, burnt indigo accent
const PALETTE = [
  new THREE.Color('#6b8e63'), // accent-primary moss (×3 weight)
  new THREE.Color('#6b8e63'),
  new THREE.Color('#6b8e63'),
  new THREE.Color('#4a3a5c'), // burnt indigo
  new THREE.Color('#8aa87a'), // moss light
  new THREE.Color('#c8c3bb'), // neutral
];

function PresenceSphere() {
  const ref = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const rotX = useRef(0);
  const rotY = useRef(0);
  const prefersReduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Track mouse position for interactive tilt — no re-renders, ref only
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Build geometry once — Fibonacci sphere distribution + vertex colors
  const geometry = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const golden = Math.PI * (3 - Math.sqrt(5)); // golden angle ≈ 2.399 rad

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;         // -1 → 1
      const r = Math.sqrt(Math.max(0, 1 - y * y));  // ring radius at this y
      const theta = golden * i;
      const radius = 2.0 + (Math.random() - 0.5) * 0.35; // slight organic variation

      pos[i * 3]     = Math.cos(theta) * r * radius;
      pos[i * 3 + 1] = y * radius;
      pos[i * 3 + 2] = Math.sin(theta) * r * radius;

      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return geo;
  }, []);

  // Dispose geometry when component unmounts
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    if (prefersReduced) {
      // Static nice angle, no animation
      ref.current.rotation.y = 0.4;
      ref.current.rotation.x = -0.1;
      return;
    }

    // Smooth lerp toward: auto-rotate + mouse influence
    const tY = t * 0.04 + mouse.current.x * 0.45;
    const tX = mouse.current.y * -0.28;

    rotY.current += (tY - rotY.current) * 0.03;
    rotX.current += (tX - rotX.current) * 0.03;

    ref.current.rotation.y = rotY.current;
    ref.current.rotation.x = rotX.current;

    // Gentle breathing scale
    const s = 1 + Math.sin(t * 0.38) * 0.025;
    ref.current.scale.setScalar(s);
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        vertexColors
        sizeAttenuation
        size={0.026}
        transparent
        opacity={0.72}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // fully transparent background
      }}
    >
      <PresenceSphere />
    </Canvas>
  );
}
