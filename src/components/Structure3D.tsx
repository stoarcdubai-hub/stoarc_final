"use client";

import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment, useGLTF, Center, Edges, Grid } from "@react-three/drei";
import { media } from "@/content/media";

export type ViewMode = "blueprint" | "render";

const NAVY = "#1f3a5f";
const PAPER = "#f7f4ee";

/** STOARC's real model (once media.model3d is set). Blueprint mode = white faces + navy edges. */
function GlbModel({ url, mode }: { url: string; mode: ViewMode }) {
  const { scene } = useGLTF(url);
  const blueprint = useMemo(() => {
    const clone = scene.clone(true);
    const meshes: THREE.Mesh[] = [];
    clone.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh);
    });
    meshes.forEach((m) => {
      m.material = new THREE.MeshBasicMaterial({ color: PAPER });
      m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 20), new THREE.LineBasicMaterial({ color: NAVY })));
    });
    return clone;
  }, [scene]);
  return (
    <Center>
      <primitive object={mode === "blueprint" ? blueprint : scene} />
    </Center>
  );
}

/** One block of the placeholder building, drawn as render or as blueprint. */
function Block({
  position,
  size,
  color,
  mode,
  glass = false,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  mode: ViewMode;
  glass?: boolean;
}) {
  return (
    <mesh position={position} castShadow={mode === "render"} receiveShadow={mode === "render"}>
      <boxGeometry args={size} />
      {mode === "render" ? (
        glass ? (
          <meshPhysicalMaterial color={color} transmission={0.6} roughness={0.1} thickness={0.2} />
        ) : (
          <meshStandardMaterial color={color} />
        )
      ) : (
        <meshBasicMaterial color={PAPER} transparent opacity={glass ? 0.25 : 1} />
      )}
      {mode === "blueprint" && <Edges color={NAVY} threshold={15} />}
    </mesh>
  );
}

/** Temporary building made of simple blocks, used until the real model is ready. */
function PlaceholderBuilding({ mode }: { mode: ViewMode }) {
  return (
    <group>
      <Block mode={mode} position={[0, 0.1, 0]} size={[7, 0.2, 4.5]} color="#cfc6b4" />
      <Block mode={mode} position={[-1, 1.1, 0]} size={[4, 1.8, 3]} color="#e4dccb" />
      <Block mode={mode} position={[0.6, 2.45, -0.2]} size={[4.6, 0.9, 2.6]} color="#e4dccb" />
      <Block mode={mode} position={[2, 1.1, 0.3]} size={[2, 1.8, 2.2]} color="#9fb3b8" glass />
      <Block mode={mode} position={[0.6, 2.95, -0.2]} size={[4.9, 0.1, 2.9]} color="#3b352d" />
      {Array.from({ length: 9 }, (_, i) => (
        <Block key={i} mode={mode} position={[-2.8 + i * 0.22, 1.1, 1.52]} size={[0.08, 1.8, 0.06]} color="#8a6f52" />
      ))}
    </group>
  );
}

export default function Structure3D({
  mode = "blueprint",
  interactive = true,
}: {
  mode?: ViewMode;
  interactive?: boolean;
}) {
  const isBlueprint = mode === "blueprint";
  return (
    <Canvas shadows camera={{ position: [8, 5, 9], fov: 35 }} dpr={[1, 2]}>
      <color attach="background" args={[isBlueprint ? PAPER : "#ffffff"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 10, 6]} intensity={1.4} castShadow shadow-mapSize={[2048, 2048]} />

      <Suspense fallback={null}>
        {media.model3d ? <GlbModel url={media.model3d} mode={mode} /> : <PlaceholderBuilding mode={mode} />}
        {!isBlueprint && <Environment preset="city" />}
      </Suspense>

      {isBlueprint ? (
        <Grid
          position={[0, -0.001, 0]}
          infiniteGrid
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#8a9099"
          sectionSize={2.5}
          sectionThickness={1}
          sectionColor={NAVY}
          fadeDistance={28}
          fadeStrength={1.5}
        />
      ) : (
        <ContactShadows position={[0, 0, 0]} opacity={0.35} scale={20} blur={2.5} far={6} />
      )}

      <OrbitControls
        enabled={interactive}
        enablePan={false}
        minDistance={6}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate
        autoRotateSpeed={isBlueprint ? 0.35 : 0.6}
      />
    </Canvas>
  );
}