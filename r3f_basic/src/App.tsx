import { Canvas } from '@react-three/fiber';
import ThreeElement from "./ThreeElement.tsx";

export default function App() {
  return (
    <Canvas shadows camera={{position: [0, 0, 20], fov: 45}}>
      <ThreeElement />
    </Canvas>
  );
}
