import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  AlertTriangle, BrainCircuit, ArrowUpRight, CheckCircle2,
  Clock, Target, Wrench, Lightbulb, Route, TrendingUp, BookOpen,
  Star, ChevronDown
} from 'lucide-react'
import Nav from '@/components/Nav'
import { Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  Risk: { label: "Terancam AI", color: "#dc2626" },
  Safe: { label: "Aman",       color: "#e2e8f0" }
}

const PHASE_COLORS = [
  { border: "border-l-violet-500", bg: "bg-violet-50", text: "text-violet-700", badge: "bg-violet-100 text-violet-800" },
  { border: "border-l-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-800" },
  { border: "border-l-blue-500",    bg: "bg-blue-50",    text: "text-blue-700",    badge: "bg-blue-100 text-blue-800"   },
  { border: "border-l-amber-500",   bg: "bg-amber-50",   text: "text-amber-700",   badge: "bg-amber-100 text-amber-800"  },
]

const PRIORITY_CONFIG = {
  High:   { label: "Tinggi", dot: "bg-red-500",   badge: "bg-red-100 text-red-800 border-red-300",     bar: 90 },
  Medium: { label: "Sedang", dot: "bg-amber-500", badge: "bg-amber-100 text-amber-800 border-amber-300", bar: 65 },
  Low:    { label: "Rendah", dot: "bg-green-500", badge: "bg-green-100 text-green-800 border-green-300", bar: 40 },
}

const TOOL_ICONS = [BookOpen, Target, BrainCircuit, Star]

// Komponen wrapper untuk animasi reveal
const RevealSection = ({ show, children }) => {
  const ref = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    if (show) {
      // Ukur height konten lalu set
      setHeight(ref.current.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [show])

  return (
    <div
      style={{
        height: show ? height : 0,
        overflow: 'hidden',
        transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div ref={ref} className="space-y-8 pt-2">
        {children}
      </div>
    </div>
  )
}

const DashboardResult = () => {
  const location   = useLocation()
  const navigate   = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const detailRef  = useRef(null)

  const rawData        = location.state?.prediction
  const chosenIndustry = location.state?.industry || "Industri Umum"

  if (!rawData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sidebar gap-4 p-4 text-center">
        <div className="bg-white border-3 border-foreground p-6 shadow-[6px_6px_0px_black] max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-2 animate-bounce" />
          <h2 className="text-2xl font-black uppercase tracking-tight">Data Tidak Ditemukan!</h2>
          <p className="text-muted-foreground font-medium mt-2 mb-6">
            Koneksi terputus atau data kosong. Coba isi ulang profil lu.
          </p>
          <button
            onClick={() => navigate('/predict')}
            className="w-full bg-primary text-primary-foreground border-2 border-foreground py-3 font-bold uppercase shadow-[4px_4px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Mulai Analisis Sekarang
          </button>
        </div>
      </div>
    )
  }

  const jobTitle  = rawData.job_title  || rawData.jobTitle
  const riskScore = Math.round(rawData.risk_score ?? rawData.riskScore ?? 0)
  const details   = rawData.ai_details || rawData

  const chartData = [
    { name: "Risk", value: riskScore,        fill: "#dc2626" },
    { name: "Safe", value: 100 - riskScore,  fill: "#e2e8f0" },
  ]

  const handleExpand = () => {
    setExpanded(true)
    // Scroll ke section detail setelah animasi mulai
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-sidebar p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* ── HEADER ── */}
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

          {/* ── ROW 1: RISK SCORE + RESKILLING (selalu tampil) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Risk Score */}
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

            {/* Reskilling Recommendations */}
            <Card className="md:col-span-2 bg-white border-3 border-foreground shadow-[6px_6px_0px_black] flex flex-col">
              <CardHeader className="border-b-3 border-foreground">
                <div className="flex items-center gap-2 text-foreground">
                  <BrainCircuit className="h-6 w-6" />
                  <CardTitle className="text-xl font-black uppercase">Rekomendasi Reskilling</CardTitle>
                </div>
                <CardDescription className="font-bold text-foreground/70">
                  Keterampilan mendesak yang disarankan sistem untuk menaikkan nilai tawar peran Anda.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 flex-grow space-y-3">
                {details.reskillingRecommendations?.map((item, idx) => {
                  const isString  = typeof item === 'string'
                  const skillName = isString ? item : (item.skill || item.name || '')
                  const reason    = isString ? null : item.reason
                  const priority  = isString ? 'Medium' : (item.priority || 'Medium')
                  const cfg       = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.Medium

                  return (
                    <div key={idx} className="p-3 border-2 border-foreground shadow-[3px_3px_0px_black] bg-muted/10 space-y-2">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex items-start gap-2">
                          <span className={`inline-block w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${cfg.dot}`} />
                          <div>
                            <span className="font-black text-base">{skillName}</span>
                            {reason && (
                              <p className="text-xs text-muted-foreground font-medium mt-0.5 leading-relaxed">{reason}</p>
                            )}
                          </div>
                        </div>
                        <Badge className={`text-xs font-bold border uppercase shrink-0 ${cfg.badge}`}>
                          {cfg.label}
                        </Badge>
                      </div>
                      <Progress value={cfg.bar} className="h-2.5 border-2 border-foreground [&>div]:bg-primary rounded-none" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* ── TOMBOL PELAJARI LEBIH LANJUT ── */}
          {!expanded && (
            <div className="flex justify-center">
              <button
                onClick={handleExpand}
                className="group flex items-center gap-3 bg-primary text-primary-foreground border-3 border-foreground px-8 py-4 font-black uppercase text-lg shadow-[6px_6px_0px_black] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
              >
                Pelajari Lebih Lanjut
                <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          )}

          {/* ── SECTION DETAIL (tersembunyi dulu) ── */}
          <div ref={detailRef}>
            <RevealSection show={expanded}>

              {/* Tools + Durasi & Goal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Card className="bg-white border-3 border-foreground shadow-[6px_6px_0px_black]">
                  <CardHeader className="border-b-3 border-foreground pb-4">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-6 w-6" />
                      <CardTitle className="text-xl font-black uppercase">Tools yang Dipelajari</CardTitle>
                    </div>
                    <CardDescription className="font-bold text-foreground/70">
                      Aplikasi & platform yang perlu dikuasai secepatnya.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    {details.toolsToLearn?.map((tool, idx) => {
                      const Icon = TOOL_ICONS[idx % TOOL_ICONS.length]
                      return (
                        <div key={idx} className="flex items-center gap-3 p-3 border-2 border-foreground shadow-[2px_2px_0px_black] bg-muted/10">
                          <div className="bg-primary/10 border-2 border-foreground p-1.5">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-bold text-sm">{tool}</span>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-6">
                  <Card className="bg-white border-3 border-foreground shadow-[6px_6px_0px_black]">
                    <CardHeader className="border-b-3 border-foreground pb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-6 w-6" />
                        <CardTitle className="text-xl font-black uppercase">Estimasi Durasi</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3 p-4 bg-primary/5 border-2 border-foreground shadow-[3px_3px_0px_black]">
                        <Clock className="h-8 w-8 text-primary flex-shrink-0" />
                        <p className="font-black text-lg leading-tight">
                          {details.estimatedLearningDuration || '6-8 Minggu'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary text-primary-foreground border-3 border-foreground shadow-[6px_6px_0px_black] flex-grow">
                    <CardHeader className="border-b-3 border-primary-foreground/30 pb-4">
                      <div className="flex items-center gap-2">
                        <Target className="h-6 w-6" />
                        <CardTitle className="text-xl font-black uppercase">Tujuan Utama</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="font-bold leading-relaxed text-primary-foreground/90">
                        {details.mainReskillingGoal}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Learning Roadmap */}
              <Card className="bg-white border-3 border-foreground shadow-[6px_6px_0px_black]">
                <CardHeader className="border-b-3 border-foreground pb-4">
                  <div className="flex items-center gap-2">
                    <Route className="h-6 w-6" />
                    <CardTitle className="text-xl font-black uppercase">Learning Roadmap</CardTitle>
                  </div>
                  <CardDescription className="font-bold text-foreground/70">
                    Rencana belajar 8 minggu yang terstruktur untuk transisi karir Anda.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {details.learningRoadmap?.map((phase, idx) => {
                      const color = PHASE_COLORS[idx % PHASE_COLORS.length]
                      return (
                        <div key={idx} className={`border-l-4 border-2 border-foreground shadow-[3px_3px_0px_black] p-4 space-y-3 ${color.border} ${color.bg}`}>
                          <div>
                            <span className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 border border-foreground ${color.badge}`}>
                              {phase.phase}
                            </span>
                            <p className="font-black text-sm mt-2 leading-tight">{phase.focus}</p>
                          </div>
                          <ul className="space-y-2">
                            {phase.activities?.map((act, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2">
                                <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${color.text}`} />
                                <span className="text-xs font-medium leading-relaxed text-foreground/80">{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Career Transitions + Mini Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Card className="bg-white border-3 border-foreground shadow-[6px_6px_0px_black]">
                  <CardHeader className="border-b-3 border-foreground pb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-6 w-6" />
                      <CardTitle className="text-xl font-black uppercase">Opsi Transisi Karir</CardTitle>
                    </div>
                    <CardDescription className="font-bold text-foreground/70">
                      Peran-peran yang realistis untuk dituju setelah reskilling.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    {details.careerTransitionOptions?.map((career, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 border-2 border-foreground shadow-[2px_2px_0px_black] bg-muted/10 group hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-default"
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground text-xs font-black flex items-center justify-center border-2 border-foreground">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-sm flex-grow">{career}</span>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-white border-3 border-foreground shadow-[6px_6px_0px_black]">
                  <CardHeader className="border-b-3 border-foreground pb-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-6 w-6" />
                      <CardTitle className="text-xl font-black uppercase">Ide Mini Project</CardTitle>
                    </div>
                    <CardDescription className="font-bold text-foreground/70">
                      Proyek nyata untuk membangun portofolio dan membuktikan skill baru.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    {details.miniProjectIdeas?.map((project, idx) => (
                      <div key={idx} className="flex gap-3 p-3 border-2 border-foreground shadow-[2px_2px_0px_black] bg-muted/10">
                        <div className="flex-shrink-0 w-8 h-8 bg-secondary text-secondary-foreground font-black text-sm flex items-center justify-center border-2 border-foreground">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <p className="text-sm font-bold leading-relaxed">{project}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

              </div>

            </RevealSection>
          </div>

        </div>
      </div>
    </>
  )
}

export default DashboardResult