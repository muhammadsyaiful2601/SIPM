import { Link } from 'react-router-dom'
import { Mail, MapPin, ShieldCheck } from 'lucide-react'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { focusRing } from '../../lib/ui'

export default function Footer() {
  const scrollTo = useSmoothScroll()
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-white">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">
                SIPM - PSDKU Tanah Datar
              </p>
              <p className="mt-1 max-w-xs text-sm leading-relaxed text-slate-600">
                Sistem Informasi Pengaduan Mahasiswa Politeknik Negeri Padang
                PSDKU Tanah Datar.
              </p>
            </div>
          </div>

          <address className="flex flex-col gap-3 text-sm text-slate-600 md:items-end">
            <span className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="h-4 w-4 text-emerald-600" />
              PSDKU Tanah Datar
            </span>
            <span className="flex items-center gap-2">
              <Mail aria-hidden="true" className="h-4 w-4 text-emerald-600" />
              satgas.ppkpt@psdku-tanahdatar.ac.id
            </span>
          </address>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-slate-600">
            Dikembangkan oleh Kelompok 1 - 2026. Seluruh hak cipta dilindungi.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link
                to="/login"
                className={
                  'rounded-md text-xs font-medium text-slate-700 underline-offset-4 transition-colors duration-200 hover:text-emerald-700 hover:underline ' +
                  focusRing
                }
              >
                Masuk
              </Link>
            </li>
            <li>
              <a
                href="#tentang"
                onClick={(event) => {
                  scrollTo('#tentang', event)
                }}
                className={
                  'rounded-md text-xs font-medium text-slate-700 underline-offset-4 transition-colors duration-200 hover:text-emerald-700 hover:underline ' +
                  focusRing
                }
              >
                Tentang
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}