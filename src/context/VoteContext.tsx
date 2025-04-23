
import React, { createContext, useContext, useState, useEffect } from "react";
import { Magazine } from "@/types";

interface VoteContextProps {
  magazines: Magazine[];
  updateVotes: (magazineId: string) => void;
  hasVoted: boolean;
  setHasVoted: (value: boolean) => void;
  votedMagazineId: string | null;
  setVotedMagazineId: (id: string | null) => void;
  thankYouVisible: boolean;
  setThankYouVisible: (visible: boolean) => void;
}

const VoteContext = createContext<VoteContextProps | undefined>(undefined);

export const VoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load magazines from localStorage or use initial data
  const [magazines, setMagazines] = useState<Magazine[]>(() => {
    const savedMagazines = localStorage.getItem("mathMagazines");
    return savedMagazines ? JSON.parse(savedMagazines) : initialMagazines;
  });
  
  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    return localStorage.getItem("hasVoted") === "true";
  });
  
  const [votedMagazineId, setVotedMagazineId] = useState<string | null>(() => {
    return localStorage.getItem("votedMagazineId");
  });
  
  const [thankYouVisible, setThankYouVisible] = useState<boolean>(false);

  // Save magazines to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mathMagazines", JSON.stringify(magazines));
  }, [magazines]);

  // Save voting status to localStorage
  useEffect(() => {
    localStorage.setItem("hasVoted", hasVoted.toString());
    if (votedMagazineId) {
      localStorage.setItem("votedMagazineId", votedMagazineId);
    } else {
      localStorage.removeItem("votedMagazineId");
    }
  }, [hasVoted, votedMagazineId]);

  const updateVotes = (magazineId: string) => {
    setMagazines(prevMagazines => 
      prevMagazines.map(magazine => 
        magazine.id === magazineId 
          ? { ...magazine, votes: magazine.votes + 1 } 
          : magazine
      )
    );
    setHasVoted(true);
    setVotedMagazineId(magazineId);
    setThankYouVisible(true);
    
    // Hide thank you message after 3 seconds
    setTimeout(() => {
      setThankYouVisible(false);
    }, 3000);
  };

  return (
    <VoteContext.Provider value={{ 
      magazines, 
      updateVotes, 
      hasVoted, 
      setHasVoted,
      votedMagazineId,
      setVotedMagazineId,
      thankYouVisible,
      setThankYouVisible
    }}>
      {children}
    </VoteContext.Provider>
  );
};

export const useVoteContext = (): VoteContextProps => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error("useVoteContext must be used within a VoteProvider");
  }
  return context;
};

// Example magazine data - replace with your actual magazines
const initialMagazines: Magazine[] = [
  {
    id: "11a-1",
    title: "Algebra Adventures",
    grade: "11A",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&h=700",
    flipHtml5Url: "https://online.fliphtml5.com/example/11a-1/",
    qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://online.fliphtml5.com/example/11a-1/",
    votes: 0
  },
  {
    id: "11a-2",
    title: "Math Masters",
    grade: "11A",
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&h=700",
    flipHtml5Url: "https://online.fliphtml5.com/example/11a-2/",
    qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://online.fliphtml5.com/example/11a-2/",
    votes: 0
  },
  {
    id: "11b-1",
    title: "Geometry Gems",
    grade: "11B",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=700",
    flipHtml5Url: "https://online.fliphtml5.com/example/11b-1/",
    qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://online.fliphtml5.com/example/11b-1/",
    votes: 0
  },
  {
    id: "11b-2",
    title: "Number Theory News",
    grade: "11B",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&h=700",
    flipHtml5Url: "https://online.fliphtml5.com/example/11b-2/",
    qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://online.fliphtml5.com/example/11b-2/",
    votes: 0
  },
  {
    id: "12a-1",
    title: "Calculus Chronicles",
    grade: "12A",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=700",
    flipHtml5Url: "https://online.fliphtml5.com/example/12a-1/",
    qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://online.fliphtml5.com/example/12a-1/",
    votes: 0
  },
  {
    id: "12a-2",
    title: "Statistics Spotlight",
    grade: "12A",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&h=700",
    flipHtml5Url: "https://online.fliphtml5.com/example/12a-2/",
    qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://online.fliphtml5.com/example/12a-2/",
    votes: 0
  },
  {
    id: "12b-1",
    title: "Probability Pioneers",
    grade: "12B",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&h=700",
    flipHtml5Url: "https://online.fliphtml5.com/example/12b-1/",
    qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://online.fliphtml5.com/example/12b-1/",
    votes: 0
  },
  {
    id: "12b-2",
    title: "Mathematical Marvels",
    grade: "12B",
    coverImage: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=500&h=700",
    flipHtml5Url: "https://online.fliphtml5.com/example/12b-2/",
    qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://online.fliphtml5.com/example/12b-2/",
    votes: 0
  }
];
