import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { LogOut, ShieldCheck } from 'lucide-react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { focusRing } from '../lib/ui'

export default function DashboardPage() {
  const { user, logout, isSatgas } = useAuth()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await api.get('/auth/me')
      return response.data.user
    },
    enabled: false,
  })

  const profile = data ?? user

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className={'flex items-center gap-2 rounded-lg ' + focusRing}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-bold text-slate-900">
                SIPM
              </span>
              <span className="block text-[11px] text-slate-600">
                {profile.role_label}
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className={
              'inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 ' +
              focusRing
            }
          >
            <LogOut aria-hidden="true" className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Halo, {profile.name}
        </h1>
        <p className="mt-2 text-slate-600">
         Anda masuk sebagai {profile.role_label}.
        </p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'NIM/NIP', value: profile.nim_or_nip ?? '-' },
            { label: 'Email', value: profile.email ?? '-' },
            { label: 'Peran', value: profile.role_label },
            {
              label: 'Modul Berikutnya',
              value: isSatgas ? 'Dashboard Admin (MOD-04)' : 'Form Aduan (MOD-02)',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <dt className="text-xs font-semibold tracking-wide text-slate-600 uppercase">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-sm font-bold text-slate-900">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </main>
    </div>
  )
}