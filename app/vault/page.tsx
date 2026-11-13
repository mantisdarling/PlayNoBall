/**
 * Trophy Vault page.
 * Displays the persistent collection of unlocked 3D balls.
 * Players can inspect and rotate each unlocked ball freely.
 */
import { TrophyVault } from "@/components/vault/TrophyVault"

export default function VaultPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TrophyVault />
    </div>
  )
}
