# Play No Ball

A broadcast sports analytics web game where players identify iconic sports balls flying across the screen in 3D.

## Features

### Daily Challenge
One ball per day with a deterministic seed. Every player sees the same ball on the same calendar day. One attempt per day.

### Endless Arcade
Endless mode with combo multiplier and streak counter. Random balls appear continuously. Build your streak and climb the leaderboard.

### Trophy Vault
Persistent collection of unlocked 3D balls. Inspect and rotate each ball freely. Unlock balls by guessing them correctly in gameplay.

### 3D Ball Physics
Real 3D rotating spheres rendered with React Three Fiber. Custom shader material renders procedural panel lines specular highlights and rim lighting without external textures.

### Smart Autocomplete
Responsive search input with fuzzy matching. Guess the ball name tournament or year smoothly.

### Audio and Haptics
Procedural Web Audio API sound effects whoosh chime buzzer. Mute toggle available. No external audio files required.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **3D Rendering**: React Three Fiber (Three.js)
- **State Management**: Custom React hooks
- **Storage**: localStorage for trophy vault persistence
- **Audio**: Web Audio API (procedural synthesis)

## Project Structure

```
noball/
app/
  page.tsx           # Landing page with mode selector
  daily/
    page.tsx         # Daily Challenge mode
  endless/
    page.tsx         # Endless Arcade mode
  vault/
    page.tsx         # Trophy Vault page
components/
  ui/
    BallCanvas.tsx   # 3D sphere shader renderer
    HUDOverlay.tsx   # Score streak combo lives HUD
    ComboStreak.tsx  # Streak and combo multiplier display
    AutocompleteInput.tsx  # Fuzzy matching search input
    ModeToggle.tsx   # Daily Endless mode switcher
  game/
    GameScene.tsx    # R3F scene wrapper camera lighting
    BallSpawner.tsx  # 3D ball flight with curved trajectory
    BallStage.tsx    # Canvas wrapper for BallSpawner
  vault/
    TrophyCard.tsx   # Individual ball card with 3D preview
    TrophyVault.tsx  # Collection grid of unlocked balls
hooks/
  useGameLogic.ts    # Scoring streak mode state
  useDailySeed.ts    # Deterministic daily ball selection
  useAutocomplete.ts # Fuzzy matching guess logic
  useTrophyVault.ts  # localStorage vault persistence
lib/
  constants.ts       # Game constants and color palette
  fuzzyMatch.ts      # Levenshtein distance fuzzy matching
  audio.ts           # Web Audio API sound engine
  validation.ts      # Input sanitization schema validation
types/
  ball.ts            # BallMetadata BallInstance interfaces
  game.ts            # GameState ScoreState GameMode types
  vault.ts           # UserProgress UnlockedBall types
data/
  balls.ts           # Canonical ball catalog ten iconic footballs
```

## Installation

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Build

```bash
npm run build
npm run start
```
## License

Copyright 2026 Play No Ball. All rights reserved.
