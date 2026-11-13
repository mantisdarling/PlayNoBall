/**
 * Daily Challenge page.
 * One ball per day with a consistent seed. Players get one attempt per day.
 * Connects to useDailySeed useGameLogic useAutocomplete and BallSpawner.
 */
import { useEffect, useState } from "react"
import Link from "next/link"
import { BallStage } from "@/components/game/BallStage"
import { HUDOverlay } from "@/components/ui/HUDOverlay"
import { ComboStreak } from "@/components/ui/ComboStreak"
import { AutocompleteInput } from "@/components/ui/AutocompleteInput"
import { useGameLogic } from "@/hooks/useGameLogic"
import { useDailySeed } from "@/hooks/useDailySeed"
import { useAutocomplete } from "@/hooks/useAutocomplete"
import { BALLS_CATALOG } from "@/data/balls"
import { audioEngine } from "@/lib/audio"
import type { GameState } from "@/types/game"
import type { BallMetadata } from "@/types/ball"

export default function DailyPage() {
  const logic = useGameLogic()
  const { guessBall } = useAutocomplete(BALLS_CATALOG)
  const [state, setState] = useState<GameState>(() => logic.createInitialState("daily"))
  const [currentBall, setCurrentBall] = useState<BallMetadata | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const ballIndex = useDailySeed(BALLS_CATALOG.length)
  const selectedBall = BALLS_CATALOG[ballIndex]

  useEffect(() => {
    if (selectedBall) {
      setCurrentBall(selectedBall)
    }
  }, [selectedBall])

  const handleGuess = (guess: string) => {
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
    setIsPlaying(false)
  }

  const startRound = () => {
    setIsPlaying(true)
    setState((prev) => ({ ...prev, isPlaying: true }))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm text-white/60 hover:text-white">
          BACK
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/vault" className="text-sm text-white/60 hover:text-white">
            VAULT
          </Link>
          <div className="text-sm text-white/60">
            DAILY CHALLENGE {new Date().toISOString().slice(0, 10)}
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <HUDOverlay state={state} />

        <div className="relative w-full max-w-4xl h-[400px]">
          <BallStage
            ball={isPlaying ? currentBall : null}
            isActive={isPlaying}
            onMiss={() => {
              audioEngine.playBuzzer()
              setState((prev) => logic.applyIncorrectGuess(prev))
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
