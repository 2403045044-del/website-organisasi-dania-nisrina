# 🏔 MAPALA RIMBA NUSANTARA — Website Resmi

Website resmi organisasi Mahasiswa Pecinta Alam (MAPALA) Rimba Nusantara.

---

## 📁 Struktur Folder

```
mapala-rimba-nusantara/
│
├── index.html          ← Halaman Beranda
├── tentang.html        ← Tentang Kami + Struktur Organisasi
├── kegiatan.html       ← Program & Jadwal Kegiatan
├── galeri.html         ← Galeri Foto & Video
├── daftar.html         ← Form Pendaftaran Anggota
│
├── css/
│   └── style.css       ← Semua gaya / tampilan
│
├── js/
│   ├── main.js         ← JavaScript utama (navbar, animasi)
│   ├── galeri.js       ← Filter foto & lightbox & video
│   └── form.js         ← Multi-step form & validasi
│
└── assets/
    ├── logo.svg        ← Logo organisasi (SVG)
    │
    ├── img/            ← 📸 Taruh foto-foto kegiatan di sini
    │   ├── foto1.jpg   ← Puncak Rinjani
    │   ├── foto2.jpg   ← Ranu Kumbolo
    │   ├── foto3.jpg   ← Tanam Pohon
    │   ├── foto4.jpg   ← Api Unggun Diksar
    │   ├── foto5.jpg   ← Sunrise Semeru
    │   ├── foto6.jpg   ← Bakti Sosial
    │   ├── foto7.jpg   ← Patroli Jalur
    │   └── foto8.jpg   ← Rapelling Diksar
    │
    ├── video/          ← 🎬 Taruh file video (.mp4) di sini
    │   ├── ekspedisi-rinjani.mp4
    │   ├── konservasi-2023.mp4
    │   ├── diksar-xix.mp4
    │   └── semeru-2024.mp4
    │
    └── audio/          ← 🎙️ Taruh file audio (.mp3) di sini
        ├── rinjani-summit.mp3
        ├── semeru-forest.mp3
        └── campfire-night.mp3
```

---

## 🚀 Cara Menjalankan

### Cara 1 — Buka Langsung (Paling Mudah)
1. Buka folder `mapala-rimba-nusantara/`
2. Double-click file `index.html`
3. Website akan terbuka di browser

### Cara 2 — Via Live Server (Direkomendasikan)
Jika menggunakan **VS Code**:
1. Install ekstensi "Live Server"
2. Klik kanan `index.html` → "Open with Live Server"
3. Website berjalan di `http://127.0.0.1:5500`

### Cara 3 — Via Python HTTP Server
```bash
cd mapala-rimba-nusantara
python -m http.server 8000
```
Buka browser: `http://localhost:8000`

---

## 🖼️ Cara Menambahkan Media

### Foto
- Salin file foto ke folder `assets/img/`
- Gunakan nama file sesuai yang tertera di `galeri.html`
- Format yang didukung: `.jpg`, `.jpeg`, `.png`, `.webp`
- Ukuran ideal: 800×600px (landscape) atau 600×800px (portrait)
- Jika foto tidak ada, website akan menampilkan ilustrasi SVG pengganti ✅

### Video (File Lokal)
- Salin file video ke folder `assets/video/`
- Gunakan nama file sesuai yang tertera di `galeri.html`
- Format yang didukung: `.mp4` (H.264 codec)
- Ukuran maksimal disarankan: di bawah 100MB per file

### Audio (File Lokal)
- Salin file audio ke folder `assets/audio/`
- Gunakan nama file sesuai yang tertera di `index.html`
- Format yang didukung: `.mp3`, `.ogg`, `.wav`

---

## 📄 Halaman-Halaman Website

| Halaman | File | Konten |
|---------|------|--------|
| Beranda | `index.html` | Hero, fitur utama, ekspedisi, audio rekaman, CTA |
| Tentang | `tentang.html` | Visi misi, sejarah (timeline), **diagram & tabel** struktur organisasi |
| Kegiatan | `kegiatan.html` | 3 program utama, jadwal 2024, prestasi |
| Galeri | `galeri.html` | **Galeri foto** (filter + lightbox), **galeri video lokal** |
| Daftar | `daftar.html` | **Form pendaftaran** multi-step dengan validasi |

---

## ✅ Fitur Lengkap

- [x] **Responsif** — Laptop, tablet, dan HP (320px–1920px)
- [x] **Multi-page** — 5 halaman HTML yang saling terhubung
- [x] **Navbar** — Sticky + mobile hamburger menu
- [x] **Diagram Struktur Organisasi** — Visual chart + tabel lengkap
- [x] **Galeri Foto** — Filter kategori, lightbox, keyboard navigation
- [x] **Galeri Video** — File lokal `.mp4` dengan placeholder SVG
- [x] **Audio Rekaman** — File lokal `.mp3` dengan visualisasi gelombang
- [x] **Form Pendaftaran** — 4-step form dengan validasi real-time + review
- [x] **Animasi** — Scroll reveal, counter, parallax, wave audio
- [x] **Logo SVG** — Logo custom berbentuk gunung

---

## 🎨 Desain

- **Tema**: Dark Forest — hijau hutan gelap + aksen amber/emas
- **Font**: Bebas Neue (display) + Barlow (body)
- **Inspirasi**: REI, Patagonia, outdoor community websites
- **Mobile-first**: Semua komponen dioptimalkan untuk layar kecil

---

## 📞 Kontak & Kustomisasi

Untuk mengubah informasi organisasi, edit teks di masing-masing file `.html`.
Untuk mengubah warna, font, atau ukuran, edit variabel di `css/style.css` bagian `:root {}`.

---

*"Alam Bukan Warisan Nenek Moyang, Melainkan Titipan Anak Cucu"*  
**MAPALA RIMBA NUSANTARA © 2024**
