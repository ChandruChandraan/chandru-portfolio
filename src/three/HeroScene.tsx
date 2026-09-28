import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, Edges, Line } from "@react-three/drei";
import * as THREE from "three";

/* deterministic pseudo random for a stable blockout */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type RigProps = { reduced: boolean; bias: number };

function CameraRig({ reduced, bias }: RigProps) {
  const { camera, pointer } = useThree();
  const t = useRef(0);

  useFrame((_, delta) => {
    if (reduced) {
      camera.position.set(bias * 0.4, 1.5, 8.4);
      camera.lookAt(bias * 0.6, 0.1, 0);
      return;
    }
    t.current += delta;
    const sway = Math.sin(t.current * 0.1) * 0.6;
    camera.position.z += (7.9 - camera.position.z) * 0.012;
    camera.position.x += (bias * 0.4 + sway + pointer.x * 0.5 - camera.position.x) * 0.035;
    camera.position.y += (1.45 + pointer.y * 0.32 - camera.position.y) * 0.035;
    camera.lookAt(bias * 0.62, 0.05, 0);
  });
  return null;
}

function Particles({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const rand = mulberry32(7);
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 20;
      positions[i * 3 + 1] = -1.4 + rand() * 8;
      positions[i * 3 + 2] = (rand() - 0.5) * 18 - 2;
      speeds[i] = 0.06 + rand() * 0.22;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current || reduced) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      if (arr[i * 3 + 1] > 7) arr[i * 3 + 1] = -1.5;
    }
    attr.needsUpdate = true;
    ref.current.rotation.y = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#FF4D5A"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

function Core({ reduced, position }: { reduced: boolean; position: [number, number, number] }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.y += delta * 0.28;
      outer.current.rotation.x = Math.sin(t * 0.2) * 0.35;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.45;
      const s = 1 + Math.sin(t * 2.2) * 0.07;
      inner.current.scale.setScalar(s);
      const mat = inner.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.7 + Math.sin(t * 2.2) * 0.55;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.25;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.18;
  });

  return (
    <group position={position}>
      {/* spawn platform */}
      <mesh position={[0, -1.52, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.08, 48]} />
        <meshStandardMaterial color="#141414" roughness={0.55} metalness={0.45} />
        <Edges color="#7a4d00" threshold={20} />
      </mesh>
      <mesh position={[0, -1.46, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.18, 0.012, 8, 72]} />
        <meshBasicMaterial color="#ff9800" transparent opacity={0.5} />
      </mesh>

      {/* the core */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshBasicMaterial color="#FF4D5A" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color="#08090C"
          emissive="#B92536"
          emissiveIntensity={1.8}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[1.75, 0.009, 8, 92]} />
        <meshBasicMaterial color="#FF4D5A" transparent opacity={0.32} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.7, -0.5, 0.6]}>
        <torusGeometry args={[2.15, 0.007, 8, 92]} />
        <meshBasicMaterial color="#FF7A85" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

type Block = {
  x: number;
  z: number;
  w: number;
  h: number;
  d: number;
  wire: boolean;
  edged: boolean;
};

function BlockOut({ low, reduced }: { low: boolean; reduced: boolean }) {
  const blocks = useMemo<Block[]>(() => {
    const rand = mulberry32(21);
    const list: Block[] = [];
    const total = low ? 9 : 15;
    for (let i = 0; i < total; i++) {
      const angle = (i / total) * Math.PI * 2 + rand() * 0.6;
      const radius = 3.4 + rand() * 3.4;
      list.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius * 0.85 - 0.4,
        w: 0.55 + rand() * 1.2,
        h: 0.45 + rand() * 2.3,
        d: 0.55 + rand() * 1.2,
        wire: rand() > 0.72,
        edged: rand() > 0.45,
      });
    }
    return list;
  }, [low]);

  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (reduced || !group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.04;
  });

  return (
    <group ref={group} position={[0, -1.6, 0]}>
      {blocks.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          {b.wire ? (
            <meshBasicMaterial color="#333330" wireframe />
          ) : (
            <meshStandardMaterial color="#161616" roughness={0.8} metalness={0.25} />
          )}
          {b.edged && !b.wire && <Edges color="#8a5600" threshold={25} />}
        </mesh>
      ))}
    </group>
  );
}

