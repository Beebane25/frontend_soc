Mini SOC Dashboard — Frontend (React + Vite)

Frontend untuk Capstone Mini SOC Dashboard — menampilkan log keamanan dalam tabel, grafik analitik (pie & bar), search/filter, dan UI modern menggunakan TailwindCSS + komponen UI sederhana.

🔎 Ringkasan

Framework: React (Vite)

Styling: TailwindCSS

Charts: Recharts

UI: komponen lokal di src/components/ui/

API: konsumsi Django REST API (backend) — set alamat di env VITE_API_URL

Deployment: Vercel (direkomendasikan) / Netlify

📁 Struktur Proyek (inti)
frontend-vite/
├─ src/
│  ├─ components/
│  │  ├─ ui/
│  │  │  ├─ card.jsx
│  │  │  ├─ badge.jsx
│  │  │  ├─ input.jsx
│  │  │  ├─ button.jsx
│  │  │  ├─ table.jsx
│  │  │  └─ avatar.jsx
│  │  ├─ charts/
│  │  │  ├─ SeverityPieChart.jsx
│  │  │  └─ EventBarChart.jsx
│  │  └─ LogsTable.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ index.css
│  └─ App.css
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ vite.config.js
└─ .env

⚙️ Requirement / Tech Stack

Node.js >= 18

npm / yarn

Vite + React

TailwindCSS

Recharts

🚀 Install & Run (Local)

Clone repo frontend:

git clone <your-frontend-repo>
cd frontend-vite


Install dependencies:

npm install
# or
yarn


Buat file .env di root (di dev gunakan Vite prefix VITE_):

VITE_API_URL=https://your-django-api.example.com/api


Jalankan development server:

npm run dev
# or
yarn dev


Buka http://localhost:5173 (default Vite) — seharusnya dashboard muncul.

🧩 Penting — Tailwind & Vite Config

Pastikan tailwind.config.js punya content yang benar:

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};


index.css (atau src/index.css) minimal:

@tailwind base;
@tailwind components;
@tailwind utilities;


Tambahkan alias @ agar import @/components/... bekerja (vite.config.js):

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

🧱 Komponen UI — wajib ada

Untuk menghindari build error di Vercel, pastikan folder src/components/ui/ berisi file-file berikut (contoh minimal sudah dibuat di repo):

card.jsx — card wrapper with Tailwind classes

badge.jsx — small badge component

input.jsx — styled input

button.jsx — styled button

table.jsx — reusable table helpers (optional)

avatar.jsx — avatar image component

Jika kamu copy-paste komponen yang saya berikan sebelumnya, imports seperti:

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";


akan tersedia dan build Vercel tidak error.

📊 Komponen Charts

Folder src/components/charts/ berisi:

SeverityPieChart.jsx — PieChart untuk distribusi severity (Recharts)

EventBarChart.jsx — BarChart untuk jumlah event per type

Contoh pemakaian di App.jsx:

import SeverityPieChart from "@/components/charts/SeverityPieChart";
import EventBarChart from "@/components/charts/EventBarChart";

<SeverityPieChart data={severityData} />
<EventBarChart data={eventData} />

✅ Scripts (package.json)

Pastikan package.json memiliki skrip standar:

"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}


Untuk deploy ke Vercel, Vercel akan menjalankan npm run build dan publish folder dist.

🚀 Deploy ke Vercel (singkat)

Push repo ke GitHub.

Login ke Vercel → Import Project → pilih repo.

Set Build Command: npm run build
Output Directory: dist

Tambahkan Environment Variable di Vercel:

VITE_API_URL = https://your-django-api-url/...

Deploy.

Catatan: gunakan VITE_ prefix untuk Vite env. Jangan commit .env ke repo.

🐞 Troubleshooting (sering muncul)

Tampilan polos (Tailwind tidak aktif)

Pastikan @tailwind berada di index.css dan file tersebut diimport di main.jsx/App.jsx.

Pastikan tailwind.config.js content mencakup ./src/**/*.{js,jsx}.

Build gagal karena module not found (@/components/ui/...)

Periksa file ada di path src/components/ui/... dan vite.config.js alias @ benar.

Pastikan case-sensitive filenames match imports.

Charts tidak tampil / error on build

Pastikan recharts terinstall: npm install recharts

Create chart components in src/components/charts/ and import them properly.

CORS/403 errors saat fetch API

Pastikan backend mengizinkan origin frontend (CORS). Untuk testing, gunakan django-cors-headers atau set header di backend.

🔐 Keamanan / Production tips

Jangan letakkan API keys di frontend env (Vite env visible ke browser).

Gunakan authentication & role-based access di backend (JWT/session).

Rate-limit API endpoints (backend) agar frontend tidak menjadi vector DDoS.

📎 Contoh .gitignore (essentials)
node_modules
dist
.env
.vscode
.DS_Store
