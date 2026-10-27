# Zacky Adrian Jabrah
NIM: 125103009

## Deskripsi

Website portofolio pribadi multi-halaman yang menampilkan profil, pendidikan, pengalaman profesional, daftar proyek, keterampilan, dan formulir kontak interaktif. Website dirancang minimalis dan responsif (mulai dari ukuran layar ponsel ±375px) dengan struktur HTML semantik, gaya modern, serta integrasi JavaScript dan jQuery untuk interaktivitas pengguna, termasuk penyimpanan dan pengambilan data secara real-time menggunakan **Supabase**.

Halaman yang tersedia:

- `index.html` : Beranda, Tentang Saya, Pendidikan, dan Pengalaman
- `portfolio.html` : Daftar Proyek dan Keterampilan
- `contact.html` : Informasi kontak, fitur toggle detail, dan formulir pesan interaktif

## Fitur JavaScript & jQuery

Website telah diperbarui dengan integrasi JavaScript dan jQuery (khususnya pada `contact.html`):

1. **jQuery via CDN**: Terintegrasi menggunakan jQuery 3.7.1 CDN resmi.
2. **Prevent Page Reload**: Menangani submit form dengan `e.preventDefault()` agar halaman tidak reload saat mengirim pesan.
3. **Validasi Form Client-Side**: Memeriksa input nama dan pesan dengan `.trim() === ""` untuk memastikan input tidak kosong sebelum data dikirimkan.
4. **Data Serialization**: Pengambilan seluruh isian data form sekaligus menggunakan method `.serialize()`.
5. **Pengiriman Asynchronous (AJAX POST)**: Mengirimkan form data ke **Supabase REST API** menggunakan `$.ajax()` dengan feedback visual status respon server secara dinamis.
6. **Pengambilan Data (AJAX GET)**: Mengambil seluruh pesan dari database Supabase dan merendernya ke tabel HTML secara dinamis menggunakan `$.ajax()`.
7. **DOM Manipulation (`classList.toggle`)**: Menampilkan dan menyembunyikan informasi operasional tambahan secara dinamis pada kartu kontak.

## Teknologi yang Digunakan

- HTML5 (elemen semantik: `header`, `nav`, `main`, `section`, `article`, `footer`)
- CSS3 (`style.css` kustom di atas Bootstrap)
- [Bootstrap 5.3](https://getbootstrap.com/) (grid, utilitas, komponen responsif)
- **JavaScript (ES6+)** (DOM manipulation dan validasi form)
- **[jQuery 3.7.1](https://jquery.com/)** (event handling, serialization, AJAX POST & GET)
- **[Supabase](https://supabase.com/)** (database PostgreSQL cloud — simpan & ambil data pesan kontak)
- Google Fonts: Libre Baskerville dan Inter
- Git & GitHub (version control)
- Vercel (hosting/deployment)

## Struktur Folder

```
.
├── index.html
├── portfolio.html
├── contact.html
├── script.js
├── style.css
├── assets/
│   └── profile.jpg
└── README.md
```

## Setup Supabase

1. Buat akun di [supabase.com](https://supabase.com/) dan buat project baru.
2. Masuk ke **SQL Editor**, jalankan query berikut untuk membuat tabel:

```sql
CREATE TABLE pesan_kontak (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nama       TEXT NOT NULL,
  email      TEXT DEFAULT '',
  pesan      TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

3. Aktifkan **Row Level Security (RLS)** dan tambahkan policy:
   - **INSERT**: `anon` role → `true` (boleh kirim pesan)
   - **SELECT**: `anon` role → `true` (boleh baca pesan)

4. Salin **Project URL** dan **Anon Key** dari:
   `Dashboard → Project Settings → API`

5. Tempelkan ke bagian konfigurasi di `script.js`:

```js
const SUPABASE_URL      = 'https://XXXXXXXXXXXXXXXX.supabase.co';
const SUPABASE_ANON_KEY = 'eyXXXXXXXXXXXX...';
```

## Menjalankan Secara Lokal

Buka `index.html` langsung di browser, atau gunakan ekstensi Live Server di VSCode.
Tidak memerlukan server lokal (XAMPP) karena database menggunakan Supabase cloud.