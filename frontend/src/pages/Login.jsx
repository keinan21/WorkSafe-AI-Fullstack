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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-10">
      <h1 className="text-3xl font-black mb-8 uppercase">Test Login & Hit API</h1>
      
      <Button onClick={handleLoginAndTestAPI} size="lg" className="mb-8">
        Login Google & Test API Predict
      </Button>

      {result && (
        <div className="w-full max-w-md p-6 border-3 border-foreground bg-accent/20 shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-foreground pb-2">Response dari Backend:</h2>
          <p className="mb-2"><strong>Status:</strong> {result.status}</p>
          <p className="mb-2"><strong>Risk Score:</strong> <span className="text-destructive font-black text-lg">{result.data?.riskScore}%</span></p>
          <p className="mb-2"><strong>Kategori:</strong> {result.data?.riskCategory}</p>
          
          <div className="mt-4 pt-4 border-t-2 border-foreground">
            <strong>Rekomendasi Skilling:</strong>
            <ul className="list-disc pl-5 mt-2">
              {result.data?.reskillingRecommendations.map((rec, idx) => (
                <li key={idx}>{rec.skill} ({rec.timeToLearn})</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;