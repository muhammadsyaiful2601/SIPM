import { useId, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
} from 'lucide-react'
import AuthShell from '../components/auth/AuthShell'
import api from '../lib/api'
import { depthRaised, depthTop, focusRing } from '../lib/ui'

function strengthOf(password) {
  let score = 0

  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 1

  return score
}

const strengthLabels = ['Sangat lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat kuat']
const strengthBars = [
  'bg-rose-500',
  'bg-amber-500',
  'bg-sky-500',
  'bg-emerald-500',
  'bg-emerald-600',
]

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = searchParams.get('token') ?? ''
  const email = searchParams.get('email') ?? ''

  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const passwordId = useId()
  const confirmationId = useId()
  const errorId = useId()

  const score = strengthOf(password)
  const mismatched =
    confirmation.length > 0 && confirmation !== password

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (password !== confirmation) {
      setError('Konfirmasi kata sandi tidak cocok.')
      return
    }

    setSubmitting(true)

    try {
      await api.post('/auth/reset-password', {
        token,
        email,
        password,
        password_confirmation: confirmation,
      })

      setDone(true)
    } catch (requestError) {
      const response = requestError.response

      setError(
        response?.data?.errors?.password?.[0] ??
          response?.data?.errors?.email?.[0] ??
          response?.data?.errors?.token?.[0] ??
          response?.data?.message ??
          'Terjadi kesalahan. Silakan minta tautan baru.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const invalidLink = !token || !email

  if (invalidLink && !done) {
    return (
      <AuthShell
        icon={KeyRound}
        title="Tautan tidak lengkap"
        description="Buka tautan pengaturan ulang kata sandi langsung dari email yang kami kirim."
        backTo="/lupa-password"
        backLabel="Minta tautan baru"
      >
        <Link
          to="/lupa-password"
          className={
            depthTop +
            ' mt-8 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 ease-out hover:bg-emerald-700 hover:shadow-xl motion-reduce:transition-none motion-reduce:[transform:translateZ(48px)] ' +
            focusRing
          }
        >
          Minta tautan pengaturan ulang
        </Link>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      icon={KeyRound}
      title={done ? 'Kata sandi diperbarui' : 'Atur kata sandi baru'}
      description={
        done
          ? 'Silakan masuk menggunakan kata sandi yang baru saja Anda buat.'
          : 'Buat kata sandi baru yang minimal 8 karakter dan mudah Anda ingat.'
      }
      backTo="/login"
      backLabel="Kembali ke masuk"
    >
      {done ? (
        <div className="mt-8">
          <div
            role="status"
            className={
              depthRaised +
              ' flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-4'
            }
          >
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
            />
            <div>
              <p className="text-sm font-semibold text-emerald-900">
                Berhasil
              </p>
              <p className="mt-1 text-sm leading-relaxed text-emerald-800">
                Kata sandi Anda sudah diganti. Semua sesi aktif pada akun ini
                telah dikeluarkan.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/login', { replace: true })}
            className={
              depthTop +
              ' mt-6 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 ease-out hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-700/30 motion-reduce:transition-none motion-reduce:[transform:translateZ(48px)] ' +
              focusRing
            }
          >
            Masuk sekarang
          </button>
        </div>
      ) : (
        <form
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
              htmlFor={passwordId}
              className="block text-sm font-medium text-slate-900"
            >
              Kata sandi baru
            </label>
            <div className="relative mt-2.5">
              <Lock
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-500"
              />
              <input
                id={passwordId}
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-describedby="indicator-kekuatan"
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

            <div id="indicator-kekuatan" className="mt-3">
              <div className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2, 3].map((index) => (
                  <span
                    key={index}
                    className={
                      'h-1.5 flex-1 rounded-full transition-colors duration-200 ' +
                      (password.length > 0 && index < score
                        ? strengthBars[score]
                        : 'bg-slate-200')
                    }
                  />
                ))}
              </div>
              <p className="mt-1.5 text-xs text-slate-600">
                {password.length > 0
                  ? `Kekuatan: ${strengthLabels[score]}`
                  : 'Gunakan minimal 8 karakter, campur huruf dan angka.'}
              </p>
            </div>
          </div>

          <div className={depthRaised + ' mt-6'}>
            <label
              htmlFor={confirmationId}
              className="block text-sm font-medium text-slate-900"
            >
              Konfirmasi kata sandi
            </label>
            <div className="relative mt-2.5">
              <Lock
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-500"
              />
              <input
                id={confirmationId}
                name="password_confirmation"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                aria-invalid={mismatched}
                className={
                  'block w-full rounded-xl bg-slate-100/90 py-3.5 pr-4 pl-11 text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-500 hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none motion-reduce:transition-none ' +
                  focusRing
                }
              />
            </div>
            {mismatched && (
              <p className="mt-2 text-xs text-rose-700">
                Konfirmasi kata sandi tidak cocok.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || mismatched}
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
            {submitting ? 'Menyimpan...' : 'Simpan kata sandi baru'}
          </button>
        </form>
      )}
    </AuthShell>
  )
}