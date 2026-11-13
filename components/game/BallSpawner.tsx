/**
 * BallSpawner renders a 3D ball that flies across the screen along a
 * curved trajectory with realistic spin. It integrates with useGameLogic
 * for state management and useAudio for sound effects.
 */
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Mesh, Vector3 } from "three"
import type { BallMetadata } from "@/types/ball"
import { audioEngine } from "@/lib/audio"

interface BallSpawnerProps {
  ball: BallMetadata | null
  isActive: boolean
  onMiss: () => void
}

/**
 * Fragment shader for the flying ball with motion blur trail effect.
 */
const flyShader = `
  uniform vec3 primaryColor;
  uniform vec3 secondaryColor;
  uniform float time;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5));
    float diffuse = max(dot(normal, lightDir), 0.0);
    vec3 baseColor = mix(secondaryColor, primaryColor, 0.5 + 0.5 * sin(time + vNormal.x * 10.0));
    baseColor *= diffuse;
    vec3 viewDir = normalize(-vWorldPos);
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.0);
    baseColor += spec * 1.0;
    gl_FragColor = vec4(baseColor, 1.0);
  }
`

const flyVertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export function BallSpawner({
  ball,
  isActive,
  onMiss,
}: BallSpawnerProps) {
  const meshRef = useRef<Mesh>(null)
  const startTime = useRef<number>(0)

  useFrame((state, delta) => {
    if (!meshRef.current || !isActive) {
      return
    }

    if (startTime.current <= 0) {
      startTime.current = state.clock.getElapsedTime()
    }

    const elapsed = (state.clock.getElapsedTime() - startTime.current) / 4.0

    if (elapsed >= 1.0) {
      onMiss()
      return
    }

    const x = -8 + elapsed * 16
    const y = Math.sin(elapsed * Math.PI) * 3
    const z = Math.sin(elapsed * Math.PI * 2) * 1

    meshRef.current.position.set(x, y, z)
    meshRef.current.rotation.x += delta * 2
    meshRef.current.rotation.y += delta * 3
    meshRef.current.rotation.z += delta * 1
  })

  useEffect(() => {
    if (isActive && ball) {
      startTime.current = -1
      audioEngine.playWhoosh()
    }
  }, [isActive, ball])

  if (!ball || !isActive) {
    return null
  }

  return (
    <mesh ref={meshRef} position={[-8, 0, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <shaderMaterial
        uniforms={{
          primaryColor: { value: new Vector3(
            parseInt(ball.primaryColor.slice(1, 3), 16) / 255,
            parseInt(ball.primaryColor.slice(3, 5), 16) / 255,
            parseInt(ball.primaryColor.slice(5, 7), 16) / 255,
          )},
          secondaryColor: { value: new Vector3(
            parseInt(ball.secondaryColor.slice(1, 3), 16) / 255,
            parseInt(ball.secondaryColor.slice(3, 5), 16) / 255,
            parseInt(ball.secondaryColor.slice(5, 7), 16) / 255,
          )},
          time: { value: 0 },
        }}
        vertexShader={flyVertexShader}
        fragmentShader={flyShader}
      />
    </mesh>
  )
}
