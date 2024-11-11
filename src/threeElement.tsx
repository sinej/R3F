import * as THREE from "three";

const ThreeElement = () => {

  const origin = new THREE.Vector3(0,0,0);

  const vecA = new THREE.Vector3(-6,-7,0).multiplyScalar(2);
  const disVecA = origin.distanceTo(vecA);

  const vecB = new THREE.Vector3(4,3,0).multiplyScalar(2);
  const disVecB = origin.distanceTo(vecB);

  const vecC = vecB.clone().sub(vecA);
  const disVecC = origin.distanceTo(vecC);


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
        disVecA,
        'blue'
      ]}/>


      <mesh
            position={vecB}
            rotation={[THREE.MathUtils.degToRad(45), THREE.MathUtils.degToRad(45), 0]}
      >
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <arrowHelper args={[
        vecB.clone().normalize(),
        origin,
        disVecB,
        'blue'
      ]}/>
    </>
  );
};

export default ThreeElement;