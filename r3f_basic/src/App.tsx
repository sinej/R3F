import { Canvas } from '@react-three/fiber';
import ThreeElement from "./ThreeElement.tsx";

export default function App() {
  return (
    <Canvas camera={{
              near: 1,
              far: 20,
              fov: 75,
              position: [5, 5, 0]
            }}
    >
      <ThreeElement />
    </Canvas>
  );
}
