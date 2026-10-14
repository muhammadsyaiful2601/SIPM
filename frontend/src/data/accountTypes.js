const accountTypes = [
  {
    key: 'mahasiswa',
    label: 'Mahasiswa',
    icon: 'graduation',
    identifierLabel: 'NIM',
    identifierPlaceholder: '2210112345',
    identifierType: 'text',
    inputMode: 'numeric',
    autoComplete: 'username',
    identifierIcon: 'user',
    helper: 'Gunakan NIM aktif yang terdaftar di PSDKU Tanah Datar.',
    demo: { identifier: '2210112345', password: 'password' },
  },
  {
    key: 'staf',
    label: 'Staf',
    icon: 'staff',
    identifierLabel: 'Email Institutional',
    identifierPlaceholder: 'nama@psdku-tanahdatar.ac.id',
    identifierType: 'email',
    inputMode: 'email',
    autoComplete: 'email',
    identifierIcon: 'mail',
    helper: 'Untuk Admin PPKPT, Pembina Kemahasiswaan, dan Unit Kampus.',
    demo: {
      identifier: 'satgas@psdku-tanahdatar.ac.id',
      password: 'password',
    },
  },
]

export default accountTypes