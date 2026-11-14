/**
 * Root layout for No Ball.
 * Wraps all pages with the document structure and shared styles.
 */
import "./globals.css"

export const metadata = {
  title: "No Ball",
  description: "Guess the iconic sports ball",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white font-sans min-h-screen">
        {children}
      </body>
    </html>
  )
}
