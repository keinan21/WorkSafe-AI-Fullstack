import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AlertTriangle, MapPin, BrainCircuit, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Nav from '@/components/Nav'
import { Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  Risk: { label: "Terancam AI", color: "#dc2626" },
  Safe: { label: "Aman", color: "#e2e8f0" }
}

const mapData = [
  { id: 1, city: "Jakarta", lat: -6.200000, lng: 106.816666, risk: 88 },
  { id: 2, city: "Surabaya", lat: -7.250445, lng: 112.768845, risk: 82 },
  { id: 3, city: "Semarang", lat: -6.966667, lng: 110.416664, risk: 75 },
  { id: 4, city: "Bandung", lat: -6.914744, lng: 107.609810, risk: 78 },
  { id: 5, city: "Medan", lat: 3.595196, lng: 98.672226, risk: 65 },
]

const DashboardResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const rawData = location.state?.prediction;
  const chosenIndustry = location.state?.industry || "Industri Umum"; 

  if (!rawData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sidebar gap-4 p-4 text-center">
        <div className="bg-white border-3 border-foreground p-6 shadow-[6px_6px_0px_black] max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-2 animate-bounce" />
          <h2 className="text-2xl font-black uppercase tracking-tight">Data Tidak Ditemukan!</h2>
          <p className="text-muted-foreground font-medium mt-2 mb-6">Koneksi terputus atau data kosong. Coba isi ulang profil lu.</p>
          <button onClick={() => navigate('/predict')} className="w-full bg-primary text-primary-foreground border-2 border-foreground py-3 font-bold uppercase shadow-[4px_4px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            Mulai Analisis Sekarang
          </button>
        </div>
      </div>
    );
  }

  // BACA LANGSUNG TANPA NORMALISASI BERLAPIS
  const jobTitle = rawData.job_title || rawData.jobTitle;
  const riskScore = Math.round(rawData.risk_score ?? rawData.riskScore ?? 0);
  const details = rawData.ai_details || rawData;

  const chartData = [
    { name: "Risk", value: riskScore, fill: "#dc2626" }, 
    { name: "Safe", value: 100 - riskScore, fill: "#e2e8f0" }, 
  ];

  return (
    <>
    <Nav />
    <div className="min-h-screen bg-sidebar p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-3 border-foreground pb-4">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Hasil Analisis Karir</h1>
            <p className="text-muted-foreground font-medium mt-1">
              Profil: <span className="text-foreground font-bold">{jobTitle}</span> | {chosenIndustry}
            </p>
          </div>
          <Badge className="bg-primary text-primary-foreground border-2 border-foreground shadow-[2px_2px_0px_black] text-sm py-1 font-bold">
            PROSES AI SELESAI
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* RISK SCORE CARD */}
          <Card className="md:col-span-1 bg-white border-3 border-foreground shadow-[6px_6px_0px_black] flex flex-col">
            <CardHeader className="bg-red-50 border-b-3 border-foreground pb-4">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-6 w-6" />
                <CardTitle className="text-xl font-black uppercase">Risiko Otomasi</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col items-center justify-center flex-grow">
              <div className="relative mx-auto aspect-square w-full max-w-[200px]">
                <ChartContainer config={chartConfig} className="w-full h-full shadow-none border-none p-0">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={chartData} dataKey="value" nameKey="name" innerRadius="85%" outerRadius="100%" strokeWidth={3} stroke="black" />
                  </PieChart>
                </ChartContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-5xl font-black text-foreground -mt-2">{riskScore}%</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground mt-1">Risiko</span>
                </div>
              </div>

              <Badge variant="destructive" className="uppercase font-black mt-6 border-2 border-foreground text-sm tracking-wide px-3 py-1">
                {details.riskCategory || 'Medium Risk'}
              </Badge>
              
              <p className="text-sm font-bold text-foreground/80 mt-4 text-center border-2 border-dashed border-muted-foreground/40 p-3 bg-muted/20">
                "{details.automationProbability || details.riskInterpretation}"
              </p>
            </CardContent>
          </Card>

          {/* RESKILLING RECOMMENDATION */}
          <Card className="md:col-span-2 bg-secondary text-secondary-foreground border-3 border-foreground shadow-[6px_6px_0px_black] flex flex-col">
            <CardHeader className="border-b-3 border-foreground bg-white">
              <div className="flex items-center gap-2 text-foreground">
                <BrainCircuit className="h-6 w-6" />
                <CardTitle className="text-xl font-black uppercase">Rekomendasi Reskilling</CardTitle>
              </div>
              <CardDescription className="font-bold text-foreground/70">
                Keterampilan mendesak yang disarankan sistem untuk menaikkan nilai tawar peran Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex-grow bg-white text-foreground space-y-6">
              
              {/* HANDLE AGAR REKOMENDASI BERUPA STRING MAUPUN OBJEK TIDAK BLANK */}
              {details.reskillingRecommendations && details.reskillingRecommendations.map((item, idx) => {
                const isString = typeof item === 'string';
                const skillName = isString ? item : (item.skill || item.name || '');
                const timeToLearn = isString ? (details.estimatedLearningDuration || '3 Bulan') : (item.timeToLearn || '1-3 Bulan');
                const relevance = isString ? 85 : (item.relevanceScore || 90);

                return (
                  <div key={idx} className="space-y-2 p-3 border-2 border-foreground shadow-[3px_3px_0px_black] bg-muted/10">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <span className="font-black flex items-center gap-2 text-base md:text-lg">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                          {skillName}
                        </span>
                        <span className="text-xs text-muted-foreground font-bold flex items-center gap-1 mt-1 ml-7">
                          <Clock className="h-3 w-3" /> Estimasi Belajar: {timeToLearn}
                        </span>
                      </div>
                      <span className="text-xs md:text-sm font-black bg-accent px-2 py-1 border-2 border-foreground rounded-md uppercase tracking-wider shrink-0 self-end sm:self-center">
                        Relevansi: {relevance}%
                      </span>
                    </div>
                    <div className="pl-7 pt-1">
                      <Progress value={relevance} className="h-3 border-2 border-foreground [&>div]:bg-primary rounded-none" />
                    </div>
                  </div>
                );
              })}

              <button className="w-full mt-4 bg-primary text-primary-foreground border-2 border-foreground py-3 font-black uppercase hover:bg-primary/90 flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-[4px_4px_0px_black]">
                Generate Action Plan <ArrowUpRight className="h-5 w-5" />
              </button>
            </CardContent>
          </Card>
        </div>

        
      </div>
    </div>
    </>
  )
}

export default DashboardResult;