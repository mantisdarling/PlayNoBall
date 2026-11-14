/**
 * Landing page for No Ball — matchball.today style.
 * Clean white background, big bold heading, tagline, play button, ball images.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      <nav className="px-6 py-6 border-b border-black/5">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter letter-spacing-wider">
            NO BALL
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold"
            >
              NB
            </a>
            <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center text-xs">
              👤
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-wider">3 balls a day · Slower on each pass</span>
            </div>
            <h1 className="text-8xl font-black leading-none mb-4">NO BALL</h1>
            <p className="text-lg text-black/60 max-w-xl leading-relaxed">
              Historic footballs fly past. Name the ball or its tournament and
              collect them all.
            </p>
            <button
              className="px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-black/90 transition-colors text-lg"
            >
              Play, it&apos;s free
            </button>
            <div className="text-sm text-black/40 flex items-center gap-2">
              <span>🏆</span>
              <span>All 50 match balls</span>
            </div>
          </div>

          <div className="flex justify-center relative">
            <div className="relative z-10 w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative rounded-full shadow-2xl border-4 border-white bg-black">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full p-[2px] mask mask-[radial-gradient(transparent_60%_black_0)]"></div>
                <div className="absolute inset-1/3 bg-orange-800 rounded-full"></div>
                <div className="absolute inset-1/4 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-10 w-32 h-32 bg-orange-900/30 rounded-full blur-xl"></div>
            <div className="absolute left-20 top-20 w-32 h-32 bg-blue-900/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </main>

      <footer className="mt-auto px-6 py-8 text-xs text-black/40">
        NO BALL
      </footer>
    </div>
  )
}
