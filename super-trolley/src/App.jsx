import Intro from "./components/Intro.jsx";
import Game from "./pages/Game.jsx";
import Result from "./pages/Result.jsx";
import { useGameStore } from "./store/useGameStore.js";

export default function App() {
  const phase = useGameStore((state) => state.phase);
  const hasFinished = useGameStore((state) => state.hasFinished);

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-stone-900">
      {phase === "intro" && <Intro />}
      {phase === "game" && !hasFinished && <Game />}
      {(phase === "result" || hasFinished) && <Result />}
    </main>
  );
}
