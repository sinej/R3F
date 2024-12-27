import * as THREE from 'three';

const ThreeElement = () => {
  const vecA = new THREE.Vector3(-6, 7, 0);
  return (
    <>
      <directionalLight position={[5,5,5]} />
      <mesh position={vecA} rotation={[THREE.MathUtils.degToRad(45), THREE.MathUtils.degToRad(45), 0]}>
        <sphereGeometry args={[2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  );
};

export default ThreeElement;