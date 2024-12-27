import * as THREE from "three";

const ThreeElement = () => {

  const origin = new THREE.Vector3(0,0,0);

  const vecA = new THREE.Vector3(-6,7,0);
  const disVecA = origin.distanceTo(vecA);

  const vecB = new THREE.Vector3(4,3,0);
  const disVecB = origin.distanceTo(vecB);

  const vecC = vecA.clone().add(vecB);
  const disVecC = origin.distanceTo(vecC);

  const normalizedVecA = vecA.clone().normalize();
  const disNormalizedVecA = origin.distanceTo(normalizedVecA);

  return (
    <>
      <directionalLight position={[5, 5, 5]}/>
      {/* VecA */}
      <mesh
        position={vecA}
        rotation={[THREE.MathUtils.degToRad(45), THREE.MathUtils.degToRad(45), 0]}
      >
        <sphereGeometry args={[0.5]}/>
        <meshStandardMaterial color="black"/>
      </mesh>
      <arrowHelper args={[
        vecA.clone().normalize(),
        origin,
        disVecA,
        'black'
      ]}/>

      {/* Vec B */}
      <mesh
        position={vecB}
        rotation={[THREE.MathUtils.degToRad(45), THREE.MathUtils.degToRad(45), 0]}
      >
        <sphereGeometry args={[0.5]}/>
        <meshStandardMaterial color="red"/>
      </mesh>
      <arrowHelper args={[
        vecB.clone().normalize(),
        origin,
        disVecB,
        'red'
      ]}/>

      {/* Vec C */}
      <mesh
        position={vecC}
        rotation={[THREE.MathUtils.degToRad(45), THREE.MathUtils.degToRad(45), 0]}
      >
        <sphereGeometry args={[0.5]}/>
        <meshStandardMaterial color="black" opacity={0.5} transparent />
      </mesh>
      <arrowHelper args={[
        vecC.clone().normalize(),
        origin,
        disVecC,
        'black'
      ]}/>

      {/* normalizedVecA */}
      <mesh
        position={normalizedVecA}
        rotation={[THREE.MathUtils.degToRad(45), THREE.MathUtils.degToRad(45), 0]}
      >
        <sphereGeometry args={[0.5]}/>
        <meshStandardMaterial color="black"/>
      </mesh>
      <arrowHelper args={[
        normalizedVecA.clone().normalize(),
        origin,
        disNormalizedVecA,
        'red'
      ]}/>
    </>
  );
};

export default ThreeElement;