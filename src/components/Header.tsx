import { useState, useEffect } from "react";
import { useVoteContext } from "@/context/VoteContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add scroll listener for header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-12 w-10 rounded-lg flex items-center justify-center animate-float">
            <img 
              src="https://sanwaralkmali.github.io/math-mag-mania-vote/assets/headerLogo.png" 
              alt="Math Magazine Mania Logo" 
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
            Math Magazine 
              <span className="text-game-purple text-4xl"> ∞ </span>
            </h1>
            <p className="text-sm text-gray-500">Vote for your favorite math magazine!</p>
          </div>
        </div>
      </div>
    </header>
  );
}
