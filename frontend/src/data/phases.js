const phases = [
  {
    id: 1,
    label: 'Lapor',
    summary: 'Mahasiswa mengirim aduan beserta bukti pendukung.',
    tone: 'emerald',
    checkpoints: [
      {
        title: 'Masuk dengan NIM',
        description: 'Validasi NIM aktif PSDKU Tanah Datar.',
      },
      {
        title: 'Tulis pengaduan',
        description: 'Kategori, judul, deskripsi, dan bukti.',
      },
      {
        title: 'Pilih mode anonim',
        description: 'Nama ditampilkan atau disembunyikan.',
      },
    ],
    gate: 'Anda mengirim',
  },
  {
    id: 2,
    label: 'Proses',
    summary: 'Satgas PPKPT memverifikasi, membalas, lalu mendisposisi.',
    tone: 'amber',
    checkpoints: [
      {
        title: 'Verifikasi laporan',
        description: 'Satgas memastikan aduan sah dan lengkap.',
      },
      {
        title: 'Tawab balasan',
        description: 'Pelapor menerima tanggapan awal.',
      },
      {
        title: 'Disposisi ke unit',
        description: 'Diteruskan ke unit yang menangani.',
      },
    ],
    gate: 'Anda menyetujui',
  },
  {
    id: 3,
    label: 'Tindak lanjut',
    summary: 'Unit kampus memperbaiki, lalu aduan ditutup.',
    tone: 'sky',
    checkpoints: [
      {
        title: 'Pelaksanaan perbaikan',
        description: 'Unit melaporkan hasil pengerjaan.',
      },
      {
        title: 'Rekap dan statistik',
        description: 'Data agregat untuk laporan kampus.',
      },
      {
        title: 'Aduan selesai',
        description: 'Pelapor menerima pemberitahuan akhir.',
      },
    ],
    gate: 'Selesai',
  },
]

export default phases