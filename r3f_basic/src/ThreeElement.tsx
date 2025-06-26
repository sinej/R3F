import {useThree} from '@react-three/fiber';
import * as THREE from 'three';

function ThreeElement() {
  const { size } = useThree();
  console.log("size", size);

  return (
    <>
      <directionalLight position={[5, 5, 5]}/>
      <mesh rotation={[THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0), 0]}>
        <boxGeometry/>
        <meshStandardMaterial color={'blue'}/>
      </mesh>
    </>
  );
}

export default ThreeElement;