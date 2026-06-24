import { classifyProfile } from "../core/classifier.js";
import { downloadShareImage } from "../core/shareImage.js";
import { useGameStore } from "../store/useGameStore.js";
import ResultProfile from "../components/ResultProfile.jsx";
import TrolleyFinale from "../components/TrolleyFinale.jsx";
import AnswerHistory from "../components/AnswerHistory.jsx";

export default function Result() {
  const score = useGameStore((state) => state.score);
  const answers = useGameStore((state) => state.answers);
  const restart = useGameStore((state) => state.restart);
  const profile = classifyProfile(score);

  return (
    <section className="min-h-screen px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl space-y-5">
        <ResultProfile score={score} />
        <TrolleyFinale profile={profile} />
        <AnswerHistory answers={answers} />
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => downloadShareImage({ score, answers, profile })}
            className="w-full rounded border border-stone-950 bg-white px-5 py-4 text-base font-black text-stone-950 transition hover:bg-amber-50"
          >
            保存分享图
          </button>
          <button
            onClick={restart}
            className="w-full rounded bg-stone-950 px-5 py-4 text-base font-black text-white transition hover:bg-emerald-800"
          >
            重新开始
          </button>
        </div>
      </div>
    </section>
  );
}
