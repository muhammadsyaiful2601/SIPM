import { useId, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  Eye,
  EyeOff,
  GraduationCap,
  Headset,
  Loader2,
  Lock,
  LockKeyhole,
  ShieldCheck,
  User,
  UserCog,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { focusRing } from '../lib/ui'

const accountTypes = [
  {
    key: 'mahasiswa',
    label: 'Mahasiswa',
    icon: GraduationCap,
    identifierLabel: 'NIM',
    identifierPlaceholder: '2210112345',
    identifierType: 'text',
    inputMode: 'numeric',
    autoComplete: 'username',
    helper: 'Gunakan NIM aktif yang terdaftar di PSDKU Tanah Datar.',
  },
  {
    key: 'staf',
    label: 'Staf',
    icon: UserCog,
    identifierLabel: 'Email Institutional',
    identifierPlaceholder: 'nama@psdku-tanahdatar.ac.id',
    identifierType: 'email',
    inputMode: 'email',
    autoComplete: 'email',
    helper: 'Untuk Admin PPKPT, Pembina Kemahasiswaan, dan Unit Kampus.',
  },
]

const trustPoints = [
  {
    icon: LockKeyhole,
    title: 'Satu akun terintegrasi',
    description:
      'Satu login berlaku untuk pelaporan, pelacakan, dan pembacaan tanggapan.',
  },
  {
    icon: ShieldCheck,
    title: 'Enkripsi data dan perlindungan anonimitas',
    description:
      'Identitas pelapor anonim tetap tersembunyi dari pihak yang tidak berhak.',
  },
  {
    icon: BadgeCheck,
    title: 'Respon terjamin 3 hari kerja',
    description:
      'Setiap aduan terlacak dan memiliki tenggat respons yang jelas.',
  },
]

export default function LoginPage() {
  const [accountType, setAccountType] = useState(accountTypes[0].key)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { login, user, initializing } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const identifierId = useId()
  const passwordId = useId()
  const errorId = useId()

  if (!initializing && user) {
    return <Navigate to="/dashboard" replace />
  }

  const activeType =
    accountTypes.find((item) => item.key === accountType) ?? accountTypes[0]

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login({
        identifier: identifier.trim(),
        password,
        role: activeType.key,
      })

      navigate(location.state?.from ?? '/dashboard', { replace: true })
    } catch (requestError) {
      const response = requestError.response
      setError(
        response?.data?.errors?.identifier?.[0] ??
          response?.data?.errors?.password?.[0] ??
          response?.data?.message ??
          'Terjadi kesalahan. Silakan coba lagi.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const switchAccountType = (key) => {
    setAccountType(key)
    setError('')
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-12">
      <aside className="hidden border-r border-slate-200 bg-slate-50 lg:col-span-5 lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-12 xl:px-16">
        <Link
          to="/"
          className={
            'flex items-center gap-3 rounded-lg text-slate-900 ' + focusRing
          }
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700 text-white">
            <ShieldCheck aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold">SIPM</span>
            <span className="block text-xs text-slate-500">
              PSDKU Tanah Datar
            </span>
          </span>
        </Link>

        <div className="max-w-md">
          <p className="text-sm font-medium text-emerald-800">
            Sistem Informasi Pengaduan Mahasiswa
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-slate-950 xl:text-4xl">
            Sampaikan laporan dengan aman dan terarah.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Gunakan SIPM untuk menyampaikan pengaduan dan mengikuti proses
            penanganannya di PSDKU Tanah Datar.
          </p>
          <ul className="mt-8 space-y-5 border-t border-slate-200 pt-6">
            {trustPoints.map((point) => {
              const Icon = point.icon

              return (
                <li key={point.title} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-emerald-800">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {point.title}
                    </p>
                    <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-600">
                      {point.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <p className="text-xs text-slate-500">
          Politeknik Negeri Padang PSDKU Tanah Datar
        </p>
      </aside>

      <main className="flex flex-col bg-white lg:col-span-7">
        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between gap-4">
              <Link
                to="/"
                className={
                  'inline-flex items-center gap-2 rounded-md text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-emerald-800 lg:hidden ' +
                  focusRing
                }
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Beranda
              </Link>

              <Link
                to="/"
                className={
                  'ml-auto inline-flex items-center gap-2.5 rounded-lg text-slate-900 lg:hidden ' +
                  focusRing
                }
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white">
                  <ShieldCheck aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">SIPM</span>
              </Link>
            </div>

            <h1 className="mt-10 text-3xl font-semibold tracking-tight text-slate-950">
              Masuk ke akun Anda
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-500">
              Pilih jenis akun, lalu isi kredensial sesuai role yang Anda punya.
            </p>

            <div
              role="tablist"
              aria-label="Jenis akun"
              className="mt-8 grid grid-cols-2 gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1"
            >
              {accountTypes.map((item) => {
                const Icon = item.icon
                const isActive = item.key === accountType

                return (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    id={`tab-${item.key}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${item.key}`}
                    onClick={() => switchAccountType(item.key)}
                    className={
                      'flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none ' +
                      focusRing +
                      (isActive
                        ? 'border border-slate-200 bg-white text-slate-900'
                        : 'text-slate-600 hover:text-slate-900')
                    }
                  >
                    <Icon
                      aria-hidden="true"
                      className={
                        isActive ? 'h-4 w-4 text-emerald-600' : 'h-4 w-4'
                      }
                    />
                    {item.label}
                  </button>
                )
              })}
            </div>

            <form
              id={`panel-${activeType.key}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeType.key}`}
              onSubmit={handleSubmit}
              className="mt-8"
              noValidate
            >
              {error && (
                <div
                  id={errorId}
                  role="alert"
                  className="mb-6 flex gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3"
                >
                  <AlertCircle
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-rose-600"
                  />
                  <p className="text-sm leading-relaxed text-rose-800">
                    {error}
                  </p>
                </div>
              )}

              <div>
                <label
                  htmlFor={identifierId}
                  className="block text-sm font-medium text-slate-900"
                >
                  {activeType.identifierLabel}
                </label>
                <div className="relative mt-2">
                  <User
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id={identifierId}
                    name="identifier"
                    type={activeType.identifierType}
                    inputMode={activeType.inputMode}
                    autoComplete={activeType.autoComplete}
                    required
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    placeholder={activeType.identifierPlaceholder}
                    aria-describedby={error ? errorId : undefined}
                    aria-invalid={Boolean(error)}
                    className={
                      'block w-full rounded-lg bg-white py-3 pr-4 pl-11 text-sm text-slate-900 ring-1 ring-slate-300 transition-colors duration-200 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-700 focus:outline-none motion-reduce:transition-none ' +
                      focusRing
                    }
                  />
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-500">
                  {activeType.helper}
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor={passwordId}
                    className="block text-sm font-medium text-slate-900"
                  >
                    Kata sandi
                  </label>
                </div>
                <div className="relative mt-2">
                  <Lock
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id={passwordId}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    aria-describedby={error ? errorId : undefined}
                    aria-invalid={Boolean(error)}
                    className={
                      'block w-full rounded-lg bg-white py-3 pr-12 pl-11 text-sm text-slate-900 ring-1 ring-slate-300 transition-colors duration-200 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-700 focus:outline-none motion-reduce:transition-none ' +
                      focusRing
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword
                        ? 'Sembunyikan kata sandi'
                        : 'Tampilkan kata sandi'
                    }
                    aria-pressed={showPassword}
                    className={
                      'absolute inset-y-0 right-2 flex items-center rounded-lg px-2.5 text-slate-400 transition-colors duration-200 hover:text-slate-700 ' +
                      focusRing
                    }
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <Eye aria-hidden="true" className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={
                  'mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none ' +
                  focusRing
                }
              >
                {submitting && (
                  <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                )}
                {submitting ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            <div className="mt-10 border-t border-slate-200 pt-6">
              <div className="flex gap-3">
                <Headset
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                />
                <p className="text-sm leading-relaxed text-slate-500">
                  Belum dapat masuk? Hubungi petugas PPKPT PSDKU Tanah Datar
                  untuk aktivasi akun atau pengaturan ulang kata sandi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}