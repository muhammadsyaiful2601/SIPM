import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <FileQuestion className="h-12 w-12 text-emerald-600" />
      <h1 className="mt-4 text-3xl font-bold text-slate-800">404</h1>
      <p className="mt-2 text-slate-500">
        Halaman yang Anda cari tidak ditemukan.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Kembali ke Beranda
      </Link>
    </div>
  )
}