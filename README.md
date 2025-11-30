# Smart Mushroom Cultivation System (Kumbung Jamur Pintar)

Aplikasi Progressive Web App (PWA) "Mobile-First" untuk memantau dan mengontrol lingkungan budidaya jamur tiram secara cerdas.

## Tampilan Aplikasi (Screenshots)

| Dashboard (Home) | Statistik (Stats) | Pengaturan (Config) |
| :---: | :---: | :---: |
| ![Dashboard](/public/screenshots/1.png) | ![Stats](/public/screenshots/2.png) | ![Config](/public/screenshots/3.png) |

## Fitur Aplikasi

* **Real-time Monitoring**: Pemantauan suhu dan kelembaban terkini dengan indikator visual sparkline.

* **Smart Control (Action Center)**:
  * **Auto Mode (AI)**: Otomatisasi perangkat berdasarkan target suhu/kelembaban.
  * **Manual Mode**: Saklar manual untuk Mister (Kabut), Exhaust Fan, dan Grow Lights.

* **Environmental Trends**: Visualisasi data historis suhu dan kelembaban menggunakan grafik interaktif.

* **System Configuration**:
  * Pengaturan Target Suhu & Kelembaban (Threshold).
  * Konfigurasi jaringan WiFi (untuk sinkronisasi ESP32).
  * Kalibrasi manual offset sensor.

## Teknologi yang Digunakan

* [React](https://react.dev/) (via Vite) - Framework UI
* [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS & Glassmorphism Design
* [Recharts](https://recharts.org/) - Library Grafik Data
* [Lucide React](https://lucide.dev/) - Ikon Vektor Ringan