// src/App.jsx
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import DashboardResult from "./pages/DashboardResult"
import Signup from "./pages/Signup"


function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardResult />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
    </>
  )
}

export default App