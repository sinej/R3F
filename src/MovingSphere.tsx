import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {useRef} from "react";

const MovingSphere = () => {

  const ballARadius = 0.5;
  const posLimit = 5 - ballARadius;

  const ballA = useRef<THREE.Mesh>(null);

  const ballAX = THREE.MathUtils.randFloat(-posLimit, posLimit);
  const ballAY = THREE.MathUtils.randFloat(-posLimit, posLimit);
  const targetX = THREE.MathUtils.randFloat(-posLimit, posLimit);
  const targetY = THREE.MathUtils.randFloat(-posLimit, posLimit);

  const vecA = new THREE.Vector3(ballAX, ballAY, 0);
  const targetB = new THREE.Vector3(targetX, targetY, 0);

  const vecAToVecB = new THREE.Vector3();
  vecAToVecB.subVectors(targetB, vecA); // const vecAtoB2 = vecB.clone().sub(vecA); 와 같다.
  vecAToVecB.normalize();


  let velocity = 0.1;
  const accelation = 0.0001;
  const velocityLimit = 1;
  const dirVector = vecAToVecB.clone();
  // dirVector.multiplyScalar(velocity);

  const box = new THREE.Box3();
  const center = new THREE.Vector3();
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

      if((posA.x - ballARadius) < leftBox || (posA.x + ballARadius) > rightBox) {
        dirVector.x = -dirVector.x;
      }

      if((posA.y - ballARadius) < bottomBox || (posA.y + ballARadius) > topBox) {
        dirVector.y = -dirVector.y;
      }

      velocity += accelation;

      if (velocity >= velocityLimit) {
        velocity = velocityLimit;
      }

      const addPos = dirVector.clone().multiplyScalar(velocity)
      ballA.current.position.add(addPos);

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
      {/* Target 공 */}
      {/*<mesh ref={ballB} position={vecB}>*/}
      {/*  <sphereGeometry args={[0.5]}/>*/}
      {/*  <meshBasicMaterial color="green"/>*/}
      {/*</mesh>*/}

      <box3Helper args={[box, 'blue']} />
    </>
  );
};

export default MovingSphere;