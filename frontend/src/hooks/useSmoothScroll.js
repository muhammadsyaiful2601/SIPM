import { useCallback } from 'react'

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Scroll halus ke sebuah section dengan memperhitungkan tinggi navbar sticky.
 * Tanpa JavaScript, anchor tetap bekerja (hanya melompat).
 */
export function useSmoothScroll({ offset = 88 } = {}) {
  return useCallback(
    (hash, event) => {
      event?.preventDefault()

      const target = hash
        ? document.querySelector(hash)
        : document.documentElement

      if (!target) return

      const top =
        target === document.documentElement
          ? 0
          : target.getBoundingClientRect().top + window.scrollY - offset

      if (hash) {
        window.history.replaceState(null, '', hash)
      }

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
    },
    [offset],
  )
}