# 📄 Product Requirement Document (PRD)
**Nama Produk:** SIPM (Sistem Informasi Pengaduan Mahasiswa) Politeknik Negeri Padang PSDKU Tanah Datar  
**Versi:** 1.0.0  
**Tanggal:** 14 Oktober 2026  
**Tim Pengembang:** Kelompok 1 (Abdul Hadi, Muhammad Syaiful, Rahmatul Fadillah, Suci Ramdha Joenedy)  
**Sponsor & Pemilik Sistem:** Satgas PPKPT PSDKU Tanah Datar  

---

## 1. Ringkasan Eksekutif & Latar Belakang
Selama ini pengaduan mahasiswa PSDKU Tanah Datar disampaikan secara lisan, pesan pribadi, atau media sosial. Hal ini mengakibatkan aduan mudah terlewat, sulit dilacak, dan kerahasiaan identitas pelapor tidak terjamin.

**SIPM** dibangun sebagai aplikasi web responsif terpusat. Sistem ini memberikan wadah aman bagi mahasiswa untuk melapor (termasuk opsi anonim) serta memfasilitasi Satgas PPKPT dalam mengelola, membalas, mendisposisikan aduan ke unit kampus, dan melakukan rekapitulasi data.

---

## 2. Tujuan & Kriteria Keberhasilan (Success Metrics)
* **Penyimpanan Terpusat:** 100% aduan masuk dan tersimpan dalam satu sistem.
* **Respon Cepat:** Respon awal dari Satgas PPKPT maks. **3 hari kerja** per aduan.
* **Eskalasi Otomatis/Sistemik:** Apabila aduan belum direspon lokal dalam 3 hari kerja, sistem memicu notifikasi dan opsi bagi pelapor untuk mengeskalasi laporan ke Satgas PPKPT Pusat.
* **Perlindungan Anonimitas:** Identitas pelapor anonim dienkripsi/disembunyikan secara ketat pada level aplikasi dan basis data dari pihak tak berhak.
* **Akses Tepat:** Hanya mahasiswa aktif PSDKU Tanah Datar (validasi NIM) yang dapat membuat laporan.

---

## 3. Peran Pengguna & Spesifikasi Fitur

### A. Peran Pengguna (User Roles)
1. **Mahasiswa (Pelapor):** Login menggunakan NIM dan kata sandi.
2. **Admin Satgas PPKPT (Lokal):** Verifikasi laporan, membalas, mendisposisi aduan, dan melihat analitik rekap.
3. **Pembina Kemahasiswaan / Unit Kampus:** Penerima rekap/laporan serta disposisi penanganan aduan sesuai bidangnya.

### B. Spesifikasi Modul Fitur

| ID Modul | Nama Modul | Deskripsi Fitur & Aturan Bisnis |
| :--- | :--- | :--- |
| **MOD-01** | **Autentikasi & Hak Akses** | • Login Mahasiswa berbasis NIM & Password.<br>• Login Admin/Satgas berbasis Email/Username & Password.<br>• Role-Based Access Control (RBAC) ketat via JWT / Sanctum tokens.<br>• Pemisahan tegas antara akses Mahasiswa dan Admin. |
| **MOD-02** | **Formulir Pengaduan** | • Form input aduan: Judul, Deskripsi, Kategori (*Fasilitas*, *Akademik*, *Kekerasan & Perundungan*).<br>• Toggle Mode Pelaporan: **Publik / Tampilkan Nama** vs **Anonim**.<br>• Upload Bukti Pendukung (Foto/Dokumen, format `.jpg`, `.png`, `.pdf`, max 5MB). |
| **MOD-03** | **Pelacakan Status (Tracking)** | • Timeline status aduan: `Terkirim` ➔ `Sedang Diproses Satgas` ➔ `Disposisi` ➔ `Selesai`.<br>• Histori tanggapan/balasan antara Satgas dan Pelapor.<br>• Opsi **Eskalasi ke Pusat** otomatis aktif jika belum ada respon lokal > 3 hari kerja. |
| **MOD-04** | **Dashboard Admin Satgas** | • Filter & pencarian aduan berdasarkan status, kategori, dan tanggal.<br>• Fitur membaca aduan, memberi balasan/tanggapan, dan merubah status.<br>• Fitur **Disposisi Aduan** ke Unit Kampus terkait. |
| **MOD-05** | **Notifikasi Email** | • Pengiriman notifikasi email via **Gmail SMTP** saat ada pembaruan status aduan atau balasan baru dari Satgas. |
| **MOD-06** | **Rekap & Analitik Grafik** | • Visualisasi grafik statistik aduan masuk vs selesai.<br>• Rekap persentase kategori aduan (Fasilitas, Akademik, Perundungan) untuk laporan ke Pembina Kemahasiswaan. |

---

## 4. Tech Stack & Arsitektur Sistem

Sistem dikembangkan dengan pemisahan **Backend (REST API)** dan **Frontend (Single Page Application - SPA)**.

```
┌────────────────────────────────┐         ┌────────────────────────────────┐
│   Frontend (React + Vite)      │         │   Backend (Laravel REST API)   │
│  - Tailwind CSS                │  HTTP   │  - Laravel Sanctum (Auth)      │
│  - Axios / React Query         │ ──────> │  - Eloquent ORM                │
│  - Lucide Icons / Chart.js     │ <────── │  - Mailer (Gmail SMTP)         │
└────────────────────────────────┘  JSON   └───────────────┬────────────────┘
                                                           │
                                                           ▼
                                                ┌──────────────────────┐
                                                │ MySQL Database       │
                                                └──────────────────────┘
```

