import './App.css'
import { Canvas } from "@react-three/fiber";
import ThreeElement from "./threeElement";
import { CameraControls } from "@react-three/drei";

function App() {

  return (
    <>
      <Canvas>
        <ThreeElement />
        <CameraControls />
        <axesHelper />
      </Canvas>
    </>
  )
}

export default App
