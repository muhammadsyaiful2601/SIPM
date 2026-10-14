import { useId, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UserCog,
} from 'lucide-react'
import accountTypes from '../data/accountTypes'
import AuthShell from '../components/auth/AuthShell'
import { useAuth } from '../context/AuthContext'
import { depthRaised, depthTop, focusRing } from '../lib/ui'

const tabIcons = {
  graduation: GraduationCap,
  staff: UserCog,
}

const identifierIcons = {
  user: User,
  mail: Mail,
}

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
    <AuthShell
      icon={ShieldCheck}
      title="Masuk ke SIPM"
      description="Sistem Informasi Pengaduan Mahasiswa PSDKU Tanah Datar. Gunakan akun resmi kampus Anda untuk melanjutkan."
      backTo="/"
      backLabel="Beranda"
    >

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

                  <Link
                    to="/lupa-password"
                    state={{ role: activeType.key }}
                    className={
                      'rounded-md text-sm font-medium text-emerald-700 underline-offset-4 transition-colors duration-200 hover:text-emerald-800 hover:underline ' +
                      focusRing
                    }
                  >
                    Lupa kata sandi?
                  </Link>
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

              <p className="mt-8 text-center text-xs leading-relaxed text-slate-600">
                Belum dapat masuk? Hubungi petugas PPKPT PSDKU Tanah Datar untuk
                aktivasi akun atau pengaturan ulang kata sandi.
              </p>
    </AuthShell>
  )
}