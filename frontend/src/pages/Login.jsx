// src/pages/Login.jsx
import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const Login = () => {
  const [result, setResult] = useState(null);

  const handleLoginAndTestAPI = async () => {
    try {
      // 1. Munculkan popup Login Google
      const result = await signInWithPopup(auth, provider);
      
      // 2. Dapatkan Karcis VIP (Token) dari Google
      const token = await result.user.getIdToken();
      console.log("Token berhasil didapat:", token);

      // 3. Siapkan data yang mau dikirim ke Backend
      const payload = {
        jobTitle: "Admin Data Entry",
        jobDescription: "Memasukkan data ke excel setiap hari",
        industry: "Perkantoran"
      };

      // 4. TEMBAK API BACKEND
      const response = await axios.post('http://localhost:5001/api/predict-risk', payload, {
        headers: {
          Authorization: `Bearer ${token}` // <--- Token Firebase dikirim ke sini
        }
      });

      console.log("Hasil dari Backend:", response.data);
      setResult(response.data);

    } catch (error) {
      console.error("Gagal login atau hit API:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div>Login</div>
  )
}

export default Login