/**
 * TrophyVault displays the persistent collection of unlocked 3D balls.
 * It connects to useTrophyVault for localStorage persistence and renders
 * each unlocked ball as a rotatable TrophyCard in a responsive grid.
 */
import { useEffect, useState } from "react"
import { useTrophyVault } from "@/hooks/useTrophyVault"
import { BALLS_CATALOG } from "@/data/balls"
import { TrophyCard } from "@/components/vault/TrophyCard"
import type { BallMetadata } from "@/types/ball"

export function TrophyVault() {
  const { unlockBall, getUnlockedBalls } = useTrophyVault(BALLS_CATALOG)
  const [unlockedBalls, setUnlockedBalls] = useState<BallMetadata[]>([])

  useEffect(() => {
    setUnlockedBalls(getUnlockedBalls())
  }, [getUnlockedBalls])

  const handleUnlock = (ballId: string) => {
    unlockBall(ballId)
    setUnlockedBalls(getUnlockedBalls())
  }

  return (
    <div className="bg-dark min-h-screen text-white font-sans py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-accent">
            TROPHY VAULT
          </h1>
          <div className="text-sm text-white/40 font-mono">
            {unlockedBalls.length} / {BALLS_CATALOG.length} unlocked
          </div>
        </div>

        <p className="text-white/60 mb-8 max-w-2xl">
          Collect iconic footballs by guessing them correctly in Daily Challenge
          or Endless Arcade mode. Each unlocked ball can be inspected and
          rotated freely in 3D.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {BALLS_CATALOG.map((ball) => {
            const isUnlocked = unlockedBalls.some((b) => b.id === ball.id)
            return (
              <div key={ball.id} className="group relative">
                <TrophyCard ball={ball} />
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-xl">
                    <button
                      onClick={() => handleUnlock(ball.id)}
                      className="px-6 py-3 rounded-full bg-accent text-white font-bold hover:bg-accent/80 transition-colors text-sm"
                    >
                      UNLOCK
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-xs text-white/40 font-mono uppercase tracking-widest">
          play noball event planner dhaka bangladesh
        </div>
      </div>
    </div>
  )
}
