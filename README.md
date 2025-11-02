# Safe School - Elementary School Safety Management System

![Safe School Banner](https://via.placeholder.com/1200x400/a8d8ea/8b4513?text=Safe+School+🐻)

## 📝 Deskripsi

Safe School adalah aplikasi web manajemen keamanan sekolah dasar yang dirancang khusus untuk membantu sekolah dalam memantau dan mengelola keselamatan siswa, terutama dalam hal anti-bullying. Aplikasi ini menampilkan karakter beruang yang ramah untuk menciptakan lingkungan yang nyaman bagi anak-anak SD.

## ✨ Fitur Utama

### 🏠 Landing Page
- **Halaman Depan Interaktif**: Menampilkan karakter beruang yang lucu dengan latar belakang taman yang ceria
- **Tombol MULAI dengan Suara**: Saat tombol "MULAI" diklik, akan mengeluarkan suara ceria yang menarik untuk anak SD
- **Animasi**: Beruang akan melompat saat tombol diklik
- **Pesan Anti-Bullying**: Mengajak anak-anak untuk memulai petualangan anti-bullying

### 🔐 Sistem Autentikasi
- Halaman login yang aman dan mudah digunakan
- Form yang ramah pengguna dengan validasi

### 📊 Dashboard
- **Statistik Real-time**:
  - Total Siswa
  - Insiden Aktif
  - Kasus Terselesaikan
  - Skor Keamanan
- **Tabel Insiden Terbaru**: Monitoring insiden yang terjadi
- **Quick Actions**: Akses cepat ke fitur-fitur penting

### 👥 Manajemen Siswa
- Daftar lengkap data siswa
- Filter berdasarkan kelas dan status
- Pencarian siswa
- Tracking jumlah insiden per siswa
- Aksi: Lihat detail, Edit, Hapus

### 🎨 Design Features
- **Tema Ramah Anak**: Warna-warna cerah dan ceria
- **Responsive Design**: Berfungsi di desktop, tablet, dan mobile
- **Animasi Interaktif**: Elemen bergerak untuk menarik perhatian
- **Icon yang Jelas**: Memudahkan navigasi

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### Instalasi

1. **Clone atau download project**
   ```bash
   cd "c:\Kuliah\Semester 5\Kapita Selekta Uhuy\frontend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

### Build untuk Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

## 📁 Struktur Project

```
frontend/
├── public/              # File static
├── src/
│   ├── components/      # Komponen React
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Layout.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   └── Sidebar/
│   │       ├── Sidebar.jsx
│   │       └── Sidebar.css
│   ├── pages/           # Halaman-halaman
│   │   ├── LandingPage/
│   │   │   ├── LandingPage.jsx  # Halaman depan dengan beruang
│   │   │   └── LandingPage.css
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   └── Students/
│   │       ├── Students.jsx
│   │       └── Students.css
│   ├── App.jsx          # Main App component
│   ├── App.css
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Teknologi yang Digunakan

- **React 18** - Library UI
- **React Router DOM** - Routing
- **React Icons** - Icon library
- **Vite** - Build tool
- **Web Audio API** - Untuk efek suara tombol
- **CSS3** - Styling dengan animasi

## 🎵 Fitur Suara

Saat tombol "MULAI" diklik, aplikasi menggunakan **Web Audio API** untuk menghasilkan suara "ding" yang ceria. Suara ini terdiri dari dua nada yang harmonis untuk menciptakan efek yang menyenangkan bagi anak-anak SD.

## 🔄 Navigation Flow

```
Landing Page (/)
    ↓ (Klik "MULAI")
Login Page (/login)
    ↓ (Login berhasil)
Dashboard (/app/dashboard)
    ↓
├── Students Management (/app/students)
├── Incidents (/app/incidents)
├── Reports (/app/reports)
└── Settings (/app/settings)
```

## 🎯 Target Pengguna

- **Administrator Sekolah**: Mengelola data siswa dan monitoring
- **Guru**: Melaporkan dan mengawasi insiden
- **Staff Sekolah**: Akses ke informasi keamanan

## 🌈 Warna Theme

- **Primary Color**: `#2563eb` (Blue)
- **Secondary Color**: `#10b981` (Green)
- **Warning Color**: `#f59e0b` (Orange)
- **Danger Color**: `#ef4444` (Red)
- **Success Color**: `#10b981` (Green)

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🐻 Karakter Beruang

Karakter beruang di landing page dibuat dengan CSS murni dan memiliki fitur:
- Telinga yang bulat
- Mata yang ekspresif
- Hidung yang cute
- Senyum yang ramah
- Pipi merah yang menggemaskan
- Overall/baju yang lucu
- Papan "MULAI" di depannya

## 🔮 Fitur yang Akan Datang

- [ ] Sistem notifikasi real-time
- [ ] Report generation (PDF/Excel)
- [ ] Dashboard analytics dengan grafik
- [ ] Chat/messaging system
- [ ] Mobile app version
- [ ] Multiple language support
- [ ] Dark mode
- [ ] Lebih banyak efek suara interaktif

## 📄 License

Educational Project - Safe School Elementary Reporting Website

## 👥 Contact

Untuk pertanyaan atau dukungan, silakan hubungi administrator sekolah.

---

**Made with ❤️ for Safe School Environment**

🐻 "Yuk, kita mulai petualangan anti-bullying bersama!" 🌟
