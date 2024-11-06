import './App.css'
import { Canvas } from "@react-three/fiber";
import ThreeElement from "./threeElement";
import { CameraControls } from "@react-three/drei";
import * as THREE from "three";
function App() {

  return (
    <>
      <Canvas>
        <ThreeElement />
        <CameraControls />
        <axesHelper args={[7]} />
        <gridHelper args={[10, 10, 'red', 'blue']}
                    rotation={[THREE.MathUtils.degToRad(90), 0, 0]}
        />
      </Canvas>
    </>
  )
}

export default App
