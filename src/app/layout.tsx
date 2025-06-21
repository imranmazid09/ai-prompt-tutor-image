import './globals.css'
import { type ReactNode } from 'react'

export const metadata = {
  title: 'AI Prompt Writing Tutor',
  description: 'Learn to write effective prompts for AI image generation',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export const viewport = {
  width: 'device-width',
  initialScale: 1
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
