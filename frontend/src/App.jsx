// src/App.jsx
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Hasil from "./pages/Hasil"
import Predict from "./pages/Predict"
import DataAnalytics from "./pages/DataAnalytics"


function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hasil" element={<Hasil />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/analytics" element={<DataAnalytics />} />
          </Routes>
        </Router>
    </>
  )
}

export default App