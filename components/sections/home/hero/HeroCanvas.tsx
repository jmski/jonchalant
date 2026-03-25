'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const W = 460;
const H = 460;

// ── Joints ─────────────────────────────────────────────────────────────────
const JOINTS = [
  'HEAD_TOP', 'HEAD_BOTTOM', 'NECK',
  'SHOULDER_L', 'SHOULDER_R',
  'ELBOW_L', 'ELBOW_R',
  'WRIST_L', 'WRIST_R',
  'HIP', 'HIP_L', 'HIP_R',
  'KNEE_L', 'KNEE_R',
  'ANKLE_L', 'ANKLE_R',
] as const;
type Joint = typeof JOINTS[number];

// ── Connections ─────────────────────────────────────────────────────────────
const CONNECTIONS: [Joint, Joint][] = [
  ['HEAD_TOP',   'NECK'],
  ['NECK',       'SHOULDER_L'], ['NECK',       'SHOULDER_R'],
  ['NECK',       'HIP'],
  ['SHOULDER_L', 'ELBOW_L'],   ['ELBOW_L',    'WRIST_L'],
  ['SHOULDER_R', 'ELBOW_R'],   ['ELBOW_R',    'WRIST_R'],
  ['HIP',        'HIP_L'],     ['HIP',        'HIP_R'],
  ['HIP_L',      'KNEE_L'],    ['KNEE_L',     'ANKLE_L'],
  ['HIP_R',      'KNEE_R'],    ['KNEE_R',     'ANKLE_R'],
];

// ── Neutral upright pose ────────────────────────────────────────────────────
type XYZ = [number, number, number];
const NEUTRAL: Record<Joint, XYZ> = {
  HEAD_TOP:    [0,      2.8,  0],
  HEAD_BOTTOM: [0,      2.4,  0],
  NECK:        [0,      2.3,  0],
  SHOULDER_L:  [-0.5,   2.1,  0],
  SHOULDER_R:  [0.5,    2.1,  0],
  ELBOW_L:     [-0.9,   1.6,  0],
  ELBOW_R:     [0.9,    1.6,  0],
  WRIST_L:     [-1.1,   1.1,  0],
  WRIST_R:     [1.1,    1.1,  0],
  HIP:         [0,      1.4,  0],
  HIP_L:       [-0.25,  1.3,  0],
  HIP_R:       [0.25,   1.3,  0],
  KNEE_L:      [-0.35,  0.7,  0],
  KNEE_R:      [0.35,   0.7,  0],
  ANKLE_L:     [-0.4,   0.0,  0],
  ANKLE_R:     [0.4,    0.0,  0],
};

// ── Keyframe poses (partial — unspecified joints fall back to NEUTRAL) ──────
type Pose = Partial<Record<Joint, XYZ>>;

