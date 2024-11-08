import './App.css'
import { Canvas } from "@react-three/fiber";
import ThreeElement from "./threeElement";
import { CameraControls } from "@react-three/drei";
import * as THREE from "three";
function App() {

  return (
    <>
      <Canvas orthographic
              camera={{
                zoom: 70,
                position: [0,0,100]
              }}
      >
        <ThreeElement />
        <CameraControls />
        {/*<axesHelper args={[7]} />*/}
        <gridHelper args={[100,100]}
                    rotation={[THREE.MathUtils.degToRad(90), 0, 0]}
        />
      </Canvas>
    </>
  )
}

export default App
