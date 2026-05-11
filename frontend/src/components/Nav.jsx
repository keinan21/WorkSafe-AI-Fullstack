import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router"; // Disarankan pakai react-router-dom
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "@/lib/firebase";

const Nav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Nggak perlu alert juga gapapa biar nggak berisik, langsung lempar aja
      navigate("/login");
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <nav className="border-b-3 border-foreground bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO (Bisa di-klik balik ke Home) */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary border-3 border-foreground shadow-[2px_2px_0px_black] group-hover:bg-accent transition-colors" />
          <span className="font-black text-xl uppercase tracking-tighter">WorkSafeAI</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            /* --- JIKA SUDAH LOGIN --- */
            <>
              {/* Nama (Disembunyikan di HP biar ga sempit) */}
              <span className="hidden md:block text-sm font-bold uppercase tracking-wider">
                Halo, {user.displayName?.split(" ")[0]} {/* Ambil nama depan aja biar rapi */}
              </span>
              
              {/* Foto Profil Google */}
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-11 h-11 border-3 border-foreground object-cover bg-muted"
                referrerPolicy="no-referrer" 
              />
              
              <Button 
                variant="ghost" 
                onClick={handleLogout}
              >
                Keluar
              </Button>
            </>
          ) : (
            /* --- JIKA BELUM LOGIN --- */
            <Button 
              asChild 
              className="bg-primary text-primary-foreground border-2 border-foreground font-black uppercase shadow-[3px_3px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <Link to="/login">Log in</Link>
            </Button>
          )}
        </div>
        
      </div>
    </nav>
  );
};

export default Nav;