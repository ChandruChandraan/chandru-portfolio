import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Line } from "@react-three/drei";
import * as THREE from "three";

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Shared motion object mutated by GSAP in the parent component. */
export type SceneMotion = { current: { ry: number; drift: number } };

function heightAt(x: number, z: number) {
  const d = Math.sqrt(x * x + z * z);
  const falloff = THREE.MathUtils.smoothstep(d, 1.3, 4.4);
  return (
    (Math.sin(x * 0.55) * Math.cos(z * 0.45) * 0.42 +
      Math.sin(x * 1.05 + z * 0.7) * 0.24 +
      Math.cos(z * 0.9) * 0.16) *
      falloff -
    1.35
  );
}

function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(15, 15, 60, 60);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#131311" roughness={0.95} metalness={0.05} />
      </mesh>
      <mesh geometry={geometry} scale={1.002}>
        <meshBasicMaterial color="#2c2c28" wireframe transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function FlightPath({ reduced }: { reduced: boolean }) {
  const { curve, waypoints } = useMemo(() => {
    const pts = [
      new THREE.Vector3(-4.6, -1.05, 3.8),
      new THREE.Vector3(-2.4, -0.95, 1.4),
      new THREE.Vector3(0.2, -1.02, 2.2),
      new THREE.Vector3(2.0, -0.9, 0.2),
      new THREE.Vector3(3.9, -1.0, -2.4),
    ];
    const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.35);
    const waypoints = pts.map((p, i) => p.clone().add(new THREE.Vector3(0, 0.28 + i * 0.02, 0)));
    return { curve, waypoints };
  }, []);

  const tube = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.018, 6, false), [curve]);
  const markers = useRef<Array<THREE.Mesh | null>>([]);

  useFrame((state) => {
    if (reduced) return;
    markers.current.forEach((m, i) => {
      if (!m) return;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2.4 + i * 1.1) * 0.25;
      m.scale.setScalar(s);
    });
  });

  return (
    <group>
      <mesh geometry={tube}>
        <meshBasicMaterial color="#FF4D5A" transparent opacity={0.75} />
      </mesh>
      {waypoints.map((p, i) => (
        <mesh key={i} position={p} ref={(m) => (markers.current[i] = m)}>
          <octahedronGeometry args={[0.085, 0]} />
          <meshBasicMaterial color="#FF7A85" />
        </mesh>
      ))}

      {/* player-start beam */}
      <group position={[-4.6, -1.05, 3.8]}>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.4, 8]} />
          <meshBasicMaterial color="#FF4D5A" transparent opacity={0.55} />
        </mesh>
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.015, 8, 40]} />
          <meshBasicMaterial color="#FF4D5A" transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
}

function Structures() {
  const blocks = useMemo(() => {
    const rand = mulberry32(42);
    const list: Array<{
      x: number;
      z: number;
      y: number;
      w: number;
      h: number;
      d: number;
      edged: boolean;
    }> = [];
    for (let i = 0; i < 11; i++) {
      const angle = rand() * Math.PI * 2;
      const radius = 2.2 + rand() * 3.6;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const h = 0.5 + rand() * 1.9;
      list.push({
        x,
        z,
        y: heightAt(x, z) + h / 2,
        w: 0.5 + rand() * 1.1,
        h,
        d: 0.5 + rand() * 1.1,
        edged: rand() > 0.42,
      });
    }
    return list;
  }, []);

  return (
    <group>
      {blocks.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial color="#171715" roughness={0.75} metalness={0.3} />
          {b.edged && <Edges color="#8a5600" threshold={25} />}
        </mesh>
      ))}
    </group>
  );
}

function Radar({ reduced }: { reduced: boolean }) {
  const dish = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (reduced || !dish.current) return;
    dish.current.rotation.y += delta * 0.9;
  });

  const base = heightAt(-2.6, -2.4);
  return (
    <group position={[-2.6, base, -2.4]}>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.05, 0.09, 1.4, 8]} />
        <meshStandardMaterial color="#1c1c1a" roughness={0.6} metalness={0.5} />
      </mesh>
      <group ref={dish} position={[0, 1.5, 0]}>
        <mesh rotation={[Math.PI / 3.2, 0, 0]}>
          <coneGeometry args={[0.34, 0.24, 20, 1, true]} />
          <meshStandardMaterial
            color="#262622"
            roughness={0.4}
            metalness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshBasicMaterial color="#FF7A85" />
      </mesh>
    </group>
  );
}

