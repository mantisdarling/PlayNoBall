/**
 * TrophyCard displays a single unlocked ball in the Trophy Vault.
 * It shows the ball name, tournament, year, and a rotatable 3D preview.
 */
import { Canvas } from "@react-three/fiber"
import { BallCanvas } from "@/components/ui/BallCanvas"
import type { BallMetadata } from "@/types/ball"

interface TrophyCardProps {
  ball: BallMetadata
}

export function TrophyCard({ ball }: TrophyCardProps) {

  return (
    <div className="bg-surface border border-white/10 rounded-xl p-4 hover:border-accent/50 transition-colors cursor-pointer group">
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold text-white text-lg">
          {ball.name}
        </div>
        <div className="text-xs font-mono text-white/40">
          {ball.year}
        </div>
      </div>
      <div className="text-sm text-white/60 mb-4">
        {ball.tournament}
      </div>
      <div className="w-32 h-32 bg-dark rounded-lg flex items-center justify-center overflow-hidden relative border border-white/5">
        <Canvas className="w-full h-full">
          <BallCanvas ball={ball} isSpinning={false} />
        </Canvas>
      </div>
      <div className="mt-3 text-xs text-green-400 font-mono uppercase tracking-widest">
        unlocked xp {ball.unlockXP}
      </div>
    </div>
  )
}
