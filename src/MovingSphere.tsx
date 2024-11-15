import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {useRef} from "react";

const MovingSphere = () => {

  const ballA = useRef<THREE.Mesh>(null);
  const ballB = useRef<THREE.Mesh>(null);

  const ballAX = THREE.MathUtils.randFloat(-5, 5);
  const ballAY = THREE.MathUtils.randFloat(-5, 5);

  const vecA = new THREE.Vector3(10,2,0);
  const vecB = new THREE.Vector3(-5,6,0);

  const vecAToVecB = new THREE.Vector3();
  vecAToVecB.subVectors(vecB, vecA); // const vecAtoB2 = vecB.clone().sub(vecA); 와 같다.
  vecAToVecB.normalize();

  const velocity = 0.1
  const dirVector = vecAToVecB.clone();
  dirVector.multiplyScalar(velocity);
  useFrame(() => {

    if(ballA.current) {
      const posA = ballA.current.position;
      const disBallAAndB = posA.distanceTo(vecB);

      if(disBallAAndB > 0.1) {
        ballA.current.position.add(dirVector);
        // ballA.current.position.add와 같은 작동을 한다.
        // ballA.current.position.x += dirVector.x;
        // ballA.current.position.y += dirVector.y;
        // ballA.current.position.z += dirVector.z;
      }
    }
  })



  return (
    <>
      <mesh ref={ballA} position={vecA}>
        <sphereGeometry args={[0.5]}/>
        <meshBasicMaterial color="blue"/>
      </mesh>

      <mesh ref={ballB} position={vecB}>
        <sphereGeometry args={[0.5]}/>
        <meshBasicMaterial color="green"/>
      </mesh>

      <mesh position={vecAToVecB}>
        <sphereGeometry args={[0.5]}/>
        <meshBasicMaterial color="red"/>
      </mesh>
    </>
  );
};

export default MovingSphere;