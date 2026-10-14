import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTilt } from '../../hooks/useTilt'
import { depthRaised, focusRing, perspectiveStage } from '../../lib/ui'

/**
 * Kerangka halaman autentikasi: latar emerald, efek 3D, dan kartu kaca.
 * Dipakai bersama oleh halaman Masuk, Lupa Password, dan Atur Ulang.
 */
export default function AuthShell({
  icon: Icon,
  title,
  description,
  backTo = '/',
  backLabel = 'Beranda',
  children,
}) {
  const cardTilt = useTilt({ max: 4 })

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-100 via-emerald-50 to-sky-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-emerald-300/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-sky-200/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-24 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[68rem] w-[68rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/20"
      />

      <Link
        to={backTo}
        className={
          'absolute top-5 left-5 z-10 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-emerald-800 sm:top-7 sm:left-8 ' +
          focusRing
        }
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        {backLabel}
      </Link>

      <main className="relative flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 sm:py-20">
        <div className={perspectiveStage + ' w-full max-w-md'}>
          <div
            ref={cardTilt}
            className="[transform-style:preserve-3d] transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-8 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-28 h-56 bg-gradient-to-b from-emerald-200/60 via-emerald-100/30 to-transparent"
              />

              <div className={depthRaised + ' relative text-center'}>
                {Icon && (
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-lg shadow-emerald-900/10 ring-1 ring-emerald-100">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                )}

                <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
                  {title}
                </h1>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>

              <div className="reveal-group">{children}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}