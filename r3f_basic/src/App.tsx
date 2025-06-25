import { Suspense, useMemo } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Model from './Model';
import ImgStore from '/store_kyea.webp';

function BackgroundPlane() {
  const texture = useLoader(THREE.TextureLoader, ImgStore);
  const {camera} = useThree()
  const perspectiveCamera = camera as THREE.PerspectiveCamera

  const aspect = useMemo(() => {
    const img = texture.image;
    return img ? img.height / img.width : 1;
  }, [texture]);

  const vFov = (perspectiveCamera.fov * Math.PI) / 180;
  const height = 2 * Math.tan(vFov / 2) * perspectiveCamera.position.z;
  const width = height * perspectiveCamera.aspect;

// y 위치를 height 기준으로 잡기
  const yOffset = -height * 2 - 20;

  return (
    <mesh position={[0, yOffset, 0]}>
      <planeGeometry args={[width, width * aspect]}/>
      <meshBasicMaterial map={texture} opacity={1} />
    </mesh>
  );
}


export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000' }}>
      <Canvas shadows camera={{ position: [0, 0, 20], fov: 45 }}>
        {/* 💡 조명 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[0, 0, 5]} intensity={1.5} />
        <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={2} />

        <Environment preset="apartment" background={false} />


        <Suspense fallback={null}>
          <ScrollControls pages={10} damping={0.2}>
            <Scroll>
              <BackgroundPlane />
            </Scroll>

            <Model />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
