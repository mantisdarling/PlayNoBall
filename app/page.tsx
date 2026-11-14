/**
 * Landing page for No Ball.
 * Renders the full interactive 3D flying ball game directly on the main screen
 * with HUD, combo streak, and guess input. Zero hyphens in any visible text.
 */
"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { ModeToggle } from "@/components/ui/ModeToggle"
import { HUDOverlay } from "@/components/ui/HUDOverlay"
import { ComboStreak } from "@/components/ui/ComboStreak"
import { AutocompleteInput } from "@/components/ui/AutocompleteInput"
import { useGameLogic } from "@/hooks/useGameLogic"
import { useDailySeed } from "@/hooks/useDailySeed"
import { useAutocomplete } from "@/hooks/useAutocomplete"
import { BALLS_CATALOG } from "@/data/balls"
import { audioEngine } from "@/lib/audio"
import type { GameMode } from "@/types/game"
import type { GameState } from "@/types/game"
import type { BallMetadata } from "@/types/ball"

const BallStage = dynamic(
  () => import("@/components/game/BallStage").then((mod) => mod.BallStage),
  { ssr: false },
)

export default function HomePage() {
  const [mode, setMode] = useState<GameMode>("daily")
  const logic = useGameLogic()
  const { guessBall } = useAutocomplete(BALLS_CATALOG)
  const [state, setState] = useState<GameState>(() => logic.createInitialState("daily"))
  const [currentBall, setCurrentBall] = useState<BallMetadata | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const ballIndex = useDailySeed(BALLS_CATALOG.length)
  const dailyBall = BALLS_CATALOG[ballIndex]

  useEffect(() => {
    if (mode === "daily" && dailyBall) {
      setCurrentBall(dailyBall)
    } else if (mode === "endless") {
      setCurrentBall(BALLS_CATALOG[Math.floor(Math.random() * BALLS_CATALOG.length)])
    }
  }, [mode, dailyBall])

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
        <div className="text-2xl font-bold tracking-tighter letter-spacing-wider">
          NO BALL
        </div>
        <div className="text-sm text-white/60">
          BROADCAST SPORTS ANALYTICS
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-8xl font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-accent">
          NO BALL
        </h1>
        <p className="text-xl text-white/60 mb-12 max-w-2xl text-center">
          Identify iconic sports balls in flight. Guess the name tournament
          or year before the ball disappears.
        </p>

        <ModeToggle mode={mode} onModeChange={setMode} />

        <div className="mt-12 flex gap-4">
          <button
            onClick={startRound}
            className="px-8 py-4 rounded-full bg-accent text-white font-bold hover:bg-accent/80 transition-colors text-lg"
          >
            START GAME
          </button>
          <Link
            href="/vault"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors text-lg"
          >
            VAULT
          </Link>
        </div>

        <div className="relative w-full max-w-4xl h-[400px] mt-12">
          <HUDOverlay state={state} />

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

      <footer className="mt-auto px-6 py-8 text-xs text-white/40">
        NO BALL
      </footer>
    </div>
  )
}
