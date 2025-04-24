import React, { createContext, useContext, useState, useEffect } from "react";
import { Magazine } from "@/types";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

interface VoteContextProps {
  magazines: Magazine[];
  updateVotes: (magazineId: string) => Promise<void>;
  hasVoted: boolean;
  setHasVoted: (value: boolean) => void;
  votedMagazineId: string | null;
  setVotedMagazineId: (id: string | null) => void;
  thankYouVisible: boolean;
  setThankYouVisible: (visible: boolean) => void;
  resetVote: () => Promise<void>;
}

const VoteContext = createContext<VoteContextProps | undefined>(undefined);

export const VoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    return localStorage.getItem("hasVoted") === "true";
  });
  const [votedMagazineId, setVotedMagazineId] = useState<string | null>(() => {
    return localStorage.getItem("votedMagazineId");
  });
  const [thankYouVisible, setThankYouVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await axios.get(`${API_URL}/magazines`);
        setMagazines(response.data);
      } catch (error) {
        console.error("Error fetching magazines:", error);
      }
    };
    fetchMagazines();
  }, []);

  useEffect(() => {
    localStorage.setItem("hasVoted", hasVoted.toString());
    if (votedMagazineId) {
      localStorage.setItem("votedMagazineId", votedMagazineId);
    } else {
      localStorage.removeItem("votedMagazineId");
    }
  }, [hasVoted, votedMagazineId]);

  const updateVotes = async (magazineId: string) => {
    try {
      // If user has already voted, first remove their previous vote
      if (votedMagazineId) {
        await axios.post(`${API_URL}/unvote/${votedMagazineId}`);
      }

      // Add the new vote
      const response = await axios.post(`${API_URL}/vote/${magazineId}`);
      
      // Update the magazines state with the new vote counts
      const updatedMagazines = await axios.get(`${API_URL}/magazines`);
      setMagazines(updatedMagazines.data);
      
      setHasVoted(true);
      setVotedMagazineId(magazineId);
      setThankYouVisible(true);
      setTimeout(() => setThankYouVisible(false), 3000);
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };

  const resetVote = async () => {
    try {
      if (votedMagazineId) {
        await axios.post(`${API_URL}/unvote/${votedMagazineId}`);
        const updatedMagazines = await axios.get(`${API_URL}/magazines`);
        setMagazines(updatedMagazines.data);
      }
      setHasVoted(false);
      setVotedMagazineId(null);
    } catch (error) {
      console.error("Error resetting vote:", error);
    }
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
      setThankYouVisible,
      resetVote
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
