import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

const assetBase = import.meta.env.BASE_URL;
const modelUrl = (name) => `${assetBase}models/${name}`;

const MODEL_CONFIG = {
  hero: {
    path: modelUrl("shoe.glb"),
    fitHeight: 3.2,
    rotation: [0.16, -1.1, 0.04],
    offset: [0, -0.1, 0],
    scaleGain: 0.42,
  },
  chaussures: {
    path: modelUrl("shoe.glb"),
    fitHeight: 2.05,
    rotation: [0.12, -0.92, 0.04],
    offset: [0, -0.08, 0],
  },
  vêtements: {
    path: modelUrl("clothing.glb"),
    fitHeight: 2.05,
    rotation: [0.06, -0.56, 0],
    offset: [0, -0.02, 0],
  },
  électronique: {
    path: modelUrl("electronics.glb"),
    fitHeight: 2.2,
    rotation: [0.12, -0.72, 0],
    offset: [0, -0.02, 0],
  },
  accessoires: {
    path: modelUrl("accessory.glb"),
    fitHeight: 1.9,
    rotation: [0.14, -0.72, 0],
    offset: [0, 0, 0],
  },
};

function FittedModel({ scene, fitHeight, offset = [0, 0, 0] }) {
  const group = useRef(null);

  useLayoutEffect(() => {
    if (!group.current) {
      return;
    }

    const box = new THREE.Box3().setFromObject(group.current);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const largestDimension = Math.max(size.x, size.y, size.z) || 1;
    const scale = fitHeight / largestDimension;

    group.current.position.set(
      offset[0] - center.x * scale,
      offset[1] - center.y * scale,
      offset[2] - center.z * scale,
    );
    group.current.scale.setScalar(scale);
  }, [scene, fitHeight, offset]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

function GoldParticles({ count = 2000, progress = 0 }) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 6 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = radius * Math.cos(phi);
      values[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return values;
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) {
      return;
    }
    const array = pointsRef.current.geometry.attributes.position.array;
    const time = clock.getElapsedTime();
    for (let i = 0; i < count; i += 1) {
      array[i * 3 + 1] += Math.sin(time * 0.3 + i) * 0.0009;
      array[i * 3] += Math.cos(time * 0.2 + i * 0.5) * 0.0005;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.material.opacity = 0.18 + progress * 0.28;
    pointsRef.current.rotation.y = time * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#C9982A" size={0.045} transparent opacity={0.22} depthWrite={false} />
    </points>
  );
}

function ModelAsset({ variant = "chaussures", progress = 0 }) {
  const config = MODEL_CONFIG[variant] ?? MODEL_CONFIG.chaussures;
  const { scene } = useGLTF(config.path);
  const group = useRef(null);
  const clonedScene = useMemo(() => clone(scene), [scene]);

  useFrame(({ clock }) => {
    if (!group.current) {
      return;
    }

    const time = clock.getElapsedTime();
    group.current.rotation.y = config.rotation[1] + time * 0.18;
    group.current.rotation.x = config.rotation[0] + Math.sin(time * 0.45) * 0.04;
    group.current.rotation.z = config.rotation[2] + Math.cos(time * 0.35) * 0.02;

    const scaleBoost = variant === "hero" ? 1 + progress * (config.scaleGain ?? 0.42) : 1;
    group.current.scale.setScalar(scaleBoost);
    group.current.position.set(0, 0, variant === "hero" ? -progress * 2.7 : 0);
  });

  return (
    <Float speed={variant === "hero" ? 1 : 1.25} rotationIntensity={0.1} floatIntensity={0.28}>
      <group ref={group}>
        <FittedModel scene={clonedScene} fitHeight={config.fitHeight} offset={config.offset} />
      </group>
    </Float>
  );
}

function AmbientCore() {
  return (
    <>
      <color attach="background" args={["#080807"]} />
      <fog attach="fog" args={["#080807", 8, 20]} />
      <ambientLight intensity={0.9} />
      <hemisphereLight intensity={0.7} groundColor="#120E0A" color="#F0EAD6" />
      <directionalLight position={[4, 5, 4]} intensity={2.35} color="#f8e0a8" />
      <pointLight position={[-4, -2, 3]} intensity={1.1} color="#c9982a" />
      <pointLight position={[2, 1, 4]} intensity={0.8} color="#ffffff" />
    </>
  );
}

export function HeroCanvas({ progress }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.1, 5.2], fov: 34 }}>
      <Suspense fallback={null}>
        <AmbientCore />
        <ModelAsset variant="hero" progress={progress} />
        <GoldParticles progress={progress} />
        <EffectComposer>
          <Bloom intensity={0.45} luminanceThreshold={0.82} mipmapBlur />
          <ChromaticAberration
            offset={new THREE.Vector2(0.0004 + progress * 0.0012, 0.0002)}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

export function CategoryIconCanvas({ type }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.8], fov: 34 }}>
      <Suspense fallback={null}>
        <AmbientCore />
        <ModelAsset variant={type} />
      </Suspense>
    </Canvas>
  );
}

export function ProductViewerCanvas({ category }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.9], fov: 34 }}>
      <Suspense fallback={null}>
        <AmbientCore />
        <ModelAsset variant={category} />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(modelUrl("shoe.glb"));
useGLTF.preload(modelUrl("clothing.glb"));
useGLTF.preload(modelUrl("electronics.glb"));
useGLTF.preload(modelUrl("accessory.glb"));

