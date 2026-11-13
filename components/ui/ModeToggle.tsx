/**
 * ModeToggle switches between Daily Challenge and Endless Arcade modes.
 * It displays both modes with the active one highlighted.
 */
import type { GameMode } from "@/types/game"

interface ModeToggleProps {
  mode: GameMode
  onModeChange: (mode: GameMode) => void
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  const modes: GameMode[] = ["daily", "endless"]

  return (
    <div className="flex gap-1 rounded-xl bg-surface border border-white/10 p-1">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => onModeChange(m)}
          className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${
            mode === m
              ? "bg-accent text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              : "text-white/40 hover:text-white"
          }`}
        >
          {m === "daily" ? "DAILY CHALLENGE" : "ENDLESS ARCADE"}
        </button>
      ))}
    </div>
  )
}
