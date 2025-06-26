import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

function ThreeElement() {
  const { size, gl, screen, camera} = useThree();
  const boxRef = useRef<THREE.Mesh>(null);
  console.log("gl", gl)

  useFrame((state, delta, xrFrame) => {
    console.log("boxRef.current", boxRef.current);
    boxRef.current.rotation.x += delta;
    boxRef.current.position.y -= 0.01;
    boxRef.current.scale.z += 0.01;
  })

  return (
    <>
      <directionalLight position={[5, 5, 5]}/>
      <mesh rotation={[
        THREE.MathUtils.degToRad(45),
        THREE.MathUtils.degToRad(45),
        0
      ]}
            ref={boxRef}
      >
        <boxGeometry/>
        <meshStandardMaterial color={'blue'}/>
      </mesh>
    </>
  );
}

export default ThreeElement;