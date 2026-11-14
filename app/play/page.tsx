/**
 * Play page — Pass X of 3 progression.
 * Three balls fly past in 3D, slower on each pass. Name the ball
 * before it stops to collect it.
 */
"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
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

const BallStage = dynamic(
  () => import("@/components/game/BallStage").then((mod) => mod.BallStage),
  { ssr: false },
)

export default function PlayPage() {
  const logic = useGameLogic()
  const { guessBall } = useAutocomplete(BALLS_CATALOG)
  const [state, setState] = useState<GameState>(() => logic.createInitialState("daily"))
  const [currentBall, setCurrentBall] = useState<BallMetadata | null>(null)
  const [pass, setPass] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [passComplete, setPassComplete] = useState(false)

  const ballIndex = useDailySeed(BALLS_CATALOG.length)
  const dailyBall = BALLS_CATALOG[ballIndex]

  useEffect(() => {
    if (dailyBall) {
      setCurrentBall(dailyBall)
    }
  }, [dailyBall])

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
    setPassComplete(true)
  }

  const startPass = () => {
    setIsPlaying(true)
    setPassComplete(false)
    setState((prev) => ({ ...prev, isPlaying: true }))
  }

  const nextPass = () => {
    if (pass >= 3) {
      setPass(1)
      setPassComplete(false)
      return
    }
    setPass((p) => p + 1)
    setPassComplete(false)
    setIsPlaying(true)
    setState((prev) => ({ ...prev, isPlaying: true }))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-sm text-white/40 font-mono mb-8">
          Pass {pass} of 3
        </div>

        <HUDOverlay state={state} />

        <div className="relative w-full max-w-4xl h-[400px] mt-4">
          <BallStage
            ball={isPlaying ? currentBall : null}
            isActive={isPlaying}
            onMiss={() => {
              audioEngine.playBuzzer()
              setState((prev) => logic.applyIncorrectGuess(prev))
              setIsPlaying(false)
              setPassComplete(true)
            }}
          />
        </div>

        <ComboStreak state={state} />

        {passComplete ? (
          <div className="mt-8">
            <AutocompleteInput
              catalog={BALLS_CATALOG}
              onGuess={(ball) => {
                handleGuess(ball.name)
              }}
            />
            <div className="mt-6 flex gap-3">
              <button
                onClick={nextPass}
                disabled={pass >= 3}
                className="px-8 py-4 rounded-full bg-accent text-white font-bold hover:bg-accent/80 transition-colors text-lg disabled:opacity-50"
              >
                {pass >= 3 ? "FINISH" : "NEXT PASS"}
              </button>
              <Link
                href="/"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors text-lg"
              >
                QUIT
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <button
              onClick={startPass}
              disabled={isPlaying}
              className="px-8 py-4 rounded-full bg-accent text-white font-bold hover:bg-accent/80 transition-colors text-lg disabled:opacity-50"
            >
              {isPlaying ? "BALL IN FLIGHT" : "START PASS"}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