function BlueprintLinks({ reduced }: { reduced: boolean }) {
  const markers = useRef<Array<THREE.Mesh | null>>([]);

  const pts: Array<[number, number, number]> = useMemo(
    () => [
      [2.9, 1.5, -1.8],
      [3.9, 2.4, -0.4],
      [3.1, 3.1, 1.3],
      [4.6, 1.6, 1.9],
    ],
    []
  );

  useFrame((state) => {
    if (reduced) return;
    markers.current.forEach((m, i) => {
      if (!m) return;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 1.4) * 0.22;
      m.scale.setScalar(s);
    });
  });

  return (
    <group>
      {pts.slice(0, -1).map((p, i) => (
        <Line
          key={i}
          points={[p, pts[i + 1]]}
          color="#ff9800"
          lineWidth={1}
          transparent
          opacity={0.45}
          dashed
          dashSize={0.15}
          gapSize={0.1}
        />
      ))}
      {pts.map((p, i) => (
        <mesh key={i} position={p} ref={(m) => (markers.current[i] = m)}>
          <octahedronGeometry args={[0.07, 0]} />
          <meshBasicMaterial color="#FF7A85" />
        </mesh>
      ))}
    </group>
  );
}

function InvalidateOnce() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
    const t = setTimeout(invalidate, 120);
    return () => clearTimeout(t);
  }, [invalidate]);
  return null;
}

export type HeroSceneProps = {
  reduced: boolean;
  low: boolean;
  frameloop: "always" | "demand" | "never";
  canvasRef?: MutableRefObject<HTMLDivElement | null>;
};

/**
 * Cinematic "level blockout" — modular geometry, spawn platform, pulsing
 * core, blueprint node links and rising ambient particles on an infinite
 * technical grid.
 */
export default function HeroScene({ reduced, low, frameloop }: HeroSceneProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={low ? [1, 1.3] : [1, 1.8]}
      gl={{ antialias: !low, powerPreference: "high-performance", alpha: false }}
      camera={{ fov: 42, near: 0.1, far: 60, position: [0, 1.6, 11] }}
      className="!absolute !inset-0"
    >
      <color attach="background" args={["#08090C"]} />
      <fog attach="fog" args={["#08090C", 10.5, 27]} />
      <InvalidateOnce />
      <World reduced={reduced} low={low} />
    </Canvas>
  );
}

function World({ reduced, low }: { reduced: boolean; low: boolean }) {
  const { size } = useThree();
  const bias = size.width >= 1280 ? 1.9 : size.width >= 1024 ? 1.5 : size.width >= 768 ? 0.8 : 0;

  return (
    <>
      <CameraRig reduced={reduced} bias={bias} />

      <Grid
        position={[0, -1.6, 0]}
        args={[44, 44]}
        cellSize={0.62}
        cellThickness={0.6}
        cellColor="#1A1D26"
        sectionSize={3.1}
        sectionThickness={1}
        sectionColor={new THREE.Color("#B92536")}
        fadeDistance={25}
        fadeStrength={2.2}
        infiniteGrid
      />

      <group position={[bias, 0, 0]}>
        <Core reduced={reduced} position={[0, 0.15, 0]} />
        <BlockOut low={low} reduced={reduced} />
        <BlueprintLinks reduced={reduced} />
        <Particles count={reduced ? 0 : low ? 180 : 480} reduced={reduced} />
      </group>

      <ambientLight intensity={0.22} />
      <pointLight position={[bias, 0.6, 0]} color="#FF4D5A" intensity={9} distance={11} decay={2} />
      <spotLight
        position={[bias + 6, 9, 4]}
        angle={0.55}
        penumbra={0.9}
        intensity={90}
        distance={36}
        color="#FF7A85"
      />
      <directionalLight position={[-7, 5, -6]} intensity={0.7} color="#C8CDD5" />
    </>
  );
}
