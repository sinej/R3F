import * as THREE from "three";
import {useFrame, useLoader} from "@react-three/fiber";
import {useRef} from "react";


const BearToElement = () => {

  const bearRef = useRef<THREE.Sprite>(null);

  const bearTexture = useLoader(THREE.TextureLoader, '/bear.png');
  const honeyTexture = useLoader(THREE.TextureLoader, '/honey.png');

  const bearVector = new THREE.Vector3(-6, 7, 0);
  const honeyVector = new THREE.Vector3(4, 3, 0);

  const bearToHoneyVector = honeyVector.clone().sub(bearVector);
  const bearToHoneyUnitVector = bearToHoneyVector.clone().normalize();

  const desireMoveDistance = 0.1;
  const moveVector = bearToHoneyUnitVector.clone().multiplyScalar(desireMoveDistance);


  useFrame(() => {
    const bearObj = bearRef.current;

    if(bearObj) {
      bearObj.position.x += moveVector.x;
      bearObj.position.y += moveVector.y;
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