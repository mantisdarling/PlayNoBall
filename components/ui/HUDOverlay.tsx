/**
 * HUDOverlay displays the heads-up display with score streak combo and lives.
 * It connects to useGameLogic state and shows broadcast-style game info.
 */
import type { GameState } from "@/types/game"

interface HUDOverlayProps {
  state: GameState
}

export function HUDOverlay({ state }: HUDOverlayProps) {
  return (
    <div className="fixed top-4 left-4 right-4 flex justify-between items-start p-4 text-white font-mono">
      <div className="text-2xl font-bold tracking-wider">
        SCORE {state.score}
      </div>
      <div className="text-center">
        <div className="text-lg">STREAK {state.streak}</div>
        <div className="text-sm text-green-400">COMBO x{state.comboMultiplier.toFixed(1)}</div>
      </div>
      <div className="text-2xl font-bold tracking-wider text-red-400">
        LIVES {state.lives}
      </div>
    </div>
  )
}
