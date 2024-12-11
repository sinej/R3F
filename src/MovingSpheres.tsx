import * as THREE from "three";
import {useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";

function makeRandomColor() {
  const r = THREE.MathUtils.randInt(0, 255);
  const g = THREE.MathUtils.randInt(0, 255);
  const b = THREE.MathUtils.randInt(0, 255);

  return `rgb(${r}, ${g}, ${b})`;

}

const MovingSpheres = () => {

  const { viewport } = useThree();
  const ballARadius = 0.4;
  const posLimitX = viewport.width * 0.5 - ballARadius;
  const posLimitY = viewport.height * 0.5 - ballARadius;

  const groupRef = useRef<THREE.Group>(null);

  const posVectors:THREE.Vector3[] = [];
  const targetVectors:THREE.Vector3[] = [];
  const ballToTargetVectors:THREE.Vector3[] = [];
  const velocityArr:number[] = [];
  const accelationArr:number[] = [];
  const ballCount = 50;

  let velocity = 0.1;
  const velocityLimit = 1;

  for(let i = 0; i < ballCount; i++) {
    // Ball
    const ballAX = THREE.MathUtils.randFloat(-posLimitX, posLimitX);
    const ballAY = THREE.MathUtils.randFloat(-posLimitY, posLimitY);
    const posVector = new THREE.Vector3(ballAX, ballAY, 0);
    posVectors.push(posVector);

    // Target
    const targetX = THREE.MathUtils.randFloat(-posLimitX, posLimitX);
    const targetY = THREE.MathUtils.randFloat(-posLimitY, posLimitY);
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
  const size = new THREE.Vector3(
    viewport.width,
    viewport.height,
    0
  );
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

  function update(pos: THREE.Vector3, target:THREE.Vector3, idx: number) {
    velocityArr[idx] += accelationArr[idx];
    if(velocityArr[idx] >= velocityLimit) {
      velocityArr[idx] = velocityLimit;
    }

    const addPos = target.clone().multiplyScalar(velocityArr[idx]);
    pos.add(addPos);
  }

  useFrame(() => {
    const group = groupRef.current;
    if(group && group.children.length) {
      group.children.forEach((mesh:THREE.Object3D, index: number) => {
        const pos = mesh.position;
        const target = ballToTargetVectors[index];

        checkEdge(pos, target);
        update(pos, target, index);
      });
    }
  })

  return (
    <>
      <group ref={groupRef}>
        {/* 여러개 */}
        {
          posVectors.length > 0 ?
            posVectors.map((posVector: THREE.Vector3, index: number) =>
              <>
                <mesh position={posVector}
                      key={`mesh-${index}`}
                >
                  <sphereGeometry args={[ballARadius]} />
                  <meshBasicMaterial color={makeRandomColor()} />
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