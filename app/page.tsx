"use client"

import MeshyHumanoid from "@/components/Robo";
import Robot from "@/components/Robo";
import CSSRobot from "@/components/Rorocss";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <div>
      <Canvas>
  <ambientLight intensity={0.4} />
  <directionalLight position={[3, 5, 3]} intensity={1.2} castShadow />
  {/* <Environment preset="city" /> */}
  <MeshyHumanoid pose="wave" speaking={true} scale={1} />
</Canvas>
<CSSRobot />
    </div>
  );
}
