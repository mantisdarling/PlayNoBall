/**
 * Vault page — redirects to Collection showcase.
 */
"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function VaultPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/showcase")
  }, [router])
  return null
}
