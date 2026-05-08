import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Fraunces, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Felix Grimm — Engineer & Researcher",
  description:
    "Cornell CS '27. Building at the edge of software and physical systems — multi-agent reinforcement learning, computer vision, embedded systems, geospatial.",
  keywords: ["Felix Grimm", "Cornell", "software engineer", "machine learning", "embedded systems", "research"],
  authors: [{ name: "Felix Grimm" }],
  creator: "Felix Grimm",
  openGraph: {
    title: "Felix Grimm — Engineer & Researcher",
    description: "Cornell CS '27. Building at the edge of software and physical systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felix Grimm — Engineer & Researcher",
    description: "Cornell CS '27. Building at the edge of software and physical systems.",
  },
  robots: { index: true, follow: true },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
