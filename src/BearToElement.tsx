import * as THREE from "three";
import {useFrame, useLoader} from "@react-three/fiber";
import {useRef} from "react";


const BearToElement = () => {

  const bearRef = useRef<THREE.Sprite>(null);

  const bearTexture = useLoader(THREE.TextureLoader, '/bear.png');
  const honeyTexture = useLoader(THREE.TextureLoader, '/honey.png');

  const bearX = THREE.MathUtils.randFloat(-5, 5);
  const bearY = THREE.MathUtils.randFloat(-5, 5);
  const honeyX = THREE.MathUtils.randFloat(-5, 5);
  const honeyY = THREE.MathUtils.randFloat(-5, 5);
  const bearVector = new THREE.Vector3(bearX, bearY, 0);
  const honeyVector = new THREE.Vector3(honeyX, honeyY, 0);

  const bearToHoneyVector = honeyVector.clone().sub(bearVector);
  const disBearToHoneyVector = bearToHoneyVector.distanceTo(new THREE.Vector3(0,0,0));
  const bearToHoneyUnitVector = bearToHoneyVector.clone().normalize();

  // const desireMoveDistance = 0.5;
  // const moveVector = bearToHoneyUnitVector.clone().multiplyScalar(desireMoveDistance);

  const randomSec = THREE.MathUtils.randFloat(1, 5);
  const desireMoveSec = randomSec;
  const desireMoveFrame = desireMoveSec * 60;
  const moveVector2 = bearToHoneyUnitVector.clone().multiplyScalar(disBearToHoneyVector).divideScalar(desireMoveFrame);

  useFrame(() => {
    const bearObj = bearRef.current;

    if(bearObj) {
      const bearPos = bearObj.position;
      const honeyPos = honeyVector;
      const disBearAndHoney = bearPos.distanceTo(honeyPos);

      console.log("disBearAndHoney", disBearAndHoney);
      bearObj.scale.set(1, 1, 1);

      if(disBearAndHoney > 0.1) {
        bearObj.position.x += moveVector2.x;
        bearObj.position.y += moveVector2.y;
      } else {
        bearObj.scale.set(1.5, 1.5, 1.5);
      }
    }
  });


  return (
    <>
      <sprite ref={bearRef} position={bearVector}>
        <spriteMaterial map={bearTexture} />
      </sprite>
      <sprite position={honeyVector}>
        <spriteMaterial map={honeyTexture} />
      </sprite>
    </>
  );
};

export default BearToElement;