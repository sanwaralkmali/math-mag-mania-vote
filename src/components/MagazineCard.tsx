import { useState } from "react";
import { Magazine } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, RotateCcw } from "lucide-react";
import { useVoteContext } from "@/context/VoteContext";

interface MagazineCardProps {
  magazine: Magazine;
  totalVotes: number;
}

export function MagazineCard({ magazine, totalVotes }: MagazineCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { updateVotes, hasVoted, votedMagazineId, resetVote } = useVoteContext();
  
  const handleVote = () => {
    if (hasVoted && votedMagazineId !== magazine.id) {
      // If user has already voted for a different magazine, reset first
      resetVote().then(() => {
        updateVotes(magazine.id);
      });
    } else if (!hasVoted) {
      updateVotes(magazine.id);
    }
  };

  const openMagazine = () => {
    window.open(magazine.flipHtml5Url, "_blank", "noopener,noreferrer");
  };

  const votePercentage = totalVotes > 0 
    ? Math.round((magazine.votes / totalVotes) * 100) 
    : 0;
  const isVotedFor = votedMagazineId === magazine.id;

  return (
    <Card 
      className={`magazine-card overflow-hidden h-full flex flex-col ${
        isVotedFor ? "ring-2 ring-primary" : ""
      } animate-scale-in`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative cursor-pointer h-64 overflow-hidden"
        onClick={openMagazine}
      >
        <div className={`absolute inset-0 bg-gray-100 flex items-center justify-center`}>
          <span className="text-4xl text-gray-300 font-bold">{magazine.grade}</span>
        </div>
        <img 
          src={magazine.coverImage}
          alt={magazine.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white font-medium px-3 py-1 rounded-full bg-black/60">
            Click to View
          </span>
        </div>
        <Badge className="absolute top-2 right-2 bg-game-purple text-white animate-pulse-custom">
          {magazine.grade}
        </Badge>
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="text-lg font-bold mb-2">{magazine.title}</h3>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Votes</span>
            <span className="font-semibold">{magazine.votes}</span>
          </div>
          <Progress value={votePercentage} className="h-2" />
          <div className="mt-1 text-xs text-right text-muted-foreground">
            {votePercentage}%
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex flex-col">
        {magazine.qrCodeImage && (
          <div className="mb-4 w-full flex justify-center">
            <img 
              src={magazine.qrCodeImage} 
              alt={`QR Code for ${magazine.title}`} 
              className="h-32 w-32 object-contain"
            />
          </div>
        )}
        <div className="flex gap-4">
          {isVotedFor && (
            <Button 
              onClick={resetVote}
              className="w-1/2 px-1 py-1 text-xs h-7 font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              <RotateCcw className="mr-1 h-3 w-3" />
              Reset
            </Button>
          )}
          <Button 
            onClick={handleVote}
            disabled={hasVoted && !isVotedFor}
            className={`vote-button flex-1 px-1 py-1 text-xs h-7 font-semibold ${
              isVotedFor 
                ? "bg-primary/80 hover:bg-primary/90" 
                : hasVoted 
                  ? "bg-muted hover:bg-muted" 
                  : "bg-game-orange hover:bg-game-orange/90"
            }`}
          >
            <Vote className="mr-1 h-3 w-3" />
            {isVotedFor 
              ? "Thank you!" 
              : hasVoted 
                ? "Already Voted" 
                : "Vote"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
