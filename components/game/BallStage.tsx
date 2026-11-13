/**
 * BallStage wraps BallSpawner in a React Three Fiber Canvas.
 * It provides the WebGL rendering context required for 3D content.
 * The canvas resizes responsively to fit its container.
 */
import { Canvas } from "@react-three/fiber"
import { BallSpawner } from "./BallSpawner"
import type { BallMetadata } from "@/types/ball"

interface BallStageProps {
  ball: BallMetadata | null
  isActive: boolean
  onMiss: () => void
}

export function BallStage({ ball, isActive, onMiss }: BallStageProps) {
  return (
    <Canvas className="w-full h-full" shadows>
      <BallSpawner ball={ball} isActive={isActive} onMiss={onMiss} />
    </Canvas>
  )
}
