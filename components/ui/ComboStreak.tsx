/**
 * ComboStreak displays the current streak counter and combo multiplier
 * with animated feedback when values change.
 */
import type { GameState } from "@/types/game"

interface ComboStreakProps {
  state: GameState
}

export function ComboStreak({ state }: ComboStreakProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-surface border border-white/10">
      <div className="text-4xl font-bold text-white tracking-tighter">
        {state.streak}
      </div>
      <div className="text-xs font-mono text-green-400 uppercase tracking-widest">
        streak
      </div>
      <div className="text-2xl font-bold text-accent">
        combo x{state.comboMultiplier.toFixed(1)}
      </div>
      <div className="text-xs font-mono text-accent/70 uppercase tracking-widest">
        multiplier
      </div>
    </div>
  )
}
