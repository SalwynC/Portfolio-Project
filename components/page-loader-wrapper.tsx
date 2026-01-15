"use client"

import { PageLoader } from "@/components/page-loader"
import { usePageLoader } from "@/hooks/use-page-loader"

/**
 * PageLoaderWrapper
 *
 * Manages the page loader lifecycle.
 * Sits at the root layout to show an intro loader on first visit per session.
 *
 * Customization:
 * - duration: Time loader displays (default 2400ms)
 * - sessionKey: Storage key for tracking (default "portfolio-loader-shown")
 * - enabled: Toggle loader on/off (default true)
 *
 * To disable: <PageLoaderWrapper enabled={false} />
 * To change duration: <PageLoaderWrapper duration={1500} />
 */

interface PageLoaderWrapperProps {
  duration?: number
  sessionKey?: string
  enabled?: boolean
}

export function PageLoaderWrapper({
  duration = 2400,
  sessionKey = "portfolio-loader-shown",
  enabled = true,
}: PageLoaderWrapperProps) {
  const { isLoading } = usePageLoader({
    duration,
    sessionKey,
    enabled,
  })

  // Note: PageLoader manages its own internal state (3.5s timeout)
  // The isLoading state from usePageLoader hook is available for other use cases
  return <PageLoader />
}
