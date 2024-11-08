import * as THREE from "three";

const ThreeElement = () => {

  const vecA = new THREE.Vector3(5,7,0);
  const origin = new THREE.Vector3(0,0,0);
  const dis = origin.distanceTo(vecA);

  return (
    <>
      <directionalLight position={[5,5,5]} />
      <mesh
            position={vecA}
            rotation={[THREE.MathUtils.degToRad(45), THREE.MathUtils.degToRad(45), 0]}
      >
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <arrowHelper args={[
        vecA.clone().normalize(),
        origin,
        dis,
        'blue'
      ]}/>
    </>
  );
};

export default ThreeElement;