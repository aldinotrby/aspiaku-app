# 🚀 Cara Menjalankan Aplikasi AspiAKU

Panduan lengkap untuk menjalankan aplikasi AspiAKU Frontend di lingkungan development dan production.

## 📋 Prasyarat

Pastikan sistem Anda telah terinstall:

### Node.js & npm
- **Node.js**: versi 18.0.0 atau lebih baru
- **npm**: versi 9.0.0 atau lebih baru

**Cek versi yang terinstall:**
```powershell
node --version
npm --version
```

**Download Node.js:**
- Kunjungi: https://nodejs.org/
- Download versi LTS terbaru
- Install sesuai instruksi untuk Windows

### Git (Opsional)
Jika ingin clone dari repository:
```powershell
git --version
```

## 🛠️ Instalasi & Setup

### 1. Persiapan Project

**Jika menggunakan existing project:**
```powershell
# Navigasi ke folder project
cd c:\Users\Hype\aspiaku-frontend
```

**Jika clone dari repository:**
```powershell
# Clone repository
git clone <repository-url> aspiaku-frontend
cd aspiaku-frontend
```

### 2. Install Dependencies

```powershell
# Install semua dependencies
npm install
```

**Output yang diharapkan:**
```
added 234 packages, and audited 235 packages in 45s
found 0 vulnerabilities
```

### 3. Verifikasi Instalasi

```powershell
# Cek struktur project
Get-ChildItem

# Verifikasi dependencies terinstall
Test-Path "node_modules"
```

## 🎯 Menjalankan Aplikasi

### Development Mode

```powershell
# Jalankan development server
npm run dev
```

**Output yang diharapkan:**
```
> aspiaku-frontend@0.0.0 dev
> vite

  VITE v8.2.2  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

### Akses Aplikasi

1. **Browser**: Buka http://localhost:5173/
2. **Network**: Gunakan URL Network untuk akses dari device lain

### Production Build

```powershell
# Build untuk production
npm run build

# Preview build result
npm run preview
```

## 🌐 Navigasi Aplikasi

### Role Selector (Halaman Utama)
- **URL**: http://localhost:5173/
- **Deskripsi**: Pilih role untuk masuk ke aplikasi

### Citizen (Warga)
- **Login**: http://localhost:5173/auth/citizen/login
- **Register**: http://localhost:5173/auth/citizen/register
- **Dashboard**: http://localhost:5173/citizen/home

### Admin Instansi
- **Login**: http://localhost:5173/auth/admin_instansi/login
- **Dashboard**: http://localhost:5173/admin/dashboard

### Super Admin
- **Login**: http://localhost:5173/auth/super_admin/login
- **Dashboard**: http://localhost:5173/super-admin/dashboard

### Admin Server
- **Login**: http://localhost:5173/auth/admin_server/login
- **Dashboard**: http://localhost:5173/admin-server/dashboard

### Admin Sistem
- **Login**: http://localhost:5173/auth/admin_sistem/login
- **Dashboard**: http://localhost:5173/admin-sistem/dashboard

## 🧪 Testing & Quality Control

### Linting
```powershell
# Jalankan linter
npm run lint
```

### Type Checking
```powershell
# Cek TypeScript errors
npx tsc --noEmit
```

### Build Verification
```powershell
# Test build
npm run build
```

## 🔧 Development Tools

### Hot Reload
- Perubahan code otomatis ter-reload di browser
- Tidak perlu manual refresh halaman

### Development Console
- Buka browser DevTools (F12)
- Cek Console untuk error/warning
- Gunakan Network tab untuk monitor API calls

## 📱 Demo Credentials

### Citizen (Warga)
```
Email: demo@email.com
Password: password123
OTP Code: 123456 (untuk demo)
```

### Admin
```
Username: admin
Password: admin123
```

## 🚨 Troubleshooting

### Port sudah digunakan
```powershell
# Jika port 5173 sudah digunakan, Vite akan otomatis cari port lain
# Atau specify port manual:
npm run dev -- --port 3000
```

### Node Modules Error
```powershell
# Hapus node_modules dan install ulang
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Build Error
```powershell
# Clear cache dan build ulang
npx vite clean
npm run build
```

### Memory Error
```powershell
# Increase Node.js memory limit
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

## 📊 Performance Monitoring

### Bundle Analysis
```powershell
# Install bundle analyzer
npm install -D rollup-plugin-visualizer

# Generate bundle report
npm run build
# Check dist/stats.html
```

### Lighthouse Audit
1. Buka Chrome DevTools
2. Klik tab "Lighthouse"
3. Run audit untuk Performance, Accessibility, SEO

## 🔄 Update Dependencies

```powershell
# Cek outdated packages
npm outdated

# Update semua dependencies
npm update

# Update specific package
npm install package-name@latest
```

## 📁 Struktur Project

```
aspiaku-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── layouts/       # Layout components
│   │   └── shared/        # Shared components
│   ├── pages/            # Page components
│   │   ├── auth/         # Authentication pages
│   │   ├── citizen/      # Citizen pages
│   │   ├── admin/        # Admin pages
│   │   └── super-admin/  # Super admin pages
│   ├── lib/              # Utilities & types
│   └── assets/           # Images, fonts, etc
├── dist/                 # Build output
└── node_modules/         # Dependencies
```

## 🛡️ Security Notes

- Aplikasi ini adalah **demo/prototype**
- **Jangan gunakan** untuk production tanpa security review
- Semua credentials adalah **demo only**
- Data tersimpan di **local storage** browser

## 📞 Bantuan

Jika mengalami masalah:

1. **Cek Prerequisites**: Pastikan Node.js dan npm terinstall
2. **Clean Install**: Hapus node_modules dan install ulang
3. **Check Console**: Lihat error di browser DevTools
4. **Restart Server**: Hentikan (Ctrl+C) dan jalankan ulang npm run dev

---

**Status Aplikasi**: ✅ Ready to Run
**Last Updated**: $(Get-Date -Format "dd/MM/yyyy HH:mm")
**Platform**: Windows with PowerShell

# 🛠️ Fix File Duplikat - SELESAI

## Masalah yang Ditemukan:
❌ Ada file duplikat yang menyebabkan aplikasi menggunakan template React default:
- `src/App.jsx` - Template React default
- `src/App.tsx` - Aplikasi AspiAKU yang benar  
- `src/main.jsx` - Entry point salah
- `src/main.tsx` - Entry point benar

## Solusi yang Diterapkan:
✅ **Hapus file duplikat:**
- ❌ Dihapus: `src/App.jsx` (template default)
- ❌ Dihapus: `src/main.jsx` (entry point salah)
- ✅ Dipertahankan: `src/App.tsx` (aplikasi AspiAKU)
- ✅ Dipertahankan: `src/main.tsx` (entry point benar)

✅ **Perbaiki import:**
- Update `main.tsx` import ke `App.tsx` dengan eksplisit

## Hasil:
🎉 **Aplikasi sekarang menampilkan UI yang benar!**

Ketika dibuka http://localhost:5173/ akan menampilkan:
- **Role Selector** dengan 5 opsi login:
  1. 👤 **Masyarakat** - untuk warga
  2. 🏢 **Admin Instansi** - PUPR, DLH, BPBD  
  3. 🛡️ **Super Admin** - system wide
  4. 🖥️ **Admin Server** - infrastructure
  5. ⚙️ **Admin Sistem** - technical

---