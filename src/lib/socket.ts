import { io } from "socket.io-client";

// URL Replit kamu yang sedang running (Port 3000)
// Pastikan URL ini sesuai dengan URL Janeway Replit kamu
const REPLIT_URL = "https://6c6f7e24-f718-4036-b9a5-ae1bf8deb622-00-13hlfp74lk3bw.janeway.replit.dev:3000";

export const socket = io(REPLIT_URL, {
  transports: ["websocket"], // Menggunakan protokol kencang untuk Android 15
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Log untuk memastikan koneksi di console browser
socket.on("connect", () => {
  console.log("✅ XYRON Wallet Terhubung ke Replit Engine (PID 565)");
});

socket.on("connect_error", (error) => {
  console.error("❌ Koneksi Gagal:", error.message);
});

export default socket;
