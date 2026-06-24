import { AnimatePresence } from "framer-motion";
import dilemmas from "../data/dilemmas.json";
import DilemmaCard from "../components/DilemmaCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import ScorePanel from "../components/ScorePanel.jsx";
import { useGameStore } from "../store/useGameStore.js";

export default function Game() {
  const currentIndex = useGameStore((state) => state.currentIndex);
  const score = useGameStore((state) => state.score);
  const selectChoice = useGameStore((state) => state.selectChoice);
  const nextQuestion = useGameStore((state) => state.nextQuestion);
  const dilemma = dilemmas[currentIndex];

  const handleSelect = (choice) => {
    selectChoice(dilemma, choice);
    window.setTimeout(() => nextQuestion(), 220);
  };

  return (
    <section className="min-h-screen px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <ProgressBar current={currentIndex + 1} total={dilemmas.length} />
          <AnimatePresence mode="wait">
            <DilemmaCard
              key={dilemma.id}
              dilemma={dilemma}
              score={score}
              currentIndex={currentIndex}
              total={dilemmas.length}
              onSelect={handleSelect}
            />
          </AnimatePresence>
        </div>
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <ScorePanel score={score} compact />
        </aside>
      </div>
    </section>
  );
}
