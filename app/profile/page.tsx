/**
 * Profile page — player stats and collection progress.
 * Shows balls collected, streak, played, won. Save collection option.
 */
"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useTrophyVault } from "@/hooks/useTrophyVault"
import { BALLS_CATALOG } from "@/data/balls"
import type { BallMetadata } from "@/types/ball"

export default function ProfilePage() {
  const { getUnlockedBalls } = useTrophyVault(BALLS_CATALOG)
  const [unlockedBalls, setUnlockedBalls] = useState<BallMetadata[]>([])

  useEffect(() => {
    setUnlockedBalls(getUnlockedBalls())
  }, [getUnlockedBalls])

  return (
    <div className="bg-dark min-h-screen text-white font-sans py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-accent">
            PROFILE
          </h1>
          <Link
            href="/showcase"
            className="text-sm text-white/40 font-mono hover:text-white transition-colors"
          >
            Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-surface border border-white/10 rounded-xl p-6">
            <div className="text-xs text-white/40 font-mono uppercase tracking-widest mb-2">
              balls collected
            </div>
            <div className="text-4xl font-bold text-white">{unlockedBalls.length} / {BALLS_CATALOG.length}</div>
          </div>
          <div className="bg-surface border border-white/10 rounded-xl p-6">
            <div className="text-xs text-white/40 font-mono uppercase tracking-widest mb-2">
              current streak
            </div>
            <div className="text-4xl font-bold text-white">–</div>
          </div>
          <div className="bg-surface border border-white/10 rounded-xl p-6">
            <div className="text-xs text-white/40 font-mono uppercase tracking-widest mb-2">
              best streak
            </div>
            <div className="text-4xl font-bold text-white">–</div>
          </div>
          <div className="bg-surface border border-white/10 rounded-xl p-6">
            <div className="text-xs text-white/40 font-mono uppercase tracking-widest mb-2">
              played
            </div>
            <div className="text-4xl font-bold text-white">–</div>
          </div>
          <div className="bg-surface border border-white/10 rounded-xl p-6">
            <div className="text-xs text-white/40 font-mono uppercase tracking-widest mb-2">
              won
            </div>
            <div className="text-4xl font-bold text-white">–</div>
          </div>
        </div>

        <div className="bg-surface border border-white/10 rounded-xl p-6">
          <div className="text-xs text-white/40 font-mono uppercase tracking-widest mb-4">
            save your collection
          </div>
          <p className="text-white/60 mb-6">
            Keep your balls safe and play on any device. No password: we email
            you a code. Already saved them on another device? Enter the same
            email to bring them here.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="rounded bg-surface border border-white/20 text-accent focus:ring-accent" />
              I'm 14 or older
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="rounded bg-surface border border-white/20 text-accent focus:ring-accent" />
              Email me when new balls arrive
            </label>
          </div>
          <button
            className="mt-4 px-6 py-3 rounded-full bg-accent text-white font-bold hover:bg-accent/80 transition-colors"
          >
            Email me a code
          </button>
          <p className="mt-4 text-xs text-white/40">
            We only use your email to save your collection.
            <Link href="/privacy/" className="text-accent hover:underline">
              Privacy
            </Link>
          </p>
        </div>

        <div className="mt-12 text-xs text-white/40 font-mono uppercase tracking-widest flex gap-4">
          Questions, ideas or a ball we&apos;re missing?
          <Link href="mailto:hello@matchball.today" className="text-white hover:underline">
            hello@matchball.today
          </Link>
          Follow us on
          <Link
            href="https://www.facebook.com/matchball.today"
            className="text-white hover:underline"
          >
            Facebook
          </Link>
          <Link
            href="/privacy/"
            className="text-accent hover:underline"
          >
            Privacy
          </Link>
          <Link href="/cookies/" className="text-white hover:underline">
            Cookie settings
          </Link>
        </div>
      </div>
    </div>
  )
}