const PHASE_POSES: Pose[] = [
  // 0 — STAB
  {
    WRIST_L:    [-0.5,  -0.1,  0.3],
    ELBOW_L:    [-0.4,   0.5,  0.2],
    SHOULDER_L: [-0.4,   1.2,  0.0],
    NECK:       [ 0,     1.1, -0.1],
    HEAD_TOP:   [ 0,     1.5, -0.3],
    WRIST_R:    [ 0.8,   1.4, -0.2],
    KNEE_L:     [-0.4,   0.4,  0.2],
    KNEE_R:     [ 0.3,   0.4, -0.1],
    ANKLE_L:    [-0.45,  0.0,  0.3],
    ANKLE_R:    [ 0.35,  0.0, -0.1],
  },
  // 1 — WIND UP
  {
    WRIST_L:  [-0.3,  -0.05,  0.0],
    ANKLE_L:  [-0.2,   1.2,   0.8],
    KNEE_L:   [-0.3,   0.8,   0.5],
    ANKLE_R:  [ 0.5,   0.6,  -0.6],
    KNEE_R:   [ 0.4,   0.5,  -0.3],
    HEAD_TOP: [ 0.2,   0.8,  -0.3],
    NECK:     [ 0.1,   0.7,  -0.1],
  },
  // 2 — KICK
  {
    WRIST_L:  [-0.2,  -0.05,  0.0],
    ELBOW_L:  [-0.3,   0.3,   0.1],
    ANKLE_L:  [-0.6,   2.2,   0.4],
    KNEE_L:   [-0.5,   1.6,   0.3],
    ANKLE_R:  [ 0.8,   2.0,  -0.3],
    KNEE_R:   [ 0.6,   1.5,  -0.2],
    NECK:     [ 0.0,   0.5,   0.0],
    HEAD_TOP: [ 0.1,   0.3,  -0.2],
    HIP:      [ 0,     0.4,   0.1],
  },
  // 3 — BACKSPIN (figure group spins on Y during this phase)
  {
    HEAD_TOP:   [ 0,     0.2,  -1.0],
    NECK:       [ 0,     0.2,  -0.7],
    HIP:        [ 0,     0.2,   0.2],
    SHOULDER_L: [-0.55,  0.25,  0.0],
    SHOULDER_R: [ 0.55,  0.25,  0.0],
    WRIST_L:    [-0.9,   0.25,  0.3],
    WRIST_R:    [ 0.9,   0.25,  0.3],
    ANKLE_L:    [-0.7,   1.8,   0.8],
    KNEE_L:     [-0.5,   1.4,   0.5],
    ANKLE_R:    [ 0.8,   1.8,  -0.5],
    KNEE_R:     [ 0.6,   1.4,  -0.3],
  },
  // 4 — SHOULDER FREEZE (spin decelerates)
  {
    HEAD_TOP:   [-0.4,  0.5,  -0.2],
    NECK:       [-0.3,  0.4,  -0.1],
    SHOULDER_L: [-0.5,  0.1,   0.0],
    WRIST_L:    [-0.7,  0.5,   0.3],
    ELBOW_L:    [-0.6,  0.4,   0.2],
    WRIST_R:    [ 0.4,  0.7,  -0.3],
    ANKLE_L:    [-0.3,  1.9,   0.2],
    KNEE_L:     [-0.3,  1.3,   0.1],
    ANKLE_R:    [ 0.7,  1.7,  -0.1],
    KNEE_R:     [ 0.5,  1.2,  -0.1],
    HIP:        [-0.1,  0.6,   0.1],
  },
  // 5 — BACK TO STAB (target = phase 0, handled below)
];

const PHASE_DURATIONS = [0.7, 0.3, 0.2, 0.7, 0.5, 0.4]; // seconds
const HEAD_SEGS = 16;

