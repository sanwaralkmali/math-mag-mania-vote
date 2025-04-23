
import { VoteProvider } from "@/context/VoteContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MagazineGrid } from "@/components/MagazineGrid";
import { ThankYouMessage } from "@/components/ThankYouMessage";
import { useVoteContext } from "@/context/VoteContext";

/* More math symbols! Will be rendered below */
const floatingMathSymbols = [
  { className: "math-symbol-bg", style: { left: "11vw", top: "11vh" }, text: "π" },
  { className: "math-symbol-bg math-symbol-bg2", text: "∑" },
  { className: "math-symbol-bg math-symbol-bg3", text: "√" },
  { className: "math-symbol-bg math-symbol-bg4", text: "∫" },
  { className: "math-symbol-bg math-symbol-bg5", text: "Δ" },
  { className: "math-symbol-bg math-symbol-bg6", text: "∞" },
  { className: "math-symbol-bg math-symbol-bg7", text: "θ" },
  { className: "math-symbol-bg math-symbol-bg8", text: "λ" },
  { className: "math-symbol-bg math-symbol-bg9", text: "Σ" },
  { className: "math-symbol-bg math-symbol-bg10", text: "≈" },
];

const IndexContent = () => {
  const { magazines } = useVoteContext();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Floating math symbols in the background */}
      {floatingMathSymbols.map((s, i) => (
        <div key={i} className={s.className} style={s.style as any}>
          {s.text}
        </div>
      ))}

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-white">
            Vote for Your Favorite Math Magazine
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto bg-black/50 py-2 rounded-lg">
            Our talented students from Grades 11A, 11B, 12A, and 12B have created amazing math magazines.
            Browse through them and vote for your favorite!
          </p>
        </div>

        <MagazineGrid magazines={magazines} />
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
