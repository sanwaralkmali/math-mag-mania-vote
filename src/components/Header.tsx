
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useVoteContext } from "@/context/VoteContext";

export function Header() {
  const { hasVoted, setHasVoted, setVotedMagazineId } = useVoteContext();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add scroll listener for header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const resetVote = () => {
    if (window.confirm("Are you sure you want to reset your vote? This will allow you to vote again.")) {
      setHasVoted(false);
      setVotedMagazineId(null);
    }
  };
  
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
          <div className="h-12 w-12 rounded-lg bg-game-purple flex items-center justify-center animate-float">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
              Math Magazine 
              <span className="text-game-purple">Mania</span>
            </h1>
            <p className="text-sm text-gray-500">Vote for your favorite math magazine!</p>
          </div>
        </div>
        
        {hasVoted && (
          <Button 
            variant="outline" 
            onClick={resetVote}
            className="text-sm border-game-purple text-game-purple hover:bg-game-purple hover:text-white"
          >
            Reset Vote
          </Button>
        )}
      </div>
    </header>
  );
}
