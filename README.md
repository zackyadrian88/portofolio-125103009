# Zacky Adrian Jabrah
NIM: 125103009

## Deskripsi

Website portofolio pribadi multi-halaman yang menampilkan profil, pendidikan, pengalaman profesional, daftar proyek, keterampilan, dan formulir kontak interaktif. Website dirancang minimalis dan responsif (mulai dari ukuran layar ponsel ±375px) dengan struktur HTML semantik, gaya modern, serta integrasi JavaScript dan jQuery untuk interaktivitas pengguna.

Halaman yang tersedia:

- `index.html` : Beranda, Tentang Saya, Pendidikan, dan Pengalaman
- `portfolio.html` : Daftar Proyek dan Keterampilan
- `contact.html` : Informasi kontak, fitur toggle detail, dan formulir pesan interaktif

## Fitur JavaScript & jQuery Terbaru

Website telah diperbarui dengan integrasi JavaScript dan jQuery (khususnya pada `contact.html`):

1. **jQuery via CDN**: Terintegrasi menggunakan jQuery 3.7.1 CDN resmi.
2. **Prevent Page Reload**: Menangani submit form dengan `e.preventDefault()` agar halaman tidak reload saat mengirim pesan.
3. **Validasi Form Client-Side**: Memeriksa input nama dan pesan dengan `.trim() === ""` untuk memastikan input tidak kosong sebelum data dikirimkan.
4. **Data Serialization**: Pengambilan seluruh isian data form sekaligus menggunakan method `.serialize()`.
5. **Pengiriman Asynchronous (AJAX POST)**: Mengirimkan form data ke endpoint dummy menggunakan fungsi `$.post()` dengan feedback visual status respon server secara dinamis.
6. **DOM Manipulation (`classList.toggle`)**: Menampilkan dan menyembunyikan informasi operasional tambahan secara dinamis pada kartu kontak.

## Teknologi yang Digunakan

- HTML5 (elemen semantik: `header`, `nav`, `main`, `section`, `article`, `footer`)
- CSS3 (`style.css` kustom di atas Bootstrap)
- [Bootstrap 5.3](https://getbootstrap.com/) (grid, utilitas, komponen responsif)
- **JavaScript (ES6+)** (DOM manipulation dan validasi form)
- **[jQuery 3.7.1](https://jquery.com/)** (event handling, serialization, AJAX POST)
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

## Menjalankan Secara Lokal

Buka `index.html` langsung di browser, atau gunakan ekstensi Live Server di VSCode.