import { useId, useRef, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import {
  AlertCircle,
  GraduationCap,
  Loader2,
  Mail,
  MailCheck,
  ShieldCheck,
  UserCog,
} from 'lucide-react'
import accountTypes from '../data/accountTypes'
import AuthShell from '../components/auth/AuthShell'
import { useAuth } from '../context/AuthContext'
import api from '../lib/api'
import { depthRaised, depthTop, focusRing } from '../lib/ui'

const tabIcons = {
  graduation: GraduationCap,
  staff: UserCog,
}

const identifierIcons = {
  user: UserCog,
  mail: Mail,
}

export default function ForgotPasswordPage() {
  const location = useLocation()
  const { user, initializing } = useAuth()

  const [accountType, setAccountType] = useState(
    location.state?.role === 'staf' ? 'staf' : accountTypes[0].key,
  )
  const [identifier, setIdentifier] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sentMessage, setSentMessage] = useState('')

  const tabRefs = useRef([])
  const identifierId = useId()
  const errorId = useId()

  if (!initializing && user) {
    return <Navigate to="/dashboard" replace />
  }

  const activeType =
    accountTypes.find((item) => item.key === accountType) ?? accountTypes[0]
  const IdentifierIcon = identifierIcons[activeType.identifierIcon] ?? Mail

  const switchAccountType = (key) => {
    setAccountType(key)
    setIdentifier('')
    setError('')
    setSentMessage('')
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
      const response = await api.post('/auth/forgot-password', {
        identifier: identifier.trim(),
        role: activeType.key,
      })

      setSentMessage(response.data.message)
    } catch (requestError) {
      const response = requestError.response

      setError(
        response?.data?.errors?.identifier?.[0] ??
          response?.data?.errors?.role?.[0] ??
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
      title="Lupa kata sandi"
      description="Masukkan NIM atau email terdaftar. Kami akan mengirim tautan pengaturan ulang ke email Anda."
      backTo="/login"
      backLabel="Kembali ke masuk"
    >
      {sentMessage ? (
        <div className="mt-8">
          <div
            role="status"
            className={
              depthRaised +
              ' flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-4'
            }
          >
            <MailCheck
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
            />
            <div>
              <p className="text-sm font-semibold text-emerald-900">
                Permintaan diterima
              </p>
              <p className="mt-1 text-sm leading-relaxed text-emerald-800">
                {sentMessage}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate-600">
            Tautan berlaku 60 menit. Periksa juga folder spam bila email belum
            sampai.
          </p>

          <Link
            to="/login"
            className={
              depthTop +
              ' mt-6 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 ease-out hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-700/30 motion-reduce:transition-none motion-reduce:[transform:translateZ(48px)] ' +
              focusRing
            }
          >
            Kembali ke halaman masuk
          </Link>
        </div>
      ) : (
        <>
          <div
            role="tablist"
            aria-label="Jenis akun"
            className={
              depthRaised +
              ' mt-8 grid grid-cols-2 gap-1 rounded-xl bg-slate-200/70 p-1.5'
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
              <label htmlFor={identifierId} className="sr-only">
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
              <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                {activeType.key === 'mahasiswa'
                  ? 'Tautan dikirim ke email yang terdaftar pada NIM tersebut.'
                  : 'Gunakan email institutional yang terdaftar pada akun Anda.'}
              </p>
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
              {submitting ? 'Mengirim...' : 'Kirim tautan reset'}
            </button>
          </form>
        </>
      )}

      <p className="mt-8 text-center text-xs leading-relaxed text-slate-600">
        Tidak punya akun atau NIM tidak terdaftar? Hubungi petugas PPKPT PSDKU
        Tanah Datar untuk aktivasi akun.
      </p>
    </AuthShell>
  )
}