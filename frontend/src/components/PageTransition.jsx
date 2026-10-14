import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const HEADER_OFFSET = 88
const BLOB_RADIUS = 44

/**
 * Liquid blob reveal: halaman baru terbuka dari titik kursor dengan
 * bentuk organik, lalu menutupi layar.
 *
 * Bentuk awal dihitung pada mount dari posisi kursor dan ukuran halaman,
 * sedangkan bentuk akhir hanya "inset(0)" sehingga tidak perlu bergantung
 * pada ukuran halaman.
 */
export default function PageTransition({ children }) {
  const location = useLocation()
  const routeKey = location.pathname

  const content = useRef(null)
  const click = useRef(null)

  useEffect(() => {
    const track = (event) => {
      click.current = { x: event.clientX, y: event.clientY }
    }

    window.addEventListener('pointerdown', track, { capture: true })

    return () => window.removeEventListener('pointerdown', track, true)
  }, [])

  useLayoutEffect(() => {
    const node = content.current
    if (!node) return

    const rect = node.getBoundingClientRect()

    const point = click.current ?? {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }

    const centerX = point.x - rect.left
    const centerY = point.y - rect.top

    node.style.setProperty('--b-top', `${Math.max(centerY - BLOB_RADIUS, 0)}px`)
    node.style.setProperty(
      '--b-right',
      `${Math.max(rect.width - centerX - BLOB_RADIUS, 0)}px`,
    )
    node.style.setProperty(
      '--b-bottom',
      `${Math.max(rect.height - centerY - BLOB_RADIUS, 0)}px`,
    )
    node.style.setProperty('--b-left', `${Math.max(centerX - BLOB_RADIUS, 0)}px`)

    const root = document.documentElement
    root.style.setProperty('--b-cx', `${point.x}px`)
    root.style.setProperty('--b-cy', `${point.y}px`)
  }, [routeKey])

  useLayoutEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)

      if (target) {
        const top =
          target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET

        window.scrollTo({ top: Math.max(top, 0), behavior: 'auto' })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [routeKey, location.hash])

  return (
    <>
      <span
        key={`${routeKey}-overlay`}
        aria-hidden="true"
        className="page-blob-overlay"
      />

      <div key={routeKey} ref={content} className="page-blob">
        {children}
      </div>
    </>
  )
}