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
              }}
      >
        <ThreeElement />
        <CameraControls />
        <axesHelper args={[7]} />
        <gridHelper args={[100,100, 'red']}
                    rotation={[THREE.MathUtils.degToRad(90), 0, 0]}
        />
      </Canvas>
    </>
  )
}

export default App
