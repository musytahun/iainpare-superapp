🏫 IAIN Parepare Superapps
Integrasi penuh antara backend (Django + Strawberry GraphQL) dan frontend (Next.js + Apollo Client), dilengkapi dengan dukungan RBAC (Role-Based Access Control).
Proyek ini dikembangkan sebagai superapp internal untuk mengelola berbagai modul kampus secara efisien dan terintegrasi.

⚙️ Cara Penggunaan
Langkah-langkah setup proyek:
1. Buat database baru di PostgreSQL (atau database lain sesuai kebutuhan).
2. Salin file .env.example menjadi .env di direktori /backend-django/, lalu sesuaikan isinya.
cp backend-django/.env.example backend-django/.env
3. Masuk ke direktori backend, lalu install dependencies menggunakan Poetry:
cd backend-django
poetry install
4. Jalankan migrasi database:
poetry run invoke migrate
5. Buat superuser (akun admin):
poetry run python manage.py createsuperuser --settings=backend.settings.dev
6. Load data awal untuk role dan permission:
poetry run invoke loaddata apps/accounts/fixtures/initial_roles.json
7. Jalankan server backend (mode development):
poetry run invoke dev
8. Masuk ke direktori frontend, lalu install dependencies (jika belum):
cd frontend-next
npm install
9. Jalankan frontend (mode development):
npm run dev
10. Akses aplikasi di browser:
http://localhost:3000/gate/login

🧩 Stack Teknologi
Backend:
- Django
- Strawberry GraphQL
- Poetry (dependency management)
- invoke (python task runner)

Frontend:
- Next.js
- Apollo Client
- PNPM (package manager)
- Shadcn UI

Fitur utama:
- Autentikasi dan RBAC penuh (Role-Based Access Control)
- API berbasis GraphQL
- Arsitektur modular siap dikembangkan untuk berbagai modul kampus

💡 Catatan
- Gunakan environment dev saat pengembangan.
- Pastikan backend dan frontend berjalan bersamaan agar koneksi GraphQL/Apollo berfungsi dengan baik.
- File konfigurasi dan data awal sudah disediakan untuk mempermudah setup awal.