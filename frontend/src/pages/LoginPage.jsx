import { useId, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  FlaskConical,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UserCog,
} from 'lucide-react'
import accountTypes from '../data/accountTypes'
import { useAuth } from '../context/AuthContext'
import { useTilt } from '../hooks/useTilt'
import {
  depthRaised,
  depthTop,
  focusRing,
  perspectiveStage,
} from '../lib/ui'

const tabIcons = {
  graduation: GraduationCap,
  staff: UserCog,
}

const identifierIcons = {
  user: User,
  mail: Mail,
}

const dottedLine =
  'h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--color-slate-300)_0_4px,transparent_4px_9px)]'

export default function LoginPage() {
  const [accountType, setAccountType] = useState(accountTypes[0].key)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { login, user, initializing } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const tabRefs = useRef([])
  const cardTilt = useTilt({ max: 4 })

  const identifierId = useId()
  const passwordId = useId()
  const rememberId = useId()
  const errorId = useId()

  if (!initializing && user) {
    return <Navigate to="/dashboard" replace />
  }

  const activeType =
    accountTypes.find((item) => item.key === accountType) ?? accountTypes[0]
  const IdentifierIcon =
    identifierIcons[activeType.identifierIcon] ?? User

  const switchAccountType = (key) => {
    setAccountType(key)
    setIdentifier('')
    setPassword('')
    setError('')
  }

  const handleTabKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return

    event.preventDefault()

    const direction = event.key === 'ArrowRight' ? 1 : -1
    const nextIndex =
      (index + direction + accountTypes.length) % accountTypes.length

    switchAccountType(accountTypes[nextIndex].key)
    tabRefs.current[nextIndex]?.focus()
  }

  const fillDemoAccount = () => {
    setIdentifier(activeType.demo.identifier)
    setPassword(activeType.demo.password)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login({
        identifier: identifier.trim(),
        password,
        role: activeType.key,
        remember,
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
        to="/"
        className={
          'absolute top-5 left-5 z-10 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-emerald-800 sm:top-7 sm:left-8 ' +
          focusRing
        }
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Beranda
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
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-lg shadow-emerald-900/10 ring-1 ring-emerald-100">
                  <ShieldCheck aria-hidden="true" className="h-6 w-6" />
                </span>

                <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
                  Masuk ke SIPM
                </h1>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
                  Sistem Informasi Pengaduan Mahasiswa PSDKU Tanah Datar. Gunakan
                  akun resmi kampus Anda untuk melanjutkan.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Jenis akun"
                className={
                  depthRaised +
                  ' relative mt-8 grid grid-cols-2 gap-1 rounded-xl bg-slate-200/70 p-1.5'
                }
              >
                {accountTypes.map((item, index) => {
                  const Icon = tabIcons[item.icon]
                  const isActive = item.key === accountType

                  return (
                    <button
                      key={item.key}
                      ref={(node) => {
                        tabRefs.current[index] = node
                      }}
                      type="button"
                      role="tab"
                      id={`tab-${item.key}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${item.key}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => switchAccountType(item.key)}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                      className={
                        'flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 motion-reduce:transition-none ' +
                        focusRing +
                        ' ' +
                        (isActive
                          ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5'
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
                className="relative mt-8"
                noValidate
              >
                {error && (
                  <div
                    id={errorId}
                    role="alert"
                    className="mb-6 flex gap-3 rounded-xl border border-rose-200 bg-rose-50/90 px-4 py-3"
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

                <div className={depthRaised}>
                  <label
                    htmlFor={identifierId}
                    className="sr-only"
                  >
                    {activeType.identifierLabel}
                  </label>
                  <div className="relative">
                    <IdentifierIcon
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-500"
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
                        'block w-full rounded-xl bg-slate-100/90 py-3.5 pr-4 pl-11 text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-500 hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none motion-reduce:transition-none ' +
                        focusRing
                      }
                    />
                  </div>
                </div>

                <div className={depthRaised + ' mt-4'}>
                  <label htmlFor={passwordId} className="sr-only">
                    Kata sandi
                  </label>
                  <div className="relative">
                    <Lock
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-500"
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
                        'block w-full rounded-xl bg-slate-100/90 py-3.5 pr-12 pl-11 text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-500 hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none motion-reduce:transition-none ' +
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
                        'absolute inset-y-0 right-2 flex items-center rounded-lg px-2.5 text-slate-500 transition-colors duration-200 hover:text-slate-800 ' +
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

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id={rememberId}
                      name="remember"
                      type="checkbox"
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                      className={
                        'h-4 w-4 cursor-pointer rounded accent-emerald-600 ' +
                        focusRing
                      }
                    />
                    <label
                      htmlFor={rememberId}
                      className="ml-2.5 cursor-pointer text-sm text-slate-700 select-none"
                    >
                      Ingat saya
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={fillDemoAccount}
                    className={
                      'inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-emerald-700 transition-colors duration-200 hover:text-emerald-800 ' +
                      focusRing
                    }
                  >
                    <FlaskConical aria-hidden="true" className="h-3.5 w-3.5" />
                    Akun demo
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className={
                    depthTop +
                    ' mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 ease-out hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-700/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:[transform:translateZ(48px)] ' +
                    focusRing
                  }
                >
                  {submitting ? (
                    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                  ) : null}
                  {submitting ? 'Memproses...' : 'Masuk'}
                </button>
              </form>

              <div className="mt-8 flex items-center gap-4">
                <span className={dottedLine} />
                <span className="text-xs font-medium text-slate-500">atau</span>
                <span className={dottedLine} />
              </div>

              <Link
                to="/"
                className={
                  'mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200/80 bg-emerald-50/70 px-4 py-3 text-sm font-medium text-emerald-800 transition-colors duration-200 hover:bg-emerald-100/80 ' +
                  focusRing
                }
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Kembali ke beranda
              </Link>

              <p className="mt-6 text-center text-xs leading-relaxed text-slate-600">
                Belum dapat masuk? Hubungi petugas PPKPT PSDKU Tanah Datar untuk
                aktivasi akun atau pengaturan ulang kata sandi.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}