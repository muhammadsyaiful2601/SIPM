import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, EyeOff, Layers, ShieldCheck } from 'lucide-react'
import { focusRing } from '../../lib/ui'

const metrics = [
  {
    label: 'Target Respons',
    value: '3 Hari',
    icon: Clock3,
  },
  {
    label: 'Kategori',
    value: '3',
    icon: Layers,
  },
  {
    label: 'Privasi',
    value: 'Anonim',
    icon: EyeOff,
  },
]

const timeline = [
  { label: 'Terkirim', done: true, time: 'Hari ini, 09.12 WIB' },
  { label: 'Sedang Diproses Satgas', done: false, time: null },
  { label: 'Disposisi', done: false, time: null },
  { label: 'Selesai', done: false, time: null },
]

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="border-b border-slate-200 bg-slate-50"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
            Politeknik Negeri Padang PSDKU Tanah Datar
          </span>

          <h1
            id="hero-heading"
            className="mt-5 text-4xl leading-tight font-semibold tracking-tight text-slate-950 md:text-5xl"
          >
            Sampaikan Aduan Anda, Kerahasiaan Terjaga.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            SIPM adalah Sistem Informasi Pengaduan Mahasiswa. Laporkan
            fasilitas, akademik, maupun keluhan lainnya kapan saja, dan tanpa
            identitas bila Anda memilih mode anonim.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className={
                'inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-800 motion-reduce:transition-none ' +
                focusRing
              }
            >
              Buat Pengaduan
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              href="#cara-kerja"
              className={
                'inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 motion-reduce:transition-none ' +
                focusRing
              }
            >
              Lihat Cara Kerja
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-3 sm:gap-4">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div
                  key={metric.label}
                  className="border-l-2 border-emerald-700 px-3 py-1 sm:px-4"
                >
                  <dt className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-slate-600 uppercase">
                    <Icon
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-emerald-600"
                    />
                    {metric.label}
                  </dt>
                  <dd className="mt-1.5 text-lg font-bold text-slate-900 sm:text-xl">
                    {metric.value}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Alur pengaduan</p>
              <p className="mt-1 text-xs text-slate-500">Transparan sejak laporan dikirim</p>
            </div>
            <ShieldCheck aria-hidden="true" className="h-5 w-5 text-emerald-700" />
          </div>

          <ol className="mt-6 space-y-5 border-l border-slate-200 pl-6">
              {timeline.map((item) => (
                <li key={item.label} className="relative">
                  <span
                    aria-hidden="true"
                    className={
                      'absolute top-1 -left-[30px] h-2.5 w-2.5 rounded-full ring-4 ring-white ' +
                      (item.done
                        ? 'bg-emerald-700'
                        : 'border border-slate-300 bg-white')
                    }
                  />
                  <p
                    className={
                      item.done
                        ? 'text-sm font-semibold text-slate-900'
                        : 'text-sm font-medium text-slate-600'
                    }
                  >
                    {item.label}
                  </p>
                  {item.time && (
                    <p className="text-xs text-slate-500">{item.time}</p>
                  )}
                </li>
              ))}
          </ol>
        </div>
      </div>
    </section>
  )
}