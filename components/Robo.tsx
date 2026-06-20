"use client";

/**
 * MeshyHumanoid.tsx
 * 3D humanoid robot — style & palette derived from Meshy AI GLB texture analysis:
 *   Body:    #d3d4d5  (light grey, metalness ~0.66, roughness ~0.22)
 *   Joints:  #747475  (mid grey,   metalness ~0.55, roughness ~0.35)
 *   Dark:    #292b2b  (near-black panels)
 *   Accent:  #4db0df  (steel-blue glow — eyes, chest core, antenna)
 *
 * Props:
 *   pose     – "idle" | "wave" | "point" | "walk" | "crouch"
 *   speaking – show animated sound-bars on face screen
 *   scale    – uniform scale (default 1)
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Shared materials (memoised at module level) ──────────────────────────────

// Body panels — light metallic grey, matches Meshy #d3d4d5, moderate shine
const M_BODY = (
  <meshPhysicalMaterial
    color="#d3d4d5"
    metalness={0.66}
    roughness={0.22}
    clearcoat={0.7}
    clearcoatRoughness={0.1}
    envMapIntensity={1.2}
  />
);

// Joint cylinders / spheres — mid grey #747475
const M_JOINT = (
  <meshStandardMaterial
    color="#747475"
    metalness={0.55}
    roughness={0.35}
    envMapIntensity={1.0}
  />
);

// Dark recessed panels — #292b2b
const M_DARK = (
  <meshStandardMaterial color="#292b2b" metalness={0.3} roughness={0.5} />
);

// Blue accent glow — #4db0df / emissive
const M_ACCENT = (
  <meshStandardMaterial
    color="#4db0df"
    emissive="#1a6ea0"
    emissiveIntensity={2.2}
    toneMapped={false}
  />
);

// Bright eye glow — slightly lighter
const M_EYE = (
  <meshStandardMaterial
    color="#7dd8f8"
    emissive="#3aaee9"
    emissiveIntensity={3.0}
    toneMapped={false}
  />
);

// Specular highlight dot on eye
const M_SPEC = (
  <meshStandardMaterial
    color="#ffffff"
    emissive="#ffffff"
    emissiveIntensity={0.8}
  />
);

// Face screen — very dark navy
const M_SCREEN = (
  <meshStandardMaterial color="#0b1218" metalness={0.2} roughness={0.6} />
);

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated sound-bar — scales Y on clock */
function SoundBar({ x, h, delay }: { x: number; h: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.scale.y = 0.35 + Math.abs(Math.sin(clock.getElapsedTime() * 6.28 + delay)) * 0.65;
  });
  return (
    <mesh ref={ref} position={[x, -0.055, 0.021]}>
      <boxGeometry args={[0.009, h * 0.05, 0.007]} />
      {M_ACCENT}
    </mesh>
  );
}

/** Face plate — dark screen, glowing eyes, smile, optional sound bars */
function FacePlate({ speaking }: { speaking: boolean }) {
  const blinkRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!blinkRef.current) return;
    const cycle = clock.getElapsedTime() % 3.5;
    blinkRef.current.scale.y = cycle > 3.3 && cycle < 3.42 ? 0.07 : 1;
  });

  return (
    <group position={[0, 0, 0.245]}>
      {/* Screen panel */}
      <mesh>
        <boxGeometry args={[0.4, 0.28, 0.03]} />
        {M_SCREEN}
      </mesh>

      {/* Subtle inner glow plane */}
      <mesh position={[0, 0.02, 0.016]}>
        <planeGeometry args={[0.36, 0.1]} />
        <meshStandardMaterial
          color="#1a4a7a"
          emissive="#1a4a7a"
          emissiveIntensity={0.15}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Eyes — blink group */}
      <group ref={blinkRef} position={[0, 0.055, 0.018]}>
        {([-0.095, 0.095] as const).map((ex, i) => (
          <group key={i} position={[ex, 0, 0]}>
            {/* Eye iris */}
            <mesh>
              <sphereGeometry args={[0.05, 24, 24]} />
              {M_EYE}
            </mesh>
            {/* Pupil ring */}
            <mesh position={[0, 0, 0.04]}>
              <torusGeometry args={[0.024, 0.008, 8, 24]} />
              {M_DARK}
            </mesh>
            {/* Specular dot */}
            <mesh position={[-0.014, 0.018, 0.042]}>
              <sphereGeometry args={[0.012, 10, 10]} />
              {M_SPEC}
            </mesh>
          </group>
        ))}
      </group>

      {/* Smile — 5-segment arc */}
      {([-0.07, -0.035, 0, 0.035, 0.07] as number[]).map((sx, i) => {
        const sy = -0.035 + Math.pow(Math.abs(sx) / 0.075, 1.5) * 0.025;
        return (
          <mesh key={i} position={[sx, sy - 0.02, 0.018]} rotation={[0, 0, (sx / 0.075) * 0.3]}>
            <boxGeometry args={[0.024, 0.008, 0.007]} />
            {M_ACCENT}
          </mesh>
        );
      })}

      {/* Sound bars */}
      {speaking &&
        ([0.6, 1.0, 0.75, 1.2, 0.65] as number[]).map((h, i) => (
          <SoundBar key={i} x={0.1 + i * 0.019} h={h} delay={i * 0.09} />
        ))}

      {/* Corner rivets */}
      {(
        [
          [0.18, 0.12],
          [-0.18, 0.12],
          [0.18, -0.12],
          [-0.18, -0.12],
        ] as [number, number][]
      ).map(([rx, ry], i) => (
        <mesh key={i} position={[rx, ry, 0.017]}>
          <cylinderGeometry args={[0.011, 0.011, 0.01, 8]} />
          {M_DARK}
        </mesh>
      ))}
    </group>
  );
}

/** Finger — a small capsule */
function Finger({
  pos,
  rot,
  len = 0.05,
}: {
  pos: [number, number, number];
  rot: [number, number, number];
  len?: number;
}) {
  return (
    <mesh position={pos} rotation={rot}>
      <capsuleGeometry args={[0.012, len, 4, 8]} />
      {M_DARK}
    </mesh>
  );
}

/** Hand — palm + 4 fingers */
function Hand({ open = true }: { open?: boolean }) {
  return (
    <group>
      {/* Palm */}
      <mesh>
        <boxGeometry args={[0.1, 0.09, 0.055]} />
        {M_BODY}
      </mesh>
      {/* Wrist cuff */}
      <mesh position={[0, 0.055, 0]}>
        <cylinderGeometry args={[0.048, 0.05, 0.025, 18]} />
        {M_JOINT}
      </mesh>
      {/* Fingers */}
      {([-0.03, -0.01, 0.01, 0.03] as number[]).map((fx, i) => (
        <Finger
          key={i}
          pos={[fx, open ? -0.085 : -0.06, open ? 0 : 0.02]}
          rot={[open ? 0.1 : 0.7, 0, 0]}
          len={i === 0 || i === 3 ? 0.04 : 0.055}
        />
      ))}
      {/* Thumb */}
      <Finger
        pos={[open ? 0.058 : 0.055, -0.025, 0.02]}
        rot={[0.4, 0, open ? -0.8 : -0.5]}
        len={0.038}
      />
    </group>
  );
}

/** Single leg assembly */
function Leg({ side }: { side: "left" | "right" }) {
  const sign = side === "right" ? 1 : -1;
  return (
    <group>
      {/* Hip ball */}
      <mesh>
        <sphereGeometry args={[0.1, 24, 24]} />
        {M_JOINT}
      </mesh>
      {/* Upper leg */}
      <mesh position={[0, -0.2, 0]}>
        <capsuleGeometry args={[0.085, 0.28, 8, 16]} />
        {M_BODY}
      </mesh>
      {/* Knee joint */}
      <mesh position={[0, -0.38, 0]}>
        <sphereGeometry args={[0.072, 20, 20]} />
        {M_JOINT}
      </mesh>
      {/* Knee guard plate */}
      <mesh position={[0, -0.38, 0.07]}>
        <boxGeometry args={[0.1, 0.08, 0.03]} />
        {M_DARK}
      </mesh>
      {/* Lower leg */}
      <mesh position={[0, -0.6, 0.015]}>
        <capsuleGeometry args={[0.065, 0.32, 8, 16]} />
        {M_BODY}
      </mesh>
      {/* Ankle */}
      <mesh position={[0, -0.79, 0]}>
        <cylinderGeometry args={[0.055, 0.06, 0.045, 18]} />
        {M_JOINT}
      </mesh>
      {/* Foot */}
      <mesh position={[0, -0.84, 0.055]}>
        <boxGeometry args={[0.14, 0.07, 0.24]} />
        {M_BODY}
      </mesh>
      {/* Sole strip */}
      <mesh position={[0, -0.88, 0.065]}>
        <boxGeometry args={[0.12, 0.01, 0.2]} />
        {M_DARK}
      </mesh>
      {/* Toe accent line */}
      <mesh position={[0, -0.845, 0.165]}>
        <boxGeometry args={[0.13, 0.025, 0.01]} />
        {M_ACCENT}
      </mesh>
    </group>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Pose = "idle" | "wave" | "point" | "walk" | "crouch";

type Props = {
  pose?: Pose;
  speaking?: boolean;
  scale?: number;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MeshyHumanoid({ pose = "idle", speaking = false, scale = 1 }: Props) {
  // Refs for animated parts
  const rootRef    = useRef<THREE.Group>(null);
  const headRef    = useRef<THREE.Group>(null);
  const torsoRef   = useRef<THREE.Group>(null);
  const rArmRef    = useRef<THREE.Group>(null);
  const rForeRef   = useRef<THREE.Group>(null);
  const lArmRef    = useRef<THREE.Group>(null);
  const lForeRef   = useRef<THREE.Group>(null);
  const rLegRef    = useRef<THREE.Group>(null);
  const lLegRef    = useRef<THREE.Group>(null);
  const antTipRef  = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Floating bob
    if (rootRef.current) rootRef.current.position.y = Math.sin(t * 1.1) * 0.04;

    // Head look-around
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.45) * 0.28;
      headRef.current.rotation.x = Math.sin(t * 0.65) * 0.06;
    }

    // Antenna pulse scale
    if (antTipRef.current) {
      const p = 1 + Math.sin(t * 3.8) * 0.14;
      antTipRef.current.scale.setScalar(p);
    }

    // Torso subtle sway
    if (torsoRef.current) {
      torsoRef.current.rotation.z = Math.sin(t * 0.9) * 0.018;
    }

    // Arm / leg poses
    if (!rArmRef.current || !lArmRef.current) return;

    // Reset all first
    [rArmRef, lArmRef, rForeRef, lForeRef].forEach((r) => {
      if (r.current) {
        r.current.rotation.x = 0;
        r.current.rotation.z = 0;
      }
    });

    switch (pose) {
      case "wave":
        rArmRef.current.rotation.z = -2.05;
        if (rForeRef.current) rForeRef.current.rotation.z = Math.sin(t * 5) * 0.45 - 0.3;
        lArmRef.current.rotation.z = 0.22;
        if (lForeRef.current) lForeRef.current.rotation.z = 0.18;
        break;

      case "point":
        rArmRef.current.rotation.z = -1.3;
        rArmRef.current.rotation.x = -0.3;
        if (rForeRef.current) {
          rForeRef.current.rotation.z = -0.08;
          rForeRef.current.rotation.x = -0.12;
        }
        lArmRef.current.rotation.z = 0.22;
        break;

      case "walk":
        rArmRef.current.rotation.x = Math.sin(t * 4.8) * 0.55;
        lArmRef.current.rotation.x = -Math.sin(t * 4.8) * 0.55;
        rArmRef.current.rotation.z = 0.18;
        lArmRef.current.rotation.z = -0.18;
        if (rLegRef.current) rLegRef.current.rotation.x = Math.sin(t * 4.8) * 0.42;
        if (lLegRef.current) lLegRef.current.rotation.x = -Math.sin(t * 4.8) * 0.42;
        break;

      case "crouch":
        rArmRef.current.rotation.z = 0.45;
        lArmRef.current.rotation.z = -0.45;
        if (rForeRef.current) rForeRef.current.rotation.z = 0.5;
        if (lForeRef.current) lForeRef.current.rotation.z = -0.5;
        if (rLegRef.current) rLegRef.current.rotation.x = 0.55;
        if (lLegRef.current) lLegRef.current.rotation.x = 0.55;
        torsoRef.current && (torsoRef.current.rotation.x = 0.15);
        break;

      default: // idle
        rArmRef.current.rotation.z = 0.18 + Math.sin(t * 1.4) * 0.04;
        lArmRef.current.rotation.z = -0.18 - Math.sin(t * 1.4) * 0.04;
        if (rLegRef.current) rLegRef.current.rotation.x = 0;
        if (lLegRef.current) lLegRef.current.rotation.x = 0;
        break;
    }
  });

  return (
    <group position={[0, -1.1, 0]} scale={scale}>
      <group ref={rootRef}>

        {/* ── ANTENNA ─────────────────────────────────────────────────── */}
        <mesh position={[0.065, 2.32, 0.035]} rotation={[0, 0, -0.28]}>
          <cylinderGeometry args={[0.011, 0.011, 0.26, 10]} />
          {M_JOINT}
        </mesh>
        <mesh ref={antTipRef} position={[0.12, 2.45, 0.035]}>
          <sphereGeometry args={[0.03, 18, 18]} />
          {M_ACCENT}
        </mesh>
        {/* Second smaller antenna */}
        <mesh position={[-0.04, 2.28, 0.02]} rotation={[0, 0, 0.18]}>
          <cylinderGeometry args={[0.008, 0.008, 0.16, 8]} />
          {M_JOINT}
        </mesh>
        <mesh position={[-0.075, 2.36, 0.02]}>
          <sphereGeometry args={[0.018, 14, 14]} />
          {M_EYE}
        </mesh>

        {/* ── HEAD ────────────────────────────────────────────────────── */}
        <group ref={headRef} position={[0, 1.95, 0]}>
          {/* Main head shell — slightly squarish sphere */}
          <mesh castShadow scale={[1.05, 1.08, 0.98]}>
            <sphereGeometry args={[0.29, 48, 48]} />
            {M_BODY}
          </mesh>

          {/* Brow ridge */}
          <mesh position={[0, 0.14, 0.25]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.32, 0.045, 0.04]} />
            {M_DARK}
          </mesh>

          {/* Temple panels */}
          {([-1, 1] as const).map((s, i) => (
            <mesh key={i} position={[s * 0.27, 0.04, 0.06]}>
              <boxGeometry args={[0.04, 0.14, 0.2]} />
              {M_DARK}
            </mesh>
          ))}

          {/* Face plate */}
          <FacePlate speaking={speaking} />

          {/* Side ear disc */}
          <mesh position={[0.29, 0.0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.078, 0.078, 0.04, 28]} />
            {M_JOINT}
          </mesh>
          <mesh position={[0.31, 0.0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.028, 0.028, 0.04, 14]} />
            {M_ACCENT}
          </mesh>
          <mesh position={[-0.29, 0.0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.078, 0.078, 0.04, 28]} />
            {M_JOINT}
          </mesh>

          {/* Neck collar */}
          <mesh position={[0, -0.24, 0]}>
            <cylinderGeometry args={[0.1, 0.115, 0.08, 24]} />
            {M_JOINT}
          </mesh>
        </group>

        {/* ── NECK ────────────────────────────────────────────────────── */}
        <mesh position={[0, 1.65, 0]}>
          <cylinderGeometry args={[0.09, 0.1, 0.12, 24]} />
          {M_JOINT}
        </mesh>

        {/* ── SHOULDER YOKE ───────────────────────────────────────────── */}
        <mesh position={[0, 1.54, 0]} castShadow>
          <boxGeometry args={[0.7, 0.1, 0.34]} />
          {M_BODY}
        </mesh>
        {/* Accent line on yoke */}
        <mesh position={[0, 1.545, 0.17]}>
          <boxGeometry args={[0.65, 0.012, 0.005]} />
          {M_ACCENT}
        </mesh>

        {/* ── TORSO ───────────────────────────────────────────────────── */}
        <group ref={torsoRef} position={[0, 1.22, 0]}>
          {/* Main torso box */}
          <mesh castShadow>
            <boxGeometry args={[0.52, 0.58, 0.32]} />
            {M_BODY}
          </mesh>

          {/* Chest panel inset */}
          <mesh position={[0, 0.08, 0.163]}>
            <boxGeometry args={[0.34, 0.28, 0.01]} />
            {M_DARK}
          </mesh>

          {/* Chest reactor core */}
          <mesh position={[0, 0.1, 0.168]}>
            <cylinderGeometry args={[0.055, 0.055, 0.012, 24]} />
            {M_ACCENT}
          </mesh>
          {/* Core ring */}
          <mesh position={[0, 0.1, 0.169]}>
            <torusGeometry args={[0.065, 0.009, 8, 28]} />
            {M_JOINT}
          </mesh>

          {/* LED strips on chest */}
          {([-0.08, 0, 0.08] as number[]).map((ly, i) => (
            <mesh key={i} position={[0.1, ly, 0.163]}>
              <boxGeometry args={[0.08, 0.007, 0.006]} />
              {M_ACCENT}
            </mesh>
          ))}

          {/* Abs panel lines */}
          {([-0.04, -0.12] as number[]).map((ay, i) => (
            <mesh key={i} position={[0, ay, 0.162]}>
              <boxGeometry args={[0.3, 0.006, 0.005]} />
              {M_JOINT}
            </mesh>
          ))}

          {/* Back spine ridge */}
          <mesh position={[0, 0, -0.16]}>
            <boxGeometry args={[0.05, 0.52, 0.016]} />
            {M_DARK}
          </mesh>
        </group>

        {/* Waist */}
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.19, 0.21, 0.2, 28]} />
          {M_JOINT}
        </mesh>

        {/* ── PELVIS ──────────────────────────────────────────────────── */}
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[0.42, 0.16, 0.28]} />
          {M_BODY}
        </mesh>
        {/* Pelvis accent strip */}
        <mesh position={[0, 0.692, 0.14]}>
          <boxGeometry args={[0.38, 0.01, 0.005]} />
          {M_ACCENT}
        </mesh>

        {/* ── SHOULDER DOMES ──────────────────────────────────────────── */}
        {([-0.38, 0.38] as number[]).map((sx, i) => (
          <group key={i} position={[sx, 1.54, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.17, 32, 32]} />
              {M_BODY}
            </mesh>
            {/* Shoulder accent ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.13, 0.01, 8, 28]} />
              {M_ACCENT}
            </mesh>
          </group>
        ))}

        {/* ── RIGHT ARM ───────────────────────────────────────────────── */}
        <group ref={rArmRef} position={[0.42, 1.48, 0]}>
          {/* Upper arm */}
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.075, 0.28, 8, 16]} />
            {M_BODY}
          </mesh>
          {/* Elbow joint */}
          <mesh position={[0, -0.38, 0]}>
            <sphereGeometry args={[0.065, 20, 20]} />
            {M_JOINT}
          </mesh>
          {/* Forearm */}
          <group ref={rForeRef} position={[0, -0.4, 0]}>
            <mesh position={[0, -0.18, 0]} castShadow>
              <capsuleGeometry args={[0.055, 0.28, 8, 16]} />
              {M_BODY}
            </mesh>
            {/* Wrist */}
            <mesh position={[0, -0.35, 0]}>
              <cylinderGeometry args={[0.048, 0.052, 0.04, 18]} />
              {M_JOINT}
            </mesh>
            {/* Hand */}
            <group position={[0, -0.39, 0]} rotation={[0, 0, 0]}>
              <Hand open={pose !== "point"} />
            </group>
          </group>
        </group>

        {/* ── LEFT ARM ────────────────────────────────────────────────── */}
        <group ref={lArmRef} position={[-0.42, 1.48, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.075, 0.28, 8, 16]} />
            {M_BODY}
          </mesh>
          <mesh position={[0, -0.38, 0]}>
            <sphereGeometry args={[0.065, 20, 20]} />
            {M_JOINT}
          </mesh>
          <group ref={lForeRef} position={[0, -0.4, 0]}>
            <mesh position={[0, -0.18, 0]} castShadow>
              <capsuleGeometry args={[0.055, 0.28, 8, 16]} />
              {M_BODY}
            </mesh>
            <mesh position={[0, -0.35, 0]}>
              <cylinderGeometry args={[0.048, 0.052, 0.04, 18]} />
              {M_JOINT}
            </mesh>
            <group position={[0, -0.39, 0]}>
              <Hand open />
            </group>
          </group>
        </group>

        {/* ── LEGS ────────────────────────────────────────────────────── */}
        <group ref={rLegRef} position={[0.14, 0.63, 0]}>
          <Leg side="right" />
        </group>
        <group ref={lLegRef} position={[-0.14, 0.63, 0]}>
          <Leg side="left" />
        </group>

      </group>
    </group>
  );
}