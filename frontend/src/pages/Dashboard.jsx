import React, { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router';
import Nav from '@/components/Nav';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Book, ChevronDown, ChevronUp, ArrowUpRight, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
// INTEGRASI COMPONENTS BARU
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/Loader';

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null); // Sekarang melacak item.id
  
  const navigate = useNavigate();
  const BACKEND_URL = "https://worksafe-ai-fullstack.onrender.com/";

  useEffect(() => {
    const fetchHistory = async (currentUser) => {
      try {
        const token = await currentUser.getIdToken();
        const res = await fetch(`${BACKEND_URL}/api/predict/history`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.status === 'success') {
          setHistory(result.data);
        }
      } catch (error) {
        console.error("Gagal mengambil history:", error);
        toast.error("Gagal memuat riwayat analisis.");
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserProfile(user); 
        fetchHistory(user);
      } else {
        setLoading(false);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // HANDLE DELETE MENGGUNAKAN TOAST PREMIUM
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin mau menghapus riwayat analisis ini? Tindakan ini gak bisa dibatalkan.");
    if (!confirmDelete) return;

    // Trigger loading toast langsung saat proses dimulai
    const toastId = toast.loading("Sedang menghapus riwayat...");

    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(`${BACKEND_URL}/api/predict/history/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await res.json();
        if (result.status === 'success') {
          setHistory(history.filter(item => item.id !== id));
          if (openAccordion === id) setOpenAccordion(null);
          
          // Update loading toast jadi sukses
          toast.success("Riwayat berhasil dihapus!", { id: toastId });
        } else {
          toast.error(result.message || "Gagal menghapus riwayat.", { id: toastId });
        }
      } else {
        const errorText = await res.text();
        console.error("Respon Error Server:", errorText);
        toast.error(`Server Error (${res.status}): Gagal memproses permintaan.`, { id: toastId });
      }

    } catch (error) {
      console.error("Error saat menghapus:", error);
      toast.error("Terjadi kesalahan koneksi saat menghapus data.", { id: toastId });
    }
  };

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  if (loading) return <Loader />;

  const memberSince = userProfile?.metadata?.creationTime
    ? new Date(userProfile.metadata.creationTime).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
    : 'Maret 2026';

  return (
    <>
      {/* Wadah penyedia komponen Toast */}
      <Toaster position="top-center" reverseOrder={false} />
      <Nav />
      
      <div className="min-h-screen bg-sidebar p-4 md:p-12 grid-pattern">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {userProfile && (
            <div className="flex flex-col items-center justify-center gap-6 relative overflow-hidden rounded-2xl border-4 border-foreground/80 bg-white/70 backdrop-blur-sm p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <img src={userProfile.photoURL || "https://api.dicebear.com/7.x/pixel-art/svg"} alt="Profile" className="w-32 h-32 border-4 border-foreground bg-white/60 object-cover shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
              <div className="space-y-3 text-center w-full">
                <Badge>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">{userProfile.displayName || 'Pengguna WorkSafe'}</h2>
                </Badge>
                <p className="font-mono text-sm text-muted-foreground font-bold">{userProfile.email}</p>
                <div className="flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground font-mono">Bergabung sejak {memberSince}</div>
              </div>
            </div>
          )}

          <hr className="border-2 border-foreground" />

          <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Riwayat Analisis Risiko</h3>
            
            {history.length === 0 ? (
              <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_black] text-center font-bold font-mono">Belum ada riwayat lowongan yang di-scan.</div>
            ) : (
              <div className="space-y-3">
                {history.map((item) => {
                  const isOpen = openAccordion === item.id;
                  const currentScore = item.risk_score || 0;
                  const chartData = [{ name: 'Risk', value: currentScore }, { name: 'Safe', value: 100 - currentScore }];
                  const details = item.ai_details || {};

                  return (
                    <Collapsible
                      key={item.id}
                      open={isOpen}
                      onOpenChange={() => toggleAccordion(item.id)}
                      className="border-4 border-foreground bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
                    >
                      {/* TRIGGER COLLAPSIBLE */}
                      <CollapsibleTrigger asChild>
                        <div 
                          className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:bg-muted/50 transition-colors border-b-4 border-transparent select-none" 
                          style={{ borderBottomColor: isOpen ? 'black' : 'transparent' }}
                        >
                          <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="w-12 h-12 flex-shrink-0">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie data={chartData} innerRadius={14} outerRadius={22} dataKey="value" startAngle={90} endAngle={-270}>
                                    <Cell fill="#f87171" /> 
                                    <Cell fill="#34d399" /> 
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            <div>
                              <h4 className="font-black text-xl uppercase tracking-tight">{item.job_title}</h4>
                              <p className="text-xs font-bold text-muted-foreground font-mono">
                                {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                            <span className="font-mono text-xl font-black bg-destructive/10 text-destructive border-2 border-destructive px-3 py-1">
                              {currentScore}% RISK
                            </span>
                            {isOpen ? <ChevronUp className="h-6 w-6 stroke-[3]" /> : <ChevronDown className="h-6 w-6 stroke-[3]" />}
                          </div>
                        </div>
                      </CollapsibleTrigger>

                      {/* KONTEN YANG DI-COLLAPSE */}
                      <CollapsibleContent className="">
                        <div className="p-5 bg-slate-50 space-y-4 border-t-2 border-foreground/20">
                          
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground block mb-1">Analisis Probabilitas</span>
                            <p className="text-sm font-bold bg-white p-3 border-2 border-foreground shadow-[2px_2px_0px_black]">
                              {details.automationProbability || details.riskInterpretation || "Data tidak tersedia."}
                            </p>
                          </div>

                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground block mb-2">Rekomendasi Keterampilan</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {details.reskillingRecommendations?.map((rec, i) => {
                                const isStr = typeof rec === 'string';
                                const name = isStr ? rec : (rec.skill || '');
                                const time = isStr ? (details.estimatedLearningDuration || '3 Bulan') : (rec.timeToLearn || '1-3 bln');
                                return (
                                  <div key={i} className="bg-white border-2 border-foreground p-2 flex justify-between items-center font-mono text-xs font-bold">
                                    <span><Book className='inline mr-1 w-3 h-3'/> {name}</span>
                                    <span className="bg-accent text-foreground px-2 py-0.5 border border-foreground">{time}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* ACTION BUTTONS */}
                          <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
                            <button 
                              onClick={() => navigate("/hasil", { state: { prediction: item } })} 
                              className="flex-grow h-11 bg-primary text-white font-black uppercase text-sm border-2 border-foreground shadow-[4px_4px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
                            >
                              Buka Halaman Hasil Analisis <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                            </button>
                            
                            <button 
                              onClick={() => handleDelete(item.id)} 
                              className="h-11 px-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase text-sm border-2 border-foreground shadow-[4px_4px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2 shrink-0"
                              title="Hapus dari riwayat"
                            >
                              <Trash2 className="h-5 w-5 stroke-[2.5]" />
                              <span className="sm:hidden inline">Hapus Riwayat</span>
                            </button>
                          </div>

                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;