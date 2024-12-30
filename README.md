# Struktur Folder

my-todo-app/
├── backend/
│   ├── models/
│   │   ├── todo.js
│   ├── server.js
│   └── package.json
└── frontend/
└── README


# Desain Database MongoDB

## Koleksi: todos

| Field      | Tipe Data | Deskripsi                     |
|------------|-----------|-------------------------------|
| _id        | ObjectId | Primary key (otomatis)       |
| task       | String    | Tugas yang harus dilakukan    |
| completed  | Boolean   | Status tugas (selesai/tidak)  |
| createdAt  | Date      | Waktu pembuatan tugas         |