import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MagazineGrid } from "@/components/MagazineGrid";
import { ThankYouMessage } from "@/components/ThankYouMessage";
import { useVoteContext } from "@/context/VoteContext";

const IndexContent = () => {
  const { magazines } = useVoteContext();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-game-purple to-game-orange bg-clip-text text-transparent">
            Vote for Your Favorite Math Magazine
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our talented students from Grades 11A, 11B, 12A, and 12B have created amazing math magazines.
            Browse through them and vote for your favorite!
          </p>
        </div>
        
        <div className="relative">
          {/* Decorative math elements */}
          <div className="absolute -top-10 -left-0 text-game-purple/50 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>∑</div>
          <div className="absolute -top-15 -right-10 text-game-blue/50 text-3xl animate-float" style={{ animationDelay: '1.2s' }}>π</div>
          <div className="absolute -bottom-10 -left-5 text-game-orange/50 text-6xl rotate-12 animate-float" style={{ animationDelay: '0.8s' }}>∞</div>
          <div className="absolute -bottom-40 right-10 text-5xl rotate-12 animate-float" style={{ animationDelay: '1.7s' }}>√</div>
          <div className="absolute -top-20 left-1/4 text-game-orange/50 text-4xl animate-float" style={{ animationDelay: '2.1s' }}>∫</div>
          
          <MagazineGrid magazines={magazines} />
        </div>
      </main>
      
      <Footer />
      <ThankYouMessage />
    </div>
  );
};

const Index = () => {
  return <IndexContent />;
};

export default Index;
