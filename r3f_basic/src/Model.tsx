import { useGLTF, useScroll } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

export default function Model({ position = [0, 1, 2] }) {
  const ref = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/Astronaut.glb');
  const scroll = useScroll();

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh

      if (
        !mesh.name.toLowerCase().includes('text') &&
        !mesh.name.toLowerCase().includes('logo')
      ) {
        mesh.material = new THREE.MeshPhysicalMaterial({
          transmission: 1.0,
          transparent: true,
          opacity: 1.0,
          roughness: 0.1,
          metalness: 0.0,
          thickness: 1.5,
          ior: 1.5,
          color: new THREE.Color(1, 0, 0),
          envMapIntensity: 1.0,
        })
      } else {
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('white'),
          roughness: 0.5,
          metalness: 0.0,
        })
      }
    }
  })

  const rotationRef = useRef(0);

  useFrame((_, delta: number) => {
    if (!ref.current) return;

    const totalScrollableHeight = (scroll.pages - 1) * window.innerHeight;
    const scrollY = scroll.offset * totalScrollableHeight;

    let scale = 1;
    if (scrollY > 1000) {
      const t = (scrollY - 1000) / (totalScrollableHeight - 1000);
      scale = 1 - t * 0.7;
    }
    scale = Math.max(scale, 0.3);
    ref.current.scale.setScalar(scale);

    if (scroll.offset >= 1) {
      rotationRef.current += delta * 1; // 속도 조절 가능
    } else {
      rotationRef.current = scroll.offset * Math.PI * 2;
    }

    ref.current.rotation.y = rotationRef.current;
  });

  return (
    <primitive
      object={scene}
      ref={ref}
      position={position}
    />
  );
}
