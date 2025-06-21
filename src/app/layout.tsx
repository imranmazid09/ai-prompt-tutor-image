import './globals.css'
import { type ReactNode } from 'react'

export const metadata = {
  title: 'AI Prompt Writing Tutor',
  description: 'Learn to write effective prompts for AI image generation',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
