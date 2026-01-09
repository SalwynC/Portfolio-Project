import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatedBackground } from "@/components/animated-background"
import { PageLoader } from "@/components/page-loader"
import { ContentWrapper } from "@/components/content-wrapper"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Salwyn Christopher | Software Engineer & Full Stack Developer",
  description:
    "Final year engineering student specializing in full-stack development, building accessible and performant web experiences. Explore my projects, skills, and get in touch.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "TypeScript",
    "Next.js",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Salwyn Christopher" }],
  openGraph: {
    title: "Salwyn Christopher | Software Engineer & Full Stack Developer",
    description: "Final year engineering student specializing in full-stack development",
    type: "website",
    siteName: "Salwyn Christopher Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salwyn Christopher | Software Engineer",
    description: "Final year engineering student specializing in full-stack development",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "Next.js",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="font-sans antialiased transition-colors duration-200 bg-background text-foreground">
        <PageLoader />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AnimatedBackground />
          <ContentWrapper>
            {children}
          </ContentWrapper>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
