import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { focusRing, sectionWrapper } from '../../lib/ui'

const points = [
  {
    description:
      'Nama dan NIM pelapor disembunyikan pada seluruh payload API yang dikirim ke petugas.',
  },
  {
    description:
      'Unggahan bukti dibatasi 5 MB dan hanya menerima format JPG, PNG, atau PDF.',
  },
  {
    description:
      'Akses ke data aduan hanya untuk Apparatus PPKPT yang berwenang.',
  },
]

export default function Privacy() {
  return (
    <section
      id="tentang"
      aria-labelledby="privasi-heading"
      className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-16 sm:py-20"
    >
      <div className={sectionWrapper}>
        <div className="reveal-group grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold text-emerald-800">
              Tentang SIPM
            </span>
            <h2
              id="privasi-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-slate-900"
            >
              Identitas pelapor adalah prioritas utama kami
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Sebelum ini, aduan disampaikan secara lisan atau pesan pribadi.
              SIPM menggantikan cara tersebut dengan sistem terpusat yang
              menjaga kerahasiaan dan menyimpan setiap laporan.
            </p>
            <Link
              to="/login"
              className={
                'mt-8 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-800 motion-reduce:transition-none ' +
                focusRing
              }
            >
              Mulai Melapor
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <ul className="reveal-group space-y-4">
            {points.map((point) => (
              <li
                key={point.description}
                className="flex gap-3 border-b border-slate-200 py-4 last:border-b-0"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                />
                <p className="leading-relaxed text-slate-700">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}