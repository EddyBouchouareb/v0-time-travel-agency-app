import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TimeTravel Agency | Voyagez au-dela du Temps",
  description:
    "Agence de voyages temporels de luxe. Explorez Paris 1889, Florence 1504 et le Cretace. Vivez des experiences uniques a travers le temps.",
}

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${_playfair.variable} ${_inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
