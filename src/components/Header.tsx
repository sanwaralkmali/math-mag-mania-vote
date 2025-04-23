import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useVoteContext } from "@/context/VoteContext";

export function Header() {
  const { hasVoted, setHasVoted, setVotedMagazineId } = useVoteContext();
  const [isScrolled, setIsScrolled] = useState(false);

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
          <div className="h-12 w-12 rounded-lg flex items-center justify-center overflow-hidden bg-game-purple">
            <img
              src="/images/headerLogo.png"
              alt="Math Mania Logo"
              className="h-full w-full object-contain"
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
              Math Magazine
              <span className="text-game-purple ml-1">Mania</span>
            </h1>
            <p className="text-sm text-gray-300">Vote for your favorite math magazine!</p>
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