function Portal({ reduced }: { reduced: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (reduced) return;
    if (ring.current) ring.current.rotation.z += delta * 0.35;
    if (glow.current) {
      const mat = glow.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.16 + Math.sin(state.clock.elapsedTime * 1.8) * 0.07;
    }
  });

  const base = heightAt(3.4, 2.6);
  return (
    <group position={[3.4, base, 2.6]}>
      <mesh ref={ring} position={[0, 1.15, 0]}>
        <torusGeometry args={[0.95, 0.028, 10, 64]} />
        <meshBasicMaterial color="#FF4D5A" />
      </mesh>
      <mesh ref={glow} position={[0, 1.15, 0]}>
        <circleGeometry args={[0.92, 40]} />
        <meshBasicMaterial color="#B92536" transparent opacity={0.16} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.62, 0.72, 0.1, 24]} />
        <meshStandardMaterial color="#0D0F14" roughness={0.5} metalness={0.5} />
        <Edges color="#FF4D5A" threshold={30} />
      </mesh>
    </group>
  );
}

function BlueprintWeb({ reduced }: { reduced: boolean }) {
  const nodes = useMemo<Array<[number, number, number]>>(
    () => [
      [-1.2, 2.9, 0.6],
      [0.9, 3.6, -1.4],
      [2.6, 2.8, 0.9],
      [0.4, 4.3, 1.6],
    ],
    []
  );
  const meshes = useRef<Array<THREE.Mesh | null>>([]);

  useFrame((state) => {
    if (reduced) return;
    meshes.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.y += 0.012 + i * 0.003;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.9) * 0.16;
      m.scale.setScalar(s);
    });
  });

  return (
    <group>
      {nodes.slice(0, -1).map((p, i) => (
        <Line
          key={i}
          points={[p, nodes[i + 1]]}
          color="#FF4D5A"
          lineWidth={1}
          transparent
          opacity={0.5}
          dashed
          dashSize={0.16}
          gapSize={0.11}
        />
      ))}
      {nodes.map((p, i) => (
        <mesh key={i} position={p} ref={(m) => (meshes.current[i] = m)}>
          <octahedronGeometry args={[0.11, 0]} />
          <meshStandardMaterial
            color="#08090C"
            emissive="#B92536"
            emissiveIntensity={1.6}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

function AmbientParticles({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const rand = mulberry32(11);
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 16;
      positions[i * 3 + 1] = -1 + rand() * 7;
      positions[i * 3 + 2] = (rand() - 0.5) * 16;
      speeds[i] = 0.05 + rand() * 0.16;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      if (arr[i * 3 + 1] > 6.5) arr[i * 3 + 1] = -1;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FF7A85" size={0.05} sizeAttenuation transparent opacity={0.45} depthWrite={false} />
    </points>
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

export type UnrealSceneProps = {
  reduced: boolean;
  low: boolean;
  frameloop: "always" | "demand" | "never";
  motion: SceneMotion;
};

/**
 * Miniature development world: displaced terrain, a drone flight path with
 * markers and player-start beam, a modular base, rotating radar, a VR portal
 * and floating blueprint node links.
 */
export default function UnrealScene({ reduced, low, frameloop, motion }: UnrealSceneProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={low ? [1, 1.3] : [1, 1.8]}
      gl={{ antialias: !low, powerPreference: "high-performance", alpha: false }}
      camera={{ fov: 40, near: 0.1, far: 70, position: [7, 5.1, 8.4] }}
      className="!absolute !inset-0"
    >
      <color attach="background" args={["#090909"]} />
      <fog attach="fog" args={["#090909", 14, 34]} />
      <InvalidateOnce />
      <MiniatureWorld reduced={reduced} low={low} motion={motion} />
    </Canvas>
  );
}

function MiniatureWorld({
  reduced,
  low,
  motion,
}: {
  reduced: boolean;
  low: boolean;
  motion: SceneMotion;
}) {
  const world = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();
  const autoDrift = useRef(0);

  useFrame((_, delta) => {
    if (!reduced) autoDrift.current += delta * 0.028;
    if (world.current) {
      world.current.rotation.y = motion.current.ry + autoDrift.current;
    }
    if (!reduced) {
      camera.position.x += (7 + pointer.x * 0.7 - camera.position.x) * 0.03;
      camera.position.y += (5.1 + pointer.y * 0.5 - camera.position.y) * 0.03;
    }
    camera.lookAt(0, -0.4, 0);
  });

  return (
    <>
      <group ref={world} position={[0, -0.6, 0]}>
        <Terrain />
        <FlightPath reduced={reduced} />
        <Structures />
        <Radar reduced={reduced} />
        <Portal reduced={reduced} />
        <BlueprintWeb reduced={reduced} />
        {!reduced && <AmbientParticles count={low ? 120 : 320} reduced={reduced} />}
      </group>

      <hemisphereLight args={["#0D0F14", "#08090C", 0.6]} />
      <pointLight position={[4.5, 6.5, 3]} color="#FF7A85" intensity={55} distance={28} decay={2} />
      <pointLight position={[3.4, 1.4, 2.6]} color="#FF4D5A" intensity={7} distance={7} decay={2} />
      <directionalLight position={[-6, 5, -5]} intensity={0.65} color="#C8CDD5" />
    </>
  );
}
