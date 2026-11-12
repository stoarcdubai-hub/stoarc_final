"use client";

import { Suspense, useMemo, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment, useGLTF, Center, Edges, Grid } from "@react-three/drei";
import { media } from "@/content/media";

export type ViewMode = "blueprint" | "render";

const NAVY = "#1f3a5f";
const PAPER = "#f7f4ee";
const WARM_BG = "#f3ece1";

/** STOARC's real model (once media.model3d is set). */
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

/** One part of the placeholder villa, drawn as render or as blueprint. */
function Part({
  position,
  rotation,
  color = "#e9e1d3",
  mode,
  glass = false,
  children,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  mode: ViewMode;
  glass?: boolean;
  children: ReactNode;
}) {
  const r = mode === "render";
  return (
    <mesh position={position} rotation={rotation} castShadow={r} receiveShadow={r}>
      {children}
      {r ? (
        glass ? (
          <meshPhysicalMaterial
            color="#c9b38c"
            transmission={0.35}
            roughness={0.08}
            metalness={0.1}
            emissive="#f2b766"
            emissiveIntensity={0.35}
          />
        ) : (
          <meshStandardMaterial color={color} roughness={0.85} />
        )
      ) : (
        <meshBasicMaterial color={PAPER} transparent opacity={glass ? 0.25 : 1} />
      )}
      {!r && <Edges color={NAVY} threshold={15} />}
    </mesh>
  );
}

function Tree({ position, scale = 1, mode }: { position: [number, number, number]; scale?: number; mode: ViewMode }) {
  return (
    <group position={position} scale={scale}>
      <Part mode={mode} position={[0, 0.7, 0]} color="#6b4f35">
        <cylinderGeometry args={[0.07, 0.1, 1.4, 6]} />
      </Part>
      <Part mode={mode} position={[0, 1.9, 0]} color="#6f7d40">
        <icosahedronGeometry args={[0.85, 1]} />
      </Part>
      <Part mode={mode} position={[0.35, 2.45, 0.1]} color="#7c8a47">
        <icosahedronGeometry args={[0.55, 1]} />
      </Part>
    </group>
  );
}

/** Temporary two-storey villa, used until the real model is ready. */
function PlaceholderVilla({ mode }: { mode: ViewMode }) {
  const fins = Array.from({ length: 11 }, (_, i) => -3.55 + i * 0.16);
  const shrubs = Array.from({ length: 9 }, (_, i) => -3.6 + i * 0.95);
  return (
    <group>
      {/* Stone plinth */}
      <Part mode={mode} position={[0, 0.15, 0]} color="#e6dccb">
        <boxGeometry args={[9.5, 0.3, 6.5]} />
      </Part>
      {/* Ground floor: stone block + glass living room */}
      <Part mode={mode} position={[-2.3, 1.6, -0.2]} color="#efe7da">
        <boxGeometry args={[2, 2.6, 3.6]} />
      </Part>
      <Part mode={mode} position={[0.9, 1.5, -0.2]} glass>
        <boxGeometry args={[4.4, 2.4, 3.2]} />
      </Part>
      {/* First floor slab (cantilever) */}
      <Part mode={mode} position={[0.4, 3.05, 0]} color="#f2ebe0">
        <boxGeometry args={[7.4, 0.25, 4.6]} />
      </Part>
      {/* Upper floor glass volume */}
      <Part mode={mode} position={[0.6, 4.4, -0.1]} glass>
        <boxGeometry args={[6.2, 2.4, 3.8]} />
      </Part>
      {/* Roof slab */}
      <Part mode={mode} position={[0.5, 5.75, 0]} color="#f2ebe0">
        <boxGeometry args={[7.8, 0.3, 5]} />
      </Part>
      {/* Timber fins */}
      {fins.map((x) => (
        <Part key={x} mode={mode} position={[x, 2.6, 2.15]} color="#9c6b3f">
          <boxGeometry args={[0.07, 4.6, 0.18]} />
        </Part>
      ))}
      {/* Planter + shrubs */}
      <Part mode={mode} position={[0, 0.45, 2.75]} color="#ddd2bf">
        <boxGeometry args={[8.5, 0.3, 0.6]} />
      </Part>
      {shrubs.map((x) => (
        <Part key={x} mode={mode} position={[x, 0.8, 2.75]} color="#6f7d40">
          <icosahedronGeometry args={[0.32, 0]} />
        </Part>
      ))}
      {/* Trees */}
      <Tree mode={mode} position={[-5.4, 0, -1.4]} scale={1.3} />
      <Tree mode={mode} position={[5.6, 0, -1]} scale={1.15} />
      <Tree mode={mode} position={[-5, 0, 2.4]} scale={0.9} />
      <Tree mode={mode} position={[5.2, 0, 2.6]} scale={1} />
    </group>
  );
}

export default function Structure3D({
  mode = "render",
  interactive = true,
  controlsRef,
}: {
  mode?: ViewMode;
  interactive?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controlsRef?: RefObject<any>;
}) {
  const isBlueprint = mode === "blueprint";
  return (
    <Canvas
      shadows={!isBlueprint}
      camera={{ position: [13, 7, 14], fov: 32 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[isBlueprint ? PAPER : WARM_BG]} />
      {!isBlueprint && <fog attach="fog" args={[WARM_BG, 22, 45]} />}
      <hemisphereLight args={["#fff4e0", "#d9c7a4", 0.7]} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.6}
        color="#ffe2b8"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <Suspense fallback={null}>
        {media.model3d ? <GlbModel url={media.model3d} mode={mode} /> : <PlaceholderVilla mode={mode} />}
        {!isBlueprint && <Environment preset="sunset" />}
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
          fadeDistance={32}
          fadeStrength={1.5}
        />
      ) : (
        <>
          <Grid
            position={[0, -0.002, 0]}
            infiniteGrid
            cellSize={1}
            cellThickness={0.4}
            cellColor="#e2d6c2"
            sectionSize={5}
            sectionThickness={0.8}
            sectionColor="#d4c3a6"
            fadeDistance={30}
            fadeStrength={2}
          />
          <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={24} blur={2.4} far={8} color="#6e5f4b" />
        </>
      )}

      <OrbitControls
        ref={controlsRef}
        enabled={interactive}
        target={[0, 2.2, 0]}
        enablePan={false}
        minDistance={9}
        maxDistance={26}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate
        autoRotateSpeed={isBlueprint ? 0.35 : 0.5}
      />
    </Canvas>
  );
}