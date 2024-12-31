# Proyek Todo App

## Deskripsi
Proyek ini adalah aplikasi Todo yang dibangun dengan Vue.js untuk frontend dan Node.js untuk backend. Aplikasi ini memungkinkan pengguna untuk mendaftar, masuk, dan mengelola daftar tugas mereka.

## Struktur Folder

### Frontend (FE)

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── AddTodo.vue
│   │   ├── TodoItem.vue
│   │   └── TodoList.vue
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   └── index.js
│   ├── utils/
│   │   └── helper.js
│   ├── App.vue
│   └── main.js
├── .env
├── .gitignore
├── package.json
└── vite.config.js
```

#### Penjelasan Struktur Frontend
- **`public/`**: Berisi file statis seperti `index.html` dan `favicon.ico`.
- **`src/`**: Berisi semua kode sumber aplikasi.
  - **`assets/`**: Menyimpan aset seperti gambar.
  - **`components/`**: Menyimpan komponen Vue yang dapat digunakan kembali.
  - **`router/`**: Mengatur routing aplikasi.
  - **`store/`**: Mengelola state menggunakan Vuex.
  - **`utils/`**: Menyimpan fungsi utilitas atau helper.
  - **`App.vue`**: Komponen root aplikasi.
  - **`main.js`**: File entry point untuk aplikasi Vue.js.
- **`.env`**: Menyimpan variabel lingkungan.
- **`.gitignore`**: Mengabaikan file dan folder tertentu dari repositori.
- **`package.json`**: File konfigurasi untuk proyek.
- **`vite.config.js`**: Konfigurasi untuk Vite.

### Backend (BE)

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── todoController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   └── Todo.js
├── routes/
│   ├── authRoutes.js
│   └── todoRoutes.js
├── utils/
│   └── helper.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

#### Penjelasan Struktur Backend
- **`config/`**: Berisi konfigurasi, seperti koneksi database.
- **`controllers/`**: Menyimpan logika untuk menangani permintaan.
- **`middleware/`**: Menyimpan middleware untuk autentikasi dan validasi.
- **`models/`**: Menyimpan model data untuk database.
- **`routes/`**: Mengatur rute API.
- **`utils/`**: Menyimpan fungsi utilitas atau helper.
- **`.env`**: Menyimpan variabel lingkungan.
- **`.gitignore`**: Mengabaikan file dan folder tertentu dari repositori.
- **`package.json`**: File konfigurasi untuk proyek.
- **`server.js`**: File entry point untuk aplikasi backend.

## Instalasi

1. Clone repositori ini.
2. Masuk ke direktori frontend dan backend.
3. Jalankan `npm install` untuk menginstal dependensi.
4. Buat file `.env` di kedua direktori dan atur variabel lingkungan yang diperlukan.
5. Jalankan server backend dengan `node server.js`.
6. Jalankan aplikasi frontend dengan `npm run dev`.

## Fitur
- Registrasi pengguna
- Autentikasi pengguna
- Menambahkan, mengedit, dan menghapus tugas
- Menampilkan daftar tugas

## Lisensi
Proyek ini dilisensikan di bawah MIT License.

