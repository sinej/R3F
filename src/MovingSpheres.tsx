import * as THREE from "three";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

const MovingSpheres = () => {

  const ballARadius = 0.1;
  const posLimit = 5 - ballARadius;

  const groupRef = useRef<THREE.Group>(null);

  const posVectors:THREE.Vector3[] = [];
  const targetVectors:THREE.Vector3[] = [];
  const ballToTargetVectors:THREE.Vector3[] = [];
  const velocityArr:number[] = [];
  const accelationArr:number[] = [];
  const ballCount = 20;

  let velocity = 0.1;
  const velocityLimit = 1;

  for(let i = 0; i < ballCount; i++) {
    // Ball
    const ballAX = THREE.MathUtils.randFloat(-posLimit, posLimit);
    const ballAY = THREE.MathUtils.randFloat(-posLimit, posLimit);
    const posVector = new THREE.Vector3(ballAX, ballAY, 0);
    posVectors.push(posVector);

    // Target
    const targetX = THREE.MathUtils.randFloat(-posLimit, posLimit);
    const targetY = THREE.MathUtils.randFloat(-posLimit, posLimit);
    const targetVector = new THREE.Vector3(targetX, targetY, 0);
    targetVectors.push(targetVector);

    const ballToTargetVector = new THREE.Vector3();
    ballToTargetVector.subVectors(targetVector, posVector); // const vecAtoB2 = vecB.clone().sub(vecA); 와 같다.
    ballToTargetVector.normalize();

    ballToTargetVectors.push(ballToTargetVector);
    velocityArr.push(velocity);

    const accelation = THREE.MathUtils.randFloat(0.0001, 0.001);
    accelationArr.push(accelation);
  }

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

  function checkEdge(pos: THREE.Vector3, dirVector: THREE.Vector3) {
    if ((pos.x - ballARadius) < leftBox || (pos.x + ballARadius) > rightBox) {
      dirVector.x = -dirVector.x;
    }
    if ((pos.y - ballARadius < bottomBox) || (pos.y + ballARadius) > topBox) {
      dirVector.y = -dirVector.y;
    }
  }

  useFrame(() => {
    const group = groupRef.current;
    if(group && group.children.length) {
      group.children.forEach((mesh:THREE.Object3D, index: number) => {
        const pos = mesh.position;
        const target = ballToTargetVectors[index];

        checkEdge(pos, target);

        velocityArr[index] += accelationArr[index];

        if (velocityArr[index] >= velocityLimit) {
          velocityArr[index] = velocityLimit;
        }
        const addPos = target.clone().multiplyScalar(velocityArr[index])
        pos.add(addPos);
      })
    }
  })

  return (
    <>
      <group ref={groupRef}>
        {/* 여러개 */}
        {
          posVectors.length > 0 ?
            posVectors.map((posVector) =>
              <>
                <mesh position={posVector}>
                  <sphereGeometry args={[ballARadius]} />
                  <meshBasicMaterial color="blue"/>
                </mesh>
              </>
            )
            : <></>
        }
      </group>

      {/* Target 공 */}
      {/*<mesh ref={ballB} position={vecB}>*/}
      {/*  <sphereGeometry args={[0.5]}/>*/}
      {/*  <meshBasicMaterial color="green"/>*/}
      {/*</mesh>*/}

      {/*<box3Helper args={[box, 'blue']} />*/}
    </>
  );
};

export default MovingSpheres;