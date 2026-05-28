import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App' // Hapus ekstensinya, biarkan TS yang nyari App.tsx
import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Gagal nemu elemen root. Pastikan di index.html ada <div id='root'></div>");
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
    <App />
    </HelmetProvider>
  </StrictMode>,
)