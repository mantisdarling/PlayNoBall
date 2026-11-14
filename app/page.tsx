/**
 * Landing page for No Ball — matchball.today style.
 * Simple hero with tagline, Play button, and All match balls link.
 */
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-accent">
          NO BALL
        </h1>
        <p className="text-xl text-white/60 mb-12 max-w-2xl text-center">
          Historic footballs fly past. Name the ball or its tournament and
          collect them all.
        </p>

        <div className="flex gap-4">
          <Link
            href="/play"
            className="px-8 py-4 rounded-full bg-accent text-white font-bold hover:bg-accent/80 transition-colors text-lg"
          >
            Play
          </Link>
          <Link
            href="/showcase"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors text-lg"
          >
            All match balls
          </Link>
        </div>
      </main>

      <footer className="mt-auto px-6 py-8 text-xs text-white/40">
        NO BALL
      </footer>
    </div>
  )
}
