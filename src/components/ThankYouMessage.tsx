
import { useEffect, useState } from "react";
import { useVoteContext } from "@/context/VoteContext";

export function ThankYouMessage() {
  const { thankYouVisible, votedMagazineId, magazines } = useVoteContext();
  const [confetti, setConfetti] = useState<Array<{ id: number; color: string; left: string; delay: string }>>([]);
  
  // Find the magazine that was voted for
  const votedMagazine = magazines.find(m => m.id === votedMagazineId);
  
  // Create confetti effect
  useEffect(() => {
    if (thankYouVisible) {
      const colors = [
        "bg-game-purple", 
        "bg-game-orange", 
        "bg-game-blue", 
        "bg-game-yellow", 
        "bg-game-pink",
        "bg-game-green"
      ];
      
      const newConfetti = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.5}s`
      }));
      
      setConfetti(newConfetti);
      
      // Clear confetti after animation completes
      const timer = setTimeout(() => {
        setConfetti([]);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [thankYouVisible]);

  if (!thankYouVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      {/* Confetti particles */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className={`confetti ${particle.color} animate-confetti`}
          style={{ 
            left: particle.left, 
            animationDelay: particle.delay,
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`
          }}
        />
      ))}
      
      <div className="bg-white rounded-lg p-8 max-w-md text-center shadow-xl mx-4 animate-scale-in">
        <div className="h-20 w-20 bg-game-purple text-white rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-10 w-10"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Thank You for Your Vote!</h2>
        
        {votedMagazine && (
          <p className="mb-4">
            You voted for <span className="font-bold text-game-purple">{votedMagazine.title}</span> from Grade <span className="font-bold text-game-purple">{votedMagazine.grade}</span>
          </p>
        )}
        
        <p className="text-gray-500">
          Your participation helps celebrate our students' creativity and mathematical knowledge!
        </p>
      </div>
    </div>
  );
}