* **Backend Framework:** Laravel (PHP 8.x)
  * **Authentication:** Laravel Sanctum (Token-based API Authentication)
  * **Mailer:** Laravel Mail Engine (Integrated with Gmail SMTP)
  * **ORM & Database:** Eloquent ORM dengan RDBMS MySQL
* **Frontend Framework:** React.js (Vite Bundle Engine)
  * **State & Data Fetching:** Axios / TanStack React Query
  * **Styling & UI:** Tailwind CSS (Responsif Mobile & Desktop)
  * **Charts:** Chart.js / Recharts (Visualisasi Statistik Rekap)
* **Server & Deployment Infrastructure:**
  * **Server Environment:** VPS Linux (Ubuntu Server)
  * **Web Server / Reverse Proxy:** NGINX
  * **Security & SSL:** Let's Encrypt SSL Certificate
  * **Domain:** Custom Domain

---

## 5. Arsitektur Basis Data (Relational Schema Overview)

1. **`users`**: `id`, `nim_or_nip`, `name`, `email`, `password`, `role` (`mahasiswa`, `satgas`, `pembina`, `unit`), `created_at`
2. **`complaints` (aduan)**: `id`, `user_id` (nullable/encrypted jika anonim), `ticket_code`, `title`, `description`, `category` (`fasilitas`, `akademik`, `kekerasan_perundungan`), `is_anonymous` (boolean), `status` (`terkirim`, `diproses`, `disposisi`, `selesai`), `escalated_to_center` (boolean), `created_at`, `updated_at`
3. **`complaint_attachments`**: `id`, `complaint_id`, `file_path`, `file_type`, `created_at`
4. **`complaint_responses`**: `id`, `complaint_id`, `user_id`, `response_text`, `created_at`
5. **`dispatches` (disposisi)**: `id`, `complaint_id`, `unit_name`, `notes`, `dispatched_at`

> **Skema Keamanan Anonimitas:**
> Ketika `is_anonymous = true`, API Laravel akan menyembunyikan field `user_id` dan data personal pengguna pada payload response JSON yang dikirimkan ke frontend Admin Satgas.

---

## 6. Tahapan Pengerjaan (Roadmap & Implementation Steps)

Sesuai dengan alokasi **WBS dan Milestone Proyek (Oktober – Desember 2026)**:

```
[Okt Minggu 1-2] ──► [Okt Minggu 3-5] ──► [Nov Minggu 6-7] ──► [Nov Minggu 8] ──► [Desember]
 Inisiasi & Desain      Fitur Inti         Fitur Pendukung       Pengujian          Deployment
```

### Tahap 1: Inisiasi & Perancangan Sistem (Minggu 1 - 2 | Okt 2026)
1. **Analisis Kebutuhan:** Finalisasi fungsionalitas dan validasi bersama Satgas PPKPT.
2. **Desain UI/UX:** Pembuatan wireframe dan prototipe interaktif antarmuka Mahasiswa dan Admin (Figma).
3. **Perancangan Basis Data & Keamanan:** Penyusunan ERD, perancangan skema DB MySQL, serta arsitektur enkripsi data pelapor anonim.

### Tahap 2: Pengembangan Fitur Inti / Core Development (Minggu 3 - 5 | 21 Okt - 4 Nov 2026)
1. **Setup Environment & Backend Boilerplate:**
   * Inisialisasi REST API Laravel, migrasi basis data, dan konfigurasi Laravel Sanctum.
2. **Frontend Setup:**
   * Inisialisasi React + Vite, konfigurasi Tailwind CSS, dan komponen layout dasar.
3. **Modul Autentikasi (MOD-01):** API Login NIM/Password dan penanganan JWT/Token di React.
4. **Modul Formulir Aduan & Upload Bukti (MOD-02):**
   * Form pengaduan React dengan penanganan file upload.
   * Controller API Laravel untuk menyimpan aduan dan media attachment.
5. **Modul Pelacakan Status & Eskalasi (MOD-03):** Halaman status aduan dan logic pengecekan batas 3 hari kerja untuk opsi eskalasi.
6. **Dashboard Satgas PPKPT (MOD-04):** Antarmuka baca aduan, respon/balas, ubah status, dan disposisi.

### Tahap 3: Pengembangan Fitur Pendukung (Minggu 6 - 7 | 11 - 18 Nov 2026)
1. **Modul Notifikasi Gmail (MOD-05):**
   * Integrasi Laravel Mailer dengan Gmail SMTP.
   * Pemicu email otomatis saat Satgas memberikan respon atau perubahan status.
2. **Modul Rekap & Grafik (MOD-06):**
   * API agregasi data statistik aduan.
   * Integrasi library chart (misal Chart.js) di dashboard React.

### Tahap 4: Pengujian & Quality Assurance (Minggu 7 - 8 | s.d. 25 Nov 2026)
1. **Pengujian Fungsional:** Testing aliran aplikasi dari pembuatan aduan hingga penyelesaian.
2. **Pengujian Keamanan:** Pentest sederhana untuk memastikan kerahasiaan identitas anonim dan proteksi dari hak akses terlarang.
3. **Uji Coba Pengguna (UAT):** Simulasi penggunaan sistem bersama pihak Satgas PPKPT dan perbaikan *feedback*.

### Tahap 5: Deployment, Implementasi, & Serah Terima (Desember 2026)
1. **Server Setup:** Konfigurasi VPS Linux, web server NGINX, dan basis data MySQL.
2. **Deployment Backend & Frontend:** Deploy API Laravel & build statis React SPA.
3. **Domain & SSL:** Konfigurasi Custom Domain dan pemasangan SSL Let's Encrypt gratis.
4. **Dokumentasi & Serah Terima:** Penyusunan Panduan Pengguna (User Manual) dan penandatanganan Berita Acara Serah Terima dengan Satgas PPKPT.