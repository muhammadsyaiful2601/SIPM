import { useEffect, useRef } from 'react'

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Efek 3D ringan yang mengikuti posisi pointer.
 *
 * Listener dipasang langsung ke elemen di dalam effect, sehingga komponen
 * hanya perlu mengoper `ref` ke JSX. Nonaktif otomatis untuk perangkat
 * sentuh dan pengguna yang memilih prefers-reduced-motion.
 */
export function useTilt({ max = 3, disabled = false } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element || disabled) return

    let frame = 0

    const schedule = (transform) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        element.style.transform = transform
      })
    }

    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return
      if (prefersReducedMotion()) return

      const rect = element.getBoundingClientRect()
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5

      const rotateX = (-offsetY * max).toFixed(3)
      const rotateY = (offsetX * max).toFixed(3)

      schedule(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
    }

    const reset = () => {
      cancelAnimationFrame(frame)
      element.style.transform = ''
    }

    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerleave', reset)
    element.addEventListener('pointercancel', reset)

    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerleave', reset)
      element.removeEventListener('pointercancel', reset)
    }
  }, [max, disabled])

  return ref
}