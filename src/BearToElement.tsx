import * as THREE from "three";
import {useLoader} from "@react-three/fiber";


const BearToElement = () => {

  const bearTexture = useLoader(THREE.TextureLoader, '/bear.png');
  const honeyTexture = useLoader(THREE.TextureLoader, '/honey.png');
  
  return (
    <>
      <sprite position={[0,0,0]}>
        <spriteMaterial
          rotation={90}
          map={bearTexture}
        />
      </sprite>
      <sprite position={[0,0,0]}>
        <spriteMaterial
          rotation={90}
          map={honeyTexture}
        />
      </sprite>
    </>
  );
};

export default BearToElement;