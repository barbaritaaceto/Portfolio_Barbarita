import { useEffect, useRef } from 'react'
import { track } from '../lib/analytics'

const SCROLL_DEPTHS = [25, 50, 75, 90] as const

/**
 * Fires scroll_25 / scroll_50 / scroll_75 / scroll_90 once per page load.
 * Attach to a page component with useScrollDepth().
 */
export function useScrollDepth() {
  const fired = useRef(new Set<number>())

  useEffect(() => {
    fired.current.clear()

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      const pct = Math.round((scrolled / total) * 100)

      for (const depth of SCROLL_DEPTHS) {
        if (pct >= depth && !fired.current.has(depth)) {
          fired.current.add(depth)
          track.scrollDepth(depth)
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

/**
 * Returns a ref to attach to a section element.
 * Fires section_view once when ≥50% of the section is visible in the viewport.
 *
 * Usage:
 *   const ref = useSectionView('hero')
 *   <section ref={ref}>...</section>
 */
export function useSectionView<T extends HTMLElement>(sectionName: string) {
  const ref = useRef<T>(null)
  const fired = useRef(false)

  useEffect(() => {
    fired.current = false
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          track.sectionView(sectionName)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionName])

  return ref
}
