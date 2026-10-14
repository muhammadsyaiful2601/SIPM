const lessons = [
  {
    phase: 'Modul 02',
    title: 'Formulir pengaduan beserta unggah bukti',
    description:
      'Mahasiswa mengisi judul, deskripsi, dan kategori aduan, lalu melampirkan foto atau dokumen sebagai bukti pendukung.',
    command: '/pengaduan/buat',
    labels: ['Pilih kategori', 'Unggah bukti', 'Mode anonim'],
    steps: [
      'Kategori fasilitas, akademik, atau kekerasan dan perundungan.',
      'Maksimal 5 MB dengan format JPG, PNG, atau PDF.',
      'Nama ditampilkan atau disembunyikan sesuai pilihan Anda.',
    ],
  },
  {
    phase: 'Modul 04',
    title: 'Dashboard admin petugas',
    description:
      'Petugas memfilter aduan berdasarkan status, kategori, dan tanggal, lalu membalas, mengubah status, dan mendisposisikan.',
    command: '/dashboard/satgas',
    labels: ['Filter aduan', 'Balas pelapor', 'Disposisi unit'],
    steps: [
      'Cari aduan berdasarkan status, kategori, dan tanggal.',
      'Tulis tanggapan dan perbarui status aduan.',
      'Kirim ke unit kampus atau Pembina Kemahasiswaan.',
    ],
  },
  {
    phase: 'Modul 06',
    title: 'Rekap dan analitik grafik',
    description:
      'Statistik aduan masuk dibanding selesai serta rekap persentase kategori disiapkan untuk laporan satuan.',
    command: '/rekap/statistik',
    labels: ['Grafik bulanan', 'Persentase kategori', 'Ekspor laporan'],
    steps: [
      'Grafik aduan masuk versus selesai.',
      'Persentase kategori aduan per periode.',
      'Rekap siap dilaporkan ke Pembina Kemahasiswaan.',
    ],
  },
]

export default lessons