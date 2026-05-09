import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AlertTriangle, MapPin, BrainCircuit, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// IMPORT UNTUK CHART (Pastikan sudah diinstall)
import { Pie, PieChart, Label, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// --- DUMMY DATA ---
const userData = {
  name: "Budi Santoso",
  role: "Administrasi Gudang",
  industry: "Manufaktur & Logistik",
  riskScore: 87,
}

// Konfigurasi Data Donut Chart
const chartData = [
  { name: "Risk", value: userData.riskScore, fill: "#dc2626" }, // Merah (Risiko)
  { name: "Safe", value: 100 - userData.riskScore, fill: "#e2e8f0" }, // Abu-abu (Aman)
]

const chartConfig = {
  Risk: { label: "Terancam AI", color: "#dc2626" },
  Safe: { label: "Aman", color: "#e2e8f0" }
}

const reskillingData = [
  { skill: "Data Analysis (Excel Advance/SQL)", gap: 70 },
  { skill: "Pengoperasian WMS (Warehouse Management System)", gap: 50 },
  { skill: "Basic Python automation", gap: 90 },
]

const mapData = [
  { id: 1, city: "Jakarta", lat: -6.200000, lng: 106.816666, risk: 88 },
  { id: 2, city: "Surabaya", lat: -7.250445, lng: 112.768845, risk: 82 },
  { id: 3, city: "Semarang", lat: -6.966667, lng: 110.416664, risk: 75 },
  { id: 4, city: "Bandung", lat: -6.914744, lng: 107.609810, risk: 78 },
  { id: 5, city: "Medan", lat: 3.595196, lng: 98.672226, risk: 65 },
]

const DashboardResult = () => {
  return (
    <div className="min-h-screen bg-sidebar p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER TETAP SAMA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-3 border-foreground pb-4">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Hasil Analisis Karir</h1>
            <p className="text-muted-foreground font-medium mt-1">
              Profil: <span className="text-foreground font-bold">{userData.role}</span> | {userData.industry}
            </p>
          </div>
          <Badge className="bg-primary text-primary-foreground border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--foreground))] text-sm py-1">
            Data Terakhir Diperbarui: Hari Ini
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ======================================= */}
          {/* RISK SCORE CARD WITH DONUT CHART        */}
          {/* ======================================= */}
          <Card className="md:col-span-1 bg-white border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--foreground))] flex flex-col">
            <CardHeader className="bg-red-50 border-b-3 border-foreground pb-4">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-6 w-6" />
                <CardTitle className="text-xl font-black uppercase">Risiko Otomasi</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col items-center justify-center flex-grow">
              
              {/* BUNGKUS DENGAN RELATIVE DIV */}
              <div className="relative mx-auto aspect-square w-full max-w-[200px]">
                
                {/* 1. CHART-NYA */}
                <ChartContainer config={chartConfig} className="w-full h-full shadow-none border-none p-0">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="85%" // Pakai persen biar responsif
                      outerRadius="100%"
                      strokeWidth={3}
                      stroke="hsl(var(--foreground))" // Garis tepi hitam ala brutalism
                    />
                  </PieChart>
                </ChartContainer>

                {/* 2. TEKS DI TENGAH (ABSOLUTE) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-5xl font-black text-foreground -mt-2">
                    {userData.riskScore}%
                  </span>
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground mt-1">
                    Risiko
                  </span>
                </div>

              </div>

              <Badge variant="destructive" className="uppercase font-bold mt-6 border-2 border-foreground">
                Tinggi / Kritis
              </Badge>
              <p className="text-sm font-medium text-muted-foreground mt-4 text-center">
                Tugas repetitif Anda memiliki probabilitas sangat tinggi untuk digantikan perangkat lunak dalam 5 tahun.
              </p>
            </CardContent>
          </Card>

          {/* ======================================= */}
          {/* RESKILLING RECOMMENDATION (TETAP SAMA)    */}
          {/* ======================================= */}
          <Card className="md:col-span-2 bg-secondary text-secondary-foreground border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--foreground))] flex flex-col">
            <CardHeader className="border-b-3 border-foreground bg-white">
              <div className="flex items-center gap-2 text-foreground">
                <BrainCircuit className="h-6 w-6" />
                <CardTitle className="text-xl font-black uppercase">Rekomendasi Reskilling</CardTitle>
              </div>
              <CardDescription className="font-medium text-foreground/70">
                Kesenjangan keterampilan yang harus ditutup untuk peran "Warehouse Data Analyst".
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex-grow bg-white text-foreground space-y-6">
              {reskillingData.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {item.skill}
                    </span>
                    <span className="text-sm font-bold bg-accent px-2 py-1 border-2 border-foreground rounded-md">
                      Gap: {item.gap}%
                    </span>
                  </div>
                  <Progress value={item.gap} className="h-2 border border-foreground [&>div]:bg-primary" />
                </div>
              ))}
              <button className="w-full mt-4 bg-primary text-primary-foreground border-2 border-foreground py-2 font-bold uppercase hover:bg-primary/90 flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-[3px_3px_0px_hsl(var(--foreground))]">
                Generate Action Plan <ArrowUpRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* BOTTOM SECTION: GEOSPATIAL MAP (TETAP SAMA) */}
        <Card className="bg-white border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--foreground))] overflow-hidden">
          <CardHeader className="border-b-3 border-foreground bg-accent">
             <div className="flex items-center gap-2 text-foreground">
                <MapPin className="h-6 w-6" />
                <CardTitle className="text-xl font-black uppercase">Peta Persebaran Risiko: {userData.industry}</CardTitle>
              </div>
          </CardHeader>
          <CardContent className="p-0 h-[450px] relative z-0">
            <MapContainer center={[-2.548926, 118.014863]} zoom={5} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
              {mapData.map((loc) => (
                <CircleMarker key={loc.id} center={[loc.lat, loc.lng]} pathOptions={{ color: 'black', fillColor: loc.risk > 80 ? '#dc2626' : loc.risk > 70 ? '#f59e0b' : '#10b981', fillOpacity: 0.8, weight: 2 }} radius={loc.risk / 5}>
                  <Popup><div className="font-bold">{loc.city}</div><div className="text-red-600 font-black">Risiko: {loc.risk}%</div></Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default DashboardResult