import './App.css'
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import * as THREE from "three";
import MovingSphere from "./MovingSphere.tsx";
// import BearToElement from "./BearToElement.tsx";
function App() {

  return (
    <>
      <Canvas orthographic
              camera={{
                zoom: 70,
                position: [0,0,100]
              }}
      >
        {/*<ThreeElement />*/}
        {/*<BearToElement/>*/}
        <MovingSphere />
        <CameraControls />
        <axesHelper args={[7]} />
        <gridHelper args={[100,100]}
                    rotation={[THREE.MathUtils.degToRad(90), 0, 0]}
        />
      </Canvas>
    </>
  )
}

export default App
