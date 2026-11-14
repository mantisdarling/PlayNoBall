/**
 * Top navigation bar matching matchball.today.
 * Logo on left, Play / Collection / Profile links on right.
 */
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function TopNav() {
  const pathname = usePathname()
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tighter letter-spacing-wider">NO BALL</span>
      </Link>
      <div className="flex items-center gap-4 text-sm text-white/60">
        <Link
          href="/play"
          className={`hover:text-white transition-colors ${
            pathname === "/play" ? "text-white font-bold" : ""
          }`}
        >
          Play
        </Link>
        <Link
          href="/showcase"
          className={`hover:text-white transition-colors ${
            pathname === "/showcase" ? "text-white font-bold" : ""
          }`}
        >
          Collection
        </Link>
        <Link
          href="/profile"
          className={`hover:text-white transition-colors ${
            pathname === "/profile" ? "text-white font-bold" : ""
          }`}
        >
          Profile
        </Link>
      </div>
    </nav>
  )
}
