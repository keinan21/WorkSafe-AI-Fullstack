import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Nav from '@/components/Nav';
import { FileQuestion, Search, Home, ArrowLeft, X, Minus, Square } from 'lucide-react';

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <Nav />
      
      <div className="min-h-[calc(100vh-72px)] w-screen flex items-center justify-center p-4 bg-sidebar grid-pattern">
        
        {/* DESKTOP WINDOW CONTAINER */}
        <div className="w-full max-w-lg border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden">
          
          {/* WINDOW TITLE BAR (Aksen Desktop Jadul) */}
          <div className="bg-primary border-b-4 border-foreground p-3 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span className="font-mono font-black text-white text-xs tracking-wider uppercase">
                CRITICAL_ERROR_404.EXE
              </span>
            </div>
            
            {/* WINDOW CONTROLS (Minimize, Maximize, Close) */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 border-2 border-foreground bg-white shadow-[1px_1px_0px_black] flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-slate-200">
                <Minus className="h-2.5 w-2.5 stroke-[4]" />
              </div>
              <div className="w-5 h-5 border-2 border-foreground bg-white shadow-[1px_1px_0px_black] flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-slate-200">
                <Square className="h-2 w-2 stroke-[4]" />
              </div>
              <div 
                onClick={() => navigate('/dashboard')} 
                className="w-5 h-5 border-2 border-foreground bg-red-500 shadow-[1px_1px_0px_black] flex items-center justify-center text-white cursor-pointer hover:bg-red-600"
              >
                <X className="h-2.5 w-2.5 stroke-[4]" />
              </div>
            </div>
          </div>

          {/* WINDOW BODY CONTENT */}
          <div className="p-6 sm:p-8 space-y-6 bg-white">
            
            {/* Large 404 Graphic */}
            <div className="relative select-none my-2">
              <h1 className="text-[120px] sm:text-[160px] font-black leading-none text-foreground/5 tracking-tighter text-center">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border-4 border-foreground bg-accent shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg animate-bounce">
                  <FileQuestion className="h-10 w-10 sm:h-12 sm:w-12 text-foreground stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Pesan Error */}
            <div className="space-y-2 text-center">
              <h2 className="text-xl sm:text-2xl font-black uppercase font-mono tracking-tight text-foreground">
                STATUS: PAGE_NOT_FOUND
              </h2>
              <p className="text-muted-foreground font-mono text-xs sm:text-sm font-bold max-w-sm mx-auto leading-relaxed">
                [ERROR]: Jalur URL yang lu tuju corrupt, sudah dihapus, atau tersapu badai ketikan typo.
              </p>
            </div>

          </div>
        </div>
        
      </div>
    </>
  );
};

export default NotFound;