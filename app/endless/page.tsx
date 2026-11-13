/**
 * Endless Arcade page.
 * Endless mode with combo multiplier and streak counter.
 * Connects to useGameLogic useAutocomplete and BallSpawner.
 */
import { useEffect, useState } from "react"
import Link from "next/link"
import { BallSpawner } from "@/components/game/BallSpawner"
import { HUDOverlay } from "@/components/ui/HUDOverlay"
import { ComboStreak } from "@/components/ui/ComboStreak"
import { AutocompleteInput } from "@/components/ui/AutocompleteInput"
import { useGameLogic } from "@/hooks/useGameLogic"
import { useAutocomplete } from "@/hooks/useAutocomplete"
import { BALLS_CATALOG } from "@/data/balls"
import { audioEngine } from "@/lib/audio"
import type { GameState } from "@/types/game"
import type { BallMetadata } from "@/types/ball"

export default function EndlessPage() {
  const logic = useGameLogic()
  const { guessBall } = useAutocomplete(BALLS_CATALOG)
  const [state, setState] = useState<GameState>(() => logic.createInitialState("endless"))
  const [currentBall, setCurrentBall] = useState<BallMetadata | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const pickRandomBall = () => {
    const index = Math.floor(Math.random() * BALLS_CATALOG.length)
    return BALLS_CATALOG[index]
  }

  useEffect(() => {
    if (isPlaying && !currentBall) {
      setCurrentBall(pickRandomBall())
    }
  }, [isPlaying, currentBall])

  const handleGuess = (guess: string) => {
    if (!currentBall) return
    const matched = guessBall(guess)
    if (!matched) {
      audioEngine.playBuzzer()
      setState((prev) => logic.applyIncorrectGuess(prev))
      return
    }

    audioEngine.playChime()
    setState((prev) => {
      const result = logic.evaluateGuess(prev, guess, matched)
      return logic.applyCorrectGuess(prev, result.scoreState)
    })
    setCurrentBall(null)
    setIsPlaying(false)
  }

  const startRound = () => {
    setIsPlaying(true)
    setState((prev) => ({ ...prev, isPlaying: true }))
    setCurrentBall(pickRandomBall())
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm text-white/60 hover:text-white">
          BACK
        </Link>
        <div className="text-sm text-white/60">
          ENDLESS ARCADE
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <HUDOverlay state={state} />

        <div className="relative w-full max-w-4xl h-[400px]">
          <BallSpawner
            ball={isPlaying ? currentBall : null}
            isActive={isPlaying}
            onMiss={() => {
              audioEngine.playBuzzer()
              setState((prev) => logic.applyIncorrectGuess(prev))
              setCurrentBall(null)
              setIsPlaying(false)
            }}
          />
        </div>

        <ComboStreak state={state} />

        <AutocompleteInput
          catalog={BALLS_CATALOG}
          onGuess={(ball) => {
            handleGuess(ball.name)
          }}
        />

        {!isPlaying && (
          <button
            onClick={startRound}
            className="px-8 py-4 rounded-full bg-accent text-white font-bold hover:bg-accent/80 transition-colors mt-8"
          >
            START ROUND
          </button>
        )}
      </main>
    </div>
  )
}
