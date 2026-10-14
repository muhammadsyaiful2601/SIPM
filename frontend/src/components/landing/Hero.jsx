import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock3, EyeOff, TrendingUp } from 'lucide-react'
import { heroChecks } from '../../data/hero'
import api from '../../lib/api'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { focusRing, sectionWrapper } from '../../lib/ui'

const emptyStats = {
  period_label: '',
  total: 0,
  selesai: 0,
  direspon: 0,
  tepat_waktu: 0,
  persentase_tepat_waktu: 0,
}

const panels = [
  {
    phase: 'Fase 1',
    title: 'Pelaporan',
    count: '3 langkah',
    rows: [
      '> masuk sebagai mahasiswa (NIM)',
      '> isi formulir pengaduan',
      '> lampirkan bukti pendukung',
    ],
  },
  {
    phase: 'Fase 2',
    title: 'Penanganan',
    count: '2 langkah',
    rows: [
      '> verifikasi dan balas pelapor',
      '> disposisi ke unit kampus',
    ],
  },
  {
    phase: 'Fase 3',
    title: 'Pelaporan dan rekap',
    count: '2 langkah',
    rows: ['> rekap statistik aduan', '> eskalasi bila lewat 3 hari'],
  },
]

const statusRows = [
  { label: 'Terkirim', tone: 'amber' },
  { label: 'Sedang diproses', tone: 'emerald' },
  { label: 'Disposisi', tone: 'sky' },
  { label: 'Selesai', tone: 'slate' },
]

const toneDot = {
  amber: 'bg-amber-400',
  emerald: 'bg-emerald-400',
  sky: 'bg-sky-400',
  slate: 'bg-slate-500',
}

export default function Hero() {
  const scrollTo = useSmoothScroll()

  const { data } = useQuery({
    queryKey: ['public-stats'],
    queryFn: async () => {
      const response = await api.get('/public/stats')
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })

  const stats = { ...emptyStats, ...data }
  const persentase = stats.persentase_tepat_waktu

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl"
      />

      <div
        className={
          sectionWrapper +
          ' relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24'
        }
      >
        <div className="reveal-group">
          <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            Sistem resmi PPKPT PSDKU Tanah Datar
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            Aduan mahasiswa yang rapi, terlacak, dan aman
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
            SIPM menghimpun seluruh pengaduan mahasiswa PSDKU Tanah Datar ke
            dalam satu sistem. Identitas pelapor terlindungi, petugas bekerja
            dengan data yang sama, dan setiap unit tahu apa yang harus
            dikerjakan.
          </p>

          <ul className="mt-8 space-y-3">
            {heroChecks.map((check) => (
              <li key={check} className="flex gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-600"
                />
                <span className="text-sm leading-relaxed text-slate-700">
                  {check}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/login"
              className={
                'inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/25 focus-visible:ring-offset-emerald-600 motion-reduce:transition-none ' +
                focusRing
              }
            >
              Buat pengaduan
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>

            <a
              href="#cara-kerja"
              onClick={(event) => {
                scrollTo('#cara-kerja', event)
              }}
              className={
                'inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-100 ' +
                focusRing
              }
            >
              Lihat cara kerja
            </a>
          </div>

          <div className="mt-10 max-w-sm">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-emerald-600" />
                Target respons 3 hari kerja
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Target respons 3 hari kerja"
              aria-valuenow={3}
              aria-valuemin={0}
              aria-valuemax={3}
              className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
            >
              <div className="h-full w-full rounded-full bg-emerald-500" />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Belum direspon 3 hari kerja? Sistem otomatis menawarkan opsi
              eskalasi ke PPKPT Pusat.
            </p>
          </div>
        </div>

        <div className="reveal-group relative">
          <div className="rounded-2xl bg-slate-900 p-5 shadow-2xl shadow-slate-900/20 ring-1 ring-slate-800">
            <div className="flex items-center gap-1.5 border-b border-slate-800 pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
              <span className="ml-3 truncate font-mono text-xs text-slate-500">
                sipm.psdku-tanahdatar.ac.id
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {panels.map((panel) => (
                <div
                  key={panel.phase}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[11px] font-semibold tracking-widest text-emerald-400 uppercase">
                      {panel.phase} - {panel.title}
                    </p>
                    <span className="font-mono text-[11px] text-slate-500">
                      {panel.count}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5 font-mono text-xs text-slate-400">
                    {panel.rows.map((row) => (
                      <li key={row}>{row}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="font-mono text-[11px] font-semibold tracking-widest text-slate-500 uppercase">
                  Status aduan
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {statusRows.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center gap-2 text-xs text-slate-300"
                    >
                      <span
                        className={
                          'h-2 w-2 shrink-0 rounded-full ' + toneDot[row.tone]
                        }
                      />
                      {row.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-4 w-56 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 sm:-left-10">
            <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              Rekap {stats.period_label || 'bulan ini'}
            </p>

            <p className="mt-2 flex items-center gap-1.5 text-2xl font-bold text-slate-900">
              {persentase > 0 && (
                <TrendingUp
                  aria-hidden="true"
                  className="h-4 w-4 text-emerald-600"
                />
              )}
              {persentase}
              {persentase > 0 && '%'}
            </p>

            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              {stats.total > 0
                ? `${stats.tepat_waktu} dari ${stats.direspon} aduan direspon dalam 3 hari kerja`
                : 'Belum ada aduan masuk bulan ini'}
            </p>

            <div
              role="progressbar"
              aria-label="Persentase aduan yang direspon dalam 3 hari kerja"
              aria-valuenow={persentase}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-[width] duration-500 motion-reduce:transition-none"
                style={{ width: `${persentase}%` }}
              />
            </div>
          </div>

          <div className="absolute -top-6 right-2 hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:flex">
            <EyeOff aria-hidden="true" className="h-3.5 w-3.5" />
            Identitas pelapor terlindungi
          </div>
        </div>
      </div>
    </section>
  )
}