import React, { createContext, useContext, useState, useEffect } from "react";
import { Magazine } from "@/types";

const initialMagazines: Magazine[] = [
  {
    id: "11a",
    title: "Grade 11A Math Magazine",
    grade: "11A",
    coverImage: "/images/magazines/G11A_CP.png",
    flipHtml5Url: "https://online.fliphtml5.com/plyrp/ikfu/",
    qrCodeImage: "/images/qr_codes/G11A_QR.png",
    votes: 0
  },
  {
    id: "11b",
    title: "Grade 11B Math Magazine",
    grade: "11B",
    coverImage: "/images/magazines/G11B_CP.png",
    flipHtml5Url: "https://online.fliphtml5.com/plyrp/ylzh/",
    qrCodeImage: "/images/qr_codes/G11B_QR.png",
    votes: 0
  },
  {
    id: "12a",
    title: "Grade 12A Math Magazine",
    grade: "12A",
    coverImage: "/images/magazines/G12A_CP.png",
    flipHtml5Url: "https://online.fliphtml5.com/example/12a/",
    qrCodeImage: "/images/qr_codes/G12A_QR.png",
    votes: 0
  },
  {
    id: "12b",
    title: "Grade 12B Math Magazine",
    grade: "12B",
    coverImage: "/images/magazines/G12B_CP.png",
    flipHtml5Url: "https://online.fliphtml5.com/plyrp/cbmq/",
    qrCodeImage: "/images/qr_codes/G12B_QR.png",
    votes: 0
  }
];

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

  useEffect(() => {
    localStorage.setItem("mathMagazines", JSON.stringify(magazines));
  }, [magazines]);

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
    setTimeout(() => setThankYouVisible(false), 3000);
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
