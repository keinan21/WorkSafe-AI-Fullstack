import React from "react";
import { Button } from "@/components/ui/button";

const Nav = () => {
  return (
    <nav className="border-b-3 border-foreground bg-background  sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary border-3 border-foreground" />
          <span className="font-black text-xl uppercase">YourBrand</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">Log in</Button>
          <Button>Sign up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
