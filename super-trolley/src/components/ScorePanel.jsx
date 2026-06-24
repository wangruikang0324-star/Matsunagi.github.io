import { scoreToPercentages } from "../core/engine.js";

const labels = {
  utilitarian: "结果导向",
  deontology: "规则导向",
  empathy: "共情导向"
};

const colors = {
  utilitarian: "bg-emerald-600",
  deontology: "bg-sky-700",
  empathy: "bg-rose-500"
};

export default function ScorePanel({ score, compact = false }) {
  const percentages = scoreToPercentages(score);
  const keys = ["utilitarian", "deontology", "empathy"];

  return (
    <section className="rounded border border-stone-200 bg-white/85 p-4">
      <h2 className="text-sm font-black text-stone-800">
        {compact ? "当前倾向" : "三维倾向"}
      </h2>
      <div className="mt-4 space-y-3">
        {keys.map((key) => (
          <div key={key}>
            <div className="mb-1 flex justify-between text-xs font-semibold text-stone-600">
              <span>{labels[key]}</span>
              <span>{percentages[key]}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded bg-stone-200">
              <div
                className={`h-full rounded ${colors[key]} transition-all duration-300`}
                style={{ width: `${percentages[key]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
