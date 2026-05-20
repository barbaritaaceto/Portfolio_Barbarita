import { useEffect, useRef } from 'react'

interface RevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, the class `is-revealed` is added.
 * Pair with the CSS classes `.reveal`, `.reveal-up`, `.reveal-stagger` defined in index.css.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null)
  const { threshold = 0.12, rootMargin = '0px 0px -40px 0px', once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed')
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove('is-revealed')
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}
