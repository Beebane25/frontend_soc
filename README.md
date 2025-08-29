# 🛡️ Mini SOC Dashboard

**Mini SOC Dashboard** adalah aplikasi fullstack sederhana untuk monitoring event keamanan (logs/security events). Proyek ini menggunakan **Django + Django REST Framework** untuk backend API dan **React + Tailwind + Recharts** untuk frontend. Terdapat contoh cara deploy ke Railway (backend) dan Vercel (frontend).

---

## 🚀 Ringkasan

* **Backend:** Django REST API (model `Log`, endpoints CRUD + statistik)
* **Frontend:** React (Create React App) + Tailwind + Recharts
* **Tujuan:** Demo Mini Security Operations Center (SOC) — menampilkan logs, statistik, dan chart interaktif

---

## ✨ Fitur

* Menyimpan log keamanan (event type, timestamp, source IP, severity, description)
* Endpoint CRUD untuk logs (`/api/logs/`)
* Endpoint statistik cepat (`/api/stats/`)
* Dashboard: chart (pie/line) dan tabel logs
* Contoh data dummy untuk demonstrasi

---

## 🏛️ Arsitektur

```mermaid
flowchart LR
  User[Browser (User)] -->|akses| Frontend[React (Vercel)]
  Frontend -->|HTTP API| Backend[Django REST API (Railway/Gunicorn)]
  Backend --> Database[(Postgres / SQLite)]
```

---

## 📁 Struktur Repo (contoh)

```
/soc_dashboard
  /soc_backend
    /logs
      models.py
      serializers.py
      views.py
      urls.py
    manage.py
    requirements.txt
  /frontend
    src/
    public/
    package.json
  README.md
  .gitignore
  docs/
    chart.png
    table.png
```

---

## ⚙️ Quickstart — Backend (Lokal)

1. Clone repo

```bash
git clone https://github.com/<username>/soc_dashboard.git
cd soc_dashboard/soc_backend
```

2. Buat virtualenv & install

```bash
python -m venv venv
# Linux/macOS
source venv/bin/activate
# Windows
# venv\Scripts\activate
pip install -r requirements.txt
```

3. Migrasi dan buat superuser

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

4. Menambahkan dummy data (opsional)

```bash
python manage.py shell
# contoh singkat:
from logs.models import Log
Log.objects.create(event_type='LOGIN_FAIL', source_ip='192.0.2.1', severity='MEDIUM', description='Contoh')
```

5. Jalankan server

```bash
python manage.py runserver
```

API akan tersedia pada `http://127.0.0.1:8000/api/`

---

## ⚙️ Quickstart — Frontend (Lokal)

1. Buka folder frontend

```bash
cd ../frontend
npm install
```

2. Tambah `.env` (contoh)

```
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

3. Jalankan dev server

```bash
npm start
```

Frontend: `http://localhost:3000`

---

## 🔌 Endpoints Penting

* `GET /api/logs/` — daftar logs (list)
* `POST /api/logs/` — buat log baru
* `GET /api/logs/{id}/` — detail log
* `PUT/PATCH /api/logs/{id}/` — update
* `DELETE /api/logs/{id}/` — hapus
* `GET /api/stats/` — hitung cepat events (login\_fail, brute\_force, port\_scan, malware)

Contoh cURL:

```bash
curl http://127.0.0.1:8000/api/logs/
```

---

## 🧱 Model Utama (`logs/models.py`)

Ringkasan field `Log`:

* `timestamp` (DateTime, auto\_now\_add)
* `event_type` (choice, e.g. LOGIN\_FAIL, BRUTE\_FORCE, PORT\_SCAN, MALWARE)
* `source_ip` (IP address)
* `severity` (LOW, MEDIUM, HIGH, CRITICAL)
* `description` (text)

---

## 🚢 Deployment (Panduan singkat)

### Backend — Railway (contoh)

1. Push repo backend ke GitHub
2. Buat project di Railway → connect repo → set command start:

```
gunicorn soc_backend.wsgi
```

3. Atur variabel environment (DATABASE\_URL, SECRET\_KEY, dll)

### Frontend — Vercel

1. Push repo frontend ke GitHub
2. Import project di Vercel
3. Set environment variable:

```
REACT_APP_API_URL=https://<your-backend-url>/api
```

4. Deploy

---

## 🧪 Testing & Data Dummy

* Pakai `faker` atau loop script untuk menambahkan 50-100 records
* Contoh script (Django shell) ada di folder `scripts/` (opsional)

---

## 📸 Screenshot

Simpan screenshot di `docs/chart.png` dan `docs/table.png`. README menampilkan gambar menggunakan:

```markdown
![Chart](docs/chart.png)
![Table](docs/table.png)
```

---

## 📝 Contributing

1. Fork repo
2. Buat branch fitur: `git checkout -b feat/nama-fitur`
3. Commit & push
4. Buat pull request

---

## 📜 License

Lisensi: **MIT** — lihat file `LICENSE` untuk detail.

---

## 💬 Kontak

Pembuat / Maintainer: `<nama atau email>`

---

*README ini di-generate otomatis — kamu bisa minta versi ringan (English) atau versi lengkap dengan diagram SVG / screenshot yang aku buatkan.*
