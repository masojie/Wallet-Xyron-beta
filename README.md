# 🪙 XYRON Wallet — Next-Gen Web3 Experience

![Status](https://img.shields.io/badge/Status-Live_Sync-success?style=for-the-badge&logo=statuspage)
![Platform](https://img.shields.io/badge/Platform-Android_15_Optimized-blue?style=for-the-badge&logo=android)
![Engine](https://img.shields.io/badge/Engine-Replit_PID_565-orange?style=for-the-badge&logo=replit)

**XYRON Wallet** adalah aplikasi dompet digital Web3 premium dengan desain **Glassmorphism Rata Kanan** yang dioptimalkan untuk pengalaman iOS 26 Beta di perangkat Android 15. Aplikasi ini terhubung secara *real-time* ke mesin blockchain XYRON yang berjalan di Replit.

---

## 🚀 Fitur Unggulan

- **💎 Premium Dashboard:** Visual saldo $12,847.53 dengan kartu efek gradasi transparan.
- **📊 Live Block Explorer:** Monitoring transaksi global dan status jaringan secara *real-time* via Socket.io.
- **📜 Smart History:** Detail riwayat transaksi dengan sistem *Bottom Sheet* interaktif.
- **⚡ Replit Sync:** Terhubung langsung ke backend server (200MB+ Engine) melalui jalur WebSocket kencang.

---

## 🏗️ Struktur Folder (Clean Architecture)

```text
src/
├── components/     # UI Components (BalanceCard, Explorer, etc.)
├── pages/          # Main Screen (Dashboard Index)
├── shared/         # Data Schema & Interfaces
├── data/           # Initial Mock Data
└── lib/            # Socket.io Bridge (Kabel Sinkronisasi)

🔌 Cara Kerja Sinkronisasi
Aplikasi ini menggunakan arsitektur Hybrid:
Frontend (GitHub/Vercel): Menangani tampilan (UI/UX) yang ringan dan responsif.
Backend (Replit @ Port 3000): Menangani logika blockchain, database transaksi, dan pemrosesan data berat (200MB+).
The Bridge: Menggunakan Socket.io-client untuk menarik data Live dari Replit ke HP tanpa perlu refresh.
🛠️ Cara Instalasi
1.Clone repository ini:
git clone [https://github.com/username/xyron-wallet.git](https://github.com/username/xyron-wallet.git)

2.Install dependensi:
npm install

3.Pastikan Replit kamu dalam status Running, lalu jalankan:
npm run dev

📡 Live Connection Details
Engine URL: https://6c6f7e24-f718-4036-b9a5-ae1bf8deb622-00-13hlfp74lk3bw.janeway.replit.dev
Socket Port: 3000
UI Design: iOS 26 Beta Concept
Created with ❤️ by Zam — XYRON Ecosystem

