import * as THREE from "three";

const ThreeElement = () => {
  return (
    <>
      <directionalLight/>
      <directionalLight position={[5,5,5]} />
      <mesh rotation={[THREE.MathUtils.degToRad(45),THREE.MathUtils.degToRad(30),0]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
};

export default ThreeElement;