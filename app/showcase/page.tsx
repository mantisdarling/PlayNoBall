/**
 * Showcase page — collection of match balls.
 * Tabs: All / World Cups / Euros / Rarities. Grid of balls with locked state.
 */
"use client"
import { useEffect, useState } from "react"
import { useTrophyVault } from "@/hooks/useTrophyVault"
import { BALLS_CATALOG } from "@/data/balls"
import type { BallMetadata } from "@/types/ball"

type Tab = "all" | "worldcups" | "euros" | "rarities"

const TAB_LABELS: Record<Tab, string> = {
  all: "All",
  worldcups: "World Cups",
  euros: "Euros",
  rarities: "Rarities",
}

function filterBalls(catalog: BallMetadata[], tab: Tab): BallMetadata[] {
  switch (tab) {
    case "all":
      return catalog
    case "worldcups":
      return catalog.filter((b) => b.tournament === "FIFA World Cup")
    case "euros":
      return catalog.filter((b) => b.tournament !== "FIFA World Cup")
    case "rarities":
      return catalog.filter((b) => b.difficulty >= 4)
    default:
      return catalog
  }
}

export default function ShowcasePage() {
  const { unlockBall, getUnlockedBalls } = useTrophyVault(BALLS_CATALOG)
  const [unlockedBalls, setUnlockedBalls] = useState<BallMetadata[]>([])
  const [tab, setTab] = useState<Tab>("all")

  useEffect(() => {
    setUnlockedBalls(getUnlockedBalls())
  }, [getUnlockedBalls])

  const filtered = filterBalls(BALLS_CATALOG, tab)
  const isUnlocked = (ball: BallMetadata) =>
    unlockedBalls.some((b) => b.id === ball.id)

  const handleUnlock = (ballId: string) => {
    unlockBall(ballId)
    setUnlockedBalls(getUnlockedBalls())
  }

  return (
    <div className="bg-dark min-h-screen text-white font-sans py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-accent">
            COLLECTION
          </h1>
          <div className="text-sm text-white/40 font-mono">
            {unlockedBalls.length} / {BALLS_CATALOG.length} collected
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          {Object.values(TAB_LABELS).map((label, i) => {
            const t = Object.keys(TAB_LABELS)[i] as Tab
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  tab === t
                    ? "bg-accent text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : "text-white/40 hover:text-white border border-white/10"
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((ball) => {
            const unlocked = isUnlocked(ball)
            return (
              <div key={ball.id} className="group relative">
                <div className="bg-surface border border-white/10 rounded-xl p-4 cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`font-bold text-lg ${unlocked ? "text-white" : "text-white/30"}`}>
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
                    {unlocked ? (
                      <div className="text-white/10 text-xl">⚽</div>
                    ) : (
                      <div className="text-white/10 text-xl">🔒</div>
                    )}
                  </div>
                  {!unlocked && (
                    <div className="mt-3 text-xs text-green-400 font-mono uppercase tracking-widest">
                      unlock xp {ball.unlockXP}
                    </div>
                  )}
                </div>
                {!unlocked && (
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
      </div>
    </div>
  )
}
