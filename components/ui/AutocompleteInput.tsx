/**
 * AutocompleteInput provides a responsive search input with fuzzy matching
 * for guessing ball names tournaments or years. Connects to useAutocomplete.
 */
import { useCallback, useRef, useState } from "react"
import type { BallMetadata } from "@/types/ball"

interface AutocompleteInputProps {
  catalog: BallMetadata[]
  onGuess: (ball: BallMetadata) => void
}

export function AutocompleteInput({ catalog, onGuess }: AutocompleteInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<BallMetadata[]>([])

  const handleInput = useCallback((value: string) => {
    setQuery(value)
    if (!value || value.trim().length === 0) {
      setSuggestions([])
      return
    }
    const normalized = value.toLowerCase().trim()
    const matches = catalog.filter((ball) =>
      ball.name.toLowerCase().includes(normalized) ||
      ball.tournament.toLowerCase().includes(normalized) ||
      String(ball.year).includes(normalized)
    )
    setSuggestions(matches.slice(0, 5))
  }, [catalog])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputRef.current) return
    const value = inputRef.current.value.trim()
    if (!value) return

    const normalized = value.toLowerCase()
    const match = catalog.find(
      (ball) =>
        ball.name.toLowerCase() === normalized ||
        ball.tournament.toLowerCase() === normalized ||
        String(ball.year) === normalized
    )

    if (match) {
      onGuess(match)
      inputRef.current.value = ""
      setQuery("")
      setSuggestions([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const value = e.currentTarget.value.trim()
      if (!value) return
      const normalized = value.toLowerCase()
      const match = catalog.find(
        (ball) =>
          ball.name.toLowerCase() === normalized ||
          ball.tournament.toLowerCase() === normalized ||
          String(ball.year) === normalized
      )
      if (match) {
        onGuess(match)
        e.currentTarget.value = ""
        setQuery("")
        setSuggestions([])
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <input
          ref={inputRef}
          type="text"
          placeholder="Guess ball name tournament or year"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-3 rounded-full bg-surface border border-white/20 text-white focus:outline-none focus:border-accent"
          autoComplete="off"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-accent text-white font-bold hover:bg-accent/80 transition-colors"
        >
          GUESS
        </button>
      </form>
      {suggestions.length > 0 && (
        <div className="flex flex-col gap-1 w-full max-w-md bg-surface border border-white/10 rounded-lg p-2">
          {suggestions.map((ball) => (
            <div
              key={ball.id}
              onClick={() => {
                onGuess(ball)
                inputRef.current!.value = ""
                setQuery("")
                setSuggestions([])
              }}
              className="p-2 rounded text-sm text-white hover:bg-white/10 cursor-pointer"
            >
              {ball.name} — {ball.tournament} {ball.year}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
