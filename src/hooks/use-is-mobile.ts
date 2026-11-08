import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT_PX = 768

/**
 * Returns true when the viewport is narrower than the mobile breakpoint.
 * Phase 1 uses this to switch between the three-panel desktop layout
 * and a tabbed mobile view (plan § 1).
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window === 'undefined'
      ? false
      : window.innerWidth < MOBILE_BREAKPOINT_PX,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
