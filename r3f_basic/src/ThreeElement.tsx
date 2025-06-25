import * as THREE from "three";
import Model from "./Model.tsx";
import {Scroll, ScrollControls} from "@react-three/drei";

function ThreeElement() {
  return (
    <>
      <directionalLight position={[5, 5, 5]}/>
        <ScrollControls pages={3} damping={0.25}>

        <Scroll>
          <Model />
        </Scroll>
        </ScrollControls>
        <boxGeometry/>
        <meshStandardMaterial color={'blue'}/>
      </mesh>
    </>
  );
}

export default ThreeElement;