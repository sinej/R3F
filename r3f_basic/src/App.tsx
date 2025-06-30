import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ThreeElement from "./ThreeElement.tsx";
import { useControls } from "leva";

export default function App() {
  const color = useControls({
    value: 'green'
  })

  return (
    <Canvas camera={{
              near: 1,
              far: 20,
              fov: 75,
              position: [5, 5, 0]
            }}
    >
      <color attach='background' args={[color.value]} />
      <OrbitControls minAzimuthAngle={-Math.PI / 4} maxAzimuthAngle={Math.PI / 4} />
      <axesHelper args={[5]} />
      <gridHelper args={[10, 10, 0]} />
      <ThreeElement />
    </Canvas>
  );
}
