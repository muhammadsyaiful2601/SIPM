import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, ShieldCheck, X } from 'lucide-react'
import { focusRing } from '../../lib/ui'

const links = [
  { label: 'Fitur', href: '#fitur' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Kategori', href: '#kategori' },
  { label: 'Tentang', href: '#tentang' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <a
        href="#konten-utama"
        className={
          'sr-only rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10 ' +
          focusRing
        }
      >
        Lewati ke konten utama
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className={
            'flex shrink-0 items-center gap-2 rounded-lg ' + focusRing
          }
          aria-label="SIPM, kembali ke beranda"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white">
            <ShieldCheck aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold text-slate-900">
              SIPM
            </span>
            <span className="block text-[11px] text-slate-600">
              PSDKU Tanah Datar
            </span>
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={
                    'rounded-md text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-emerald-700 ' +
                    focusRing
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <Link
            to="/login"
            className={
              'rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 ' +
              focusRing
            }
          >
            Masuk
          </Link>
          <Link
            to="/login"
            className={
              'rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-800 ' +
              focusRing
            }
          >
            Buat Aduan
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          className={
            'shrink-0 rounded-lg p-2 text-slate-700 transition-colors duration-200 hover:bg-slate-100 md:hidden ' +
            focusRing
          }
        >
          {open ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-slate-100 bg-white md:hidden"
      >
        <nav
          aria-label="Navigasi seluler"
          className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    'block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 ' +
                    focusRing
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className={
                'rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 ' +
                focusRing
              }
            >
              Masuk
            </Link>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className={
                'rounded-lg bg-emerald-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-800 ' +
                focusRing
              }
            >
              Buat Aduan
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}