/**
 * Landing page for No Ball.
 * Displays the game title mode selector and entry point to both game modes.
 * Broadcast sports analytics theme with zero hyphens in any visible text.
 */
import Link from "next/link"
import { useState } from "react"
import { ModeToggle } from "@/components/ui/ModeToggle"
import type { GameMode } from "@/types/game"

export default function HomePage() {
  const [mode, setMode] = useState<GameMode>("daily")

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
          <Link
            href={`/${mode}`}
            className="px-8 py-4 rounded-full bg-accent text-white font-bold hover:bg-accent/80 transition-colors text-lg"
          >
            START GAME
          </Link>
          <Link
            href="/vault"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors text-lg"
          >
            VAULT
          </Link>
        </div>
      </main>

      <footer className="mt-auto px-6 py-8 text-xs text-white/40">
        NO BALL EVENT PLANNER DHAKA BANGLADESH
      </footer>
    </div>
  )
}
