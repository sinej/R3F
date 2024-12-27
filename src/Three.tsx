import './App.css';
import {Canvas} from "@react-three/fiber";
import * as THREE from "three";
import ThreeElement from "./threeElement2.tsx";
const ThreeJs = () => {
  return (
    <Canvas orthographic
            camera={{
              zoom: 7,
              position: [0, 0, 100]
            }}
    >

      <ThreeElement />

      <axesHelper args={[7]} /> {/* 방향키 */}
      <gridHelper args={[100, 100]}
                  rotation={[THREE.MathUtils.degToRad(90), 0 ,0]}
      />
    </Canvas>
  );
};

export default ThreeJs;