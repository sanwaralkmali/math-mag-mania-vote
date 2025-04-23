
import { useMemo } from "react";
import { Magazine, GradeGroup } from "@/types";
import { MagazineCard } from "@/components/MagazineCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MagazineGridProps {
  magazines: Magazine[];
}

export function MagazineGrid({ magazines }: MagazineGridProps) {
  // Total votes across all magazines
  const totalVotes = useMemo(() => 
    magazines.reduce((sum, magazine) => sum + magazine.votes, 0),
    [magazines]
  );
  
  // Group magazines by grade
  const gradeGroups = useMemo(() => {
    const groups: Record<string, Magazine[]> = {};
    
    magazines.forEach(magazine => {
      if (!groups[magazine.grade]) {
        groups[magazine.grade] = [];
      }
      groups[magazine.grade].push(magazine);
    });
    
    // Convert to array and sort by grade
    return Object.entries(groups)
      .map(([grade, magazines]) => ({ grade, magazines }))
      .sort((a, b) => a.grade.localeCompare(b.grade));
  }, [magazines]);
  
  return (
    <div className="w-full">
      <Tabs defaultValue={gradeGroups[0]?.grade || "all"} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="bg-game-purple-light/50">
            <TabsTrigger 
              value="all"
              className="data-[state=active]:bg-game-purple data-[state=active]:text-white"
            >
              All Grades
            </TabsTrigger>
            {gradeGroups.map((group) => (
              <TabsTrigger 
                key={group.grade}
                value={group.grade}
                className="data-[state=active]:bg-game-purple data-[state=active]:text-white"
              >
                {group.grade}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {magazines.map((magazine) => (
              <div key={magazine.id} className="animate-fade-in">
                <MagazineCard 
                  magazine={magazine} 
                  totalVotes={totalVotes} 
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {gradeGroups.map((group) => (
          <TabsContent key={group.grade} value={group.grade} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {group.magazines.map((magazine) => (
                <div key={magazine.id} className="animate-fade-in">
                  <MagazineCard 
                    magazine={magazine} 
                    totalVotes={totalVotes} 
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