const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// ── Build a complete pose from neutral + overrides ──────────────────────────
const buildPose = (overrides: Pose): Record<Joint, THREE.Vector3> => {
  const result = {} as Record<Joint, THREE.Vector3>;
  for (const j of JOINTS) {
    const [x, y, z] = overrides[j] ?? NEUTRAL[j];
    result[j] = new THREE.Vector3(x, y, z);
  }
  return result;
};

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);

    // ── Materials ────────────────────────────────────────────────────────────
    const lineMat  = new THREE.LineBasicMaterial({ color: 0x4a3a5c, transparent: true, opacity: 0.8 });
    const floorMat = new THREE.LineBasicMaterial({ color: 0x4a3a5c, transparent: true, opacity: 0.1 });

    // ── Poses (6 phases — phase 5 uses phase 0's joints) ────────────────────
    const fullPoses = [
      buildPose(PHASE_POSES[0]),
      buildPose(PHASE_POSES[1]),
      buildPose(PHASE_POSES[2]),
      buildPose(PHASE_POSES[3]),
      buildPose(PHASE_POSES[4]),
      buildPose(PHASE_POSES[0]), // phase 5 returns to STAB
    ];

    // Live joint positions (mutated each frame)
    const joints = buildPose(PHASE_POSES[0]);

    // ── Figure group ─────────────────────────────────────────────────────────
    const figureGroup = new THREE.Group();
    scene.add(figureGroup);

    // Track all geometries for disposal
    const geos: THREE.BufferGeometry[] = [];

    // ── Build line segments for each connection ──────────────────────────────
    type LineEntry = { attr: THREE.BufferAttribute; a: Joint; b: Joint };
    const lineEntries: LineEntry[] = [];

    for (const [a, b] of CONNECTIONS) {
      const buf  = new Float32Array(6);
      const attr = new THREE.BufferAttribute(buf, 3);
      attr.setUsage(THREE.DynamicDrawUsage);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', attr);
      geos.push(geo);
      figureGroup.add(new THREE.Line(geo, lineMat));
      lineEntries.push({ attr, a, b });
    }

    // ── Head circle (LineLoop in XZ plane at HEAD_TOP) ───────────────────────
    const headBuf  = new Float32Array(HEAD_SEGS * 3);
    const headAttr = new THREE.BufferAttribute(headBuf, 3);
    headAttr.setUsage(THREE.DynamicDrawUsage);
    const headGeo = new THREE.BufferGeometry();
    headGeo.setAttribute('position', headAttr);
    geos.push(headGeo);
    figureGroup.add(new THREE.LineLoop(headGeo, lineMat));

    // ── Floor indicator (fixed — not in figureGroup) ─────────────────────────
    const FLOOR_SEGS = 64;
    const floorBuf = new Float32Array(FLOOR_SEGS * 3);
    for (let i = 0; i < FLOOR_SEGS; i++) {
      const a = (i / FLOOR_SEGS) * Math.PI * 2;
      floorBuf[i * 3]     = Math.cos(a) * 1.2;
      floorBuf[i * 3 + 1] = 0;
      floorBuf[i * 3 + 2] = Math.sin(a) * 1.2;
    }
    const floorGeo = new THREE.BufferGeometry();
    floorGeo.setAttribute('position', new THREE.BufferAttribute(floorBuf, 3));
    geos.push(floorGeo);
    scene.add(new THREE.LineLoop(floorGeo, floorMat));

    // ── Animation state ───────────────────────────────────────────────────────
    let phaseIndex    = 0;
    let phaseProgress = 0;
    let prevTime      = performance.now();
    let figureRotY    = 0;
    let spinSpeed     = 0;

    const updateJoints = () => {
      const prevPose   = fullPoses[phaseIndex === 0 ? 5 : phaseIndex - 1];
      const targetPose = fullPoses[phaseIndex];
      const t = easeInOut(Math.min(1, phaseProgress));
      for (const j of JOINTS) {
        joints[j].lerpVectors(prevPose[j], targetPose[j], t);
      }
    };

    const flushBuffers = () => {
      for (const { attr, a, b } of lineEntries) {
        const pa  = joints[a];
        const pb  = joints[b];
        const buf = attr.array as Float32Array;
        buf[0] = pa.x; buf[1] = pa.y; buf[2] = pa.z;
        buf[3] = pb.x; buf[4] = pb.y; buf[5] = pb.z;
        attr.needsUpdate = true;
      }
      // Head circle — horizontal ring at HEAD_TOP
      const hc = joints.HEAD_TOP;
      for (let i = 0; i < HEAD_SEGS; i++) {
        const a = (i / HEAD_SEGS) * Math.PI * 2;
        headBuf[i * 3]     = hc.x + Math.cos(a) * 0.2;
        headBuf[i * 3 + 1] = hc.y;
        headBuf[i * 3 + 2] = hc.z + Math.sin(a) * 0.2;
      }
      headAttr.needsUpdate = true;
    };

    // ── Mouse — vertical only ─────────────────────────────────────────────────
    const theta = 0.6; // fixed horizontal angle
    let currentPhi = 1.0;
    let targetPhi  = 1.0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const my   = e.clientY - rect.top;
      targetPhi  = Math.max(0.2, Math.min(1.4, 0.25 + (my / H) * 1.1));
    };
    container.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Render loop ───────────────────────────────────────────────────────────
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const now       = performance.now();
      const deltaTime = Math.min((now - prevTime) / 1000, 0.05);
      prevTime        = now;

      // Phase advance
      phaseProgress += deltaTime / PHASE_DURATIONS[phaseIndex];
      if (phaseProgress >= 1) {
        phaseProgress -= 1;
        phaseIndex     = (phaseIndex + 1) % 6;
      }

      // Windmill spin (phase 3) — decelerate through phase 4
      if (phaseIndex === 3) {
        spinSpeed = 0.08;
      } else if (phaseIndex === 4) {
        spinSpeed = 0.08 * (1 - easeInOut(Math.min(1, phaseProgress)));
      } else {
        spinSpeed = 0;
      }
      figureRotY              += spinSpeed;
      figureGroup.rotation.y   = figureRotY;

      // Joint lerp → buffer update
      updateJoints();
      flushBuffers();

      // Camera orbit (vertical only)
      currentPhi += (targetPhi - currentPhi) * 0.04;
      const r = 5;
      camera.position.x = r * Math.sin(currentPhi) * Math.sin(theta);
      camera.position.y = r * Math.cos(currentPhi) + 0.5;
      camera.position.z = r * Math.sin(currentPhi) * Math.cos(theta);
      camera.lookAt(0, 0.8, 0);

      renderer.render(scene, camera);
    };

    updateJoints();
    flushBuffers();
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', onMouseMove);
      geos.forEach(g => g.dispose());
      lineMat.dispose();
      floorMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: W, height: H }} />;
}
