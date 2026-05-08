// src/App.jsx
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login" // <-- Import halaman Login

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} /> {/* <-- Tambahkan rute ini */}
          </Routes>
        </Router>
    </>
  )
}

export default App