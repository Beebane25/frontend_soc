# 🛡️ Mini SOC Dashboard (Full Functioning Web App)

Mini SOC Dashboard adalah aplikasi berbasis web yang dirancang untuk membantu tim keamanan dalam **memantau keamanan sistem secara real-time**.  
Proyek ini dibangun dengan **Python Django REST API** sebagai backend dan **React.js** sebagai frontend.

---

## Deskripsi
Proyek ini dibuat sebagai bagian dari **Capstone Project**, dengan tujuan:
- Menyediakan platform monitoring sederhana seperti **SOC (Security Operation Center)** mini.
- Memberikan visualisasi data keamanan (alert, log, aktivitas user).
- Memberikan gambaran nyata bagaimana aplikasi **frontend ↔ backend ↔ database** saling terhubung.

---

## Arsitektur Sistem
flowchart LR :
- User[👤 User] --> |HTTP/HTTPS| Frontend[🌐 React.js Frontend]
- Frontend --> |REST API| Backend[⚙️ Django REST API]
- Backend --> |SQL Query| Database[(🗄️ PostgreSQL/MySQL)]

---

## Fitur Utama (Frontend)

* Dashboard responsif dengan layout modern (cards, tabel, badges).
* Visualisasi: Pie chart untuk distribusi severity & Bar chart untuk jumlah event per tipe (menggunakan Recharts).
* Pencarian (search) realtime pada logs.
* Filter sederhana dan highlight severity.
* Pagination & loading state (opsional, cocok untuk dataset besar).
* Mudah dikonfigurasi via `REACT_APP_API_URL` (atau `NEXT_PUBLIC_API_URL` untuk Next.js).

---

## Teknologi yang Digunakan

* React (Create React App atau Vite) atau Next.js
* TailwindCSS untuk styling
* Recharts untuk charting (Pie/Bar)
* Axios / fetch API untuk komunikasi ke backend
* Vercel / Netlify untuk deployment frontend

---

## Struktur Repository (contoh)

```
frontend/                    # repo frontend (GitHub)
├─ src/
│  ├─ components/
│  │  ├─ ui/                 # komponen dasar (Card, Badge, Input, Button, Table, Avatar)
│  │  ├─ charts/             # komponen grafik (SeverityPieChart.jsx, EventBarChart.jsx)
│  │  └─ LogsTable.jsx       # komponen utama tabel & integrasi chart
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ index.css              # import tailwind
│  └─ App.css
├─ public/
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ vite.config.js / next.config.js
```

---

## Setup & Instalasi (Vite + React contoh)

1. Clone repository frontend:

```bash
git clone https://github.com/username/frontend-soc-dashboard.git
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Pastikan Tailwind dikonfigurasi (`tailwind.config.js` "content" mengarah ke `./src/**/*.{js,jsx}`) dan `index.css` berisi:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Atur environment variable di file `.env` (jangan commit file ini):

```
VITE_API_URL=https://your-django-api.example.com/api
# atau untuk CRA: REACT_APP_API_URL=...
# untuk Next.js: NEXT_PUBLIC_API_URL=...
```

5. Run development server:

```bash
npm run dev    # Vite
# or
npm start      # CRA
```

Akses: `http://localhost:5173` (Vite) atau `http://localhost:3000` (CRA)

---

## Cara Build & Deploy ke Vercel

1. Buat akun Vercel dan hubungkan repo GitHub kamu.
2. Pada dashboard Vercel, pilih `Import Project` → pilih repo frontend.
3. Setup Environment Variable pada Vercel Project Settings (Environment Variables):

   * `VITE_API_URL` = `https://{your-backend-url}/api` (Production)
   * Jika pakai CRA/Gatsby/Next gunakan `REACT_APP_API_URL` atau `NEXT_PUBLIC_API_URL` sesuai framework.
4. Build Command biasanya otomatis (`npm run build`).
5. Deploy — Vercel akan menjalankan build dan menyediakan URL produksi.

**Catatan:** Jika menggunakan Vite, pastikan `vite.config.js` memiliki alias `@` jika kamu memakai import alias (`@/components/...`). Contoh:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
```

---

## Komponen Kunci & Penjelasan Singkat

* `src/components/ui/*` — Komponen presentasional: Card, Badge, Input, Button, Table, Avatar. Pastikan file-file ini ada agar import di `App.jsx` tidak error saat build.
* `src/components/charts/SeverityPieChart.jsx` — Komponen PieChart (menggunakan Recharts). Input: array `{ name, value }`.
* `src/components/charts/EventBarChart.jsx` — Komponen BarChart. Input: array `{ event, count }`.
* `src/LogsTable.jsx` (atau `App.jsx`) — Mengatur fetch data dari API, filter, pagination, dan render chart + tabel.

---

## Best Practices & Troubleshooting

* **Tailwind tidak muncul / styling polos**:

  * Periksa `tailwind.config.js` `content` path.
  * Pastikan `index.css` berisi `@tailwind` directives.
  * Restart dev server setelah perubahan.

* **Import alias `@` error saat build**:

  * Pastikan `vite.config.js` (atau `jsconfig.json`/`tsconfig.json` untuk CRA/Next) punya alias yang sesuai.

* **Missing component file (ENONENT)**:

  * Jika build gagal karena file `src/components/ui/badge.jsx` tidak ditemukan, buat file tersebut—jangan import komponen yang tidak ada.

* **CORS / API unreachable**:

  * Pastikan backend (Django API) mengizinkan origin dari frontend (atur `CORS_ALLOWED_ORIGINS`/`django-cors-headers`).

* **Charts tidak tampil**:

  * Pastikan `recharts` sudah terinstall (`npm i recharts`) dan data yang dikirim ke chart bukan `undefined`.

---

## Testing & QA

* Gunakan data dummy (fixture) di backend untuk memverifikasi tampilan.
* Periksa responsive pada perangkat mobile/desktop.
* Uji environment variable produksi di Vercel (pastikan API URL benar dan reachable).

---

## Hasil Pada Frontend

🚀 [Buka Aplikasi Mini SOC Dashboard](https://frontend-soc.vercel.app/)
