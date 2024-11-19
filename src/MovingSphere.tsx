import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {useRef} from "react";

const MovingSphere = () => {

  const ballARadius = 0.5;

  const ballA = useRef<THREE.Mesh>(null);
  const ballB = useRef<THREE.Mesh>(null);

  const ballAX = THREE.MathUtils.randFloat(-4.5, 4.5);
  const ballAY = THREE.MathUtils.randFloat(-4.5, 4.5);
  const ballBX = THREE.MathUtils.randFloat(-4.5, 4.5);
  const ballBY = THREE.MathUtils.randFloat(-4.5, 4.5);

  const vecA = new THREE.Vector3(ballAX,ballAY,0);
  const vecB = new THREE.Vector3(ballBX,ballBY,0);

  const vecAToVecB = new THREE.Vector3();
  vecAToVecB.subVectors(vecB, vecA); // const vecAtoB2 = vecB.clone().sub(vecA); 와 같다.
  vecAToVecB.normalize();


  const velocity = 0.1
  const dirVector = vecAToVecB.clone();
  dirVector.multiplyScalar(velocity);

  const box = new THREE.Box3();
  const center = new THREE.Vector3(0, 0, 0);
  const size = new THREE.Vector3(10, 10, 0);
  box.setFromCenterAndSize(
    center,
    size,
  );

  const leftBox = center.x - size.x * 0.5;
  const rightBox = center.x + size.x * 0.5;
  const topBox = center.y + size.y * 0.5;
  const bottomBox = center.y - size.y * 0.5;


  useFrame(() => {

    if(ballA.current) {
      const posA = ballA.current.position;
      const disBallAAndB = posA.distanceTo(vecB);


      if(posA.x < leftBox || posA.x > rightBox) {
        dirVector.x = -dirVector.x;
      }

      if(posA.y < bottomBox || posA.y > topBox) {
        dirVector.y = -dirVector.y;
      }
      ballA.current.position.add(dirVector);

      // top, right, bottom, left 별 멈추는 기능
      // if(posA.x > leftBox && posA.x < rightBox && posA.y < topBox && posA.y > bottomBox) {
      //   ballA.current.position.add(dirVector);
      // }

      // if(disBallAAndB > 0.1) {
      //  ballA.current.position.add(dirVector);
      //  ballA.current.position.add와 같은 작동을 한다.
      //  ballA.current.position.x += dirVector.x;
      //  ballA.current.position.y += dirVector.y;
      //  ballA.current.position.z += dirVector.z;
      // }
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

      <box3Helper args={[box, 'red']} />
    </>
  );
};

export default MovingSphere;