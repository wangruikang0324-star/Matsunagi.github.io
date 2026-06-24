import { motion } from "framer-motion";

export default function ChoiceButton({ choice, onSelect }) {
  const mood = getChoiceMood(choice.score);
  const hoverClass = {
    utilitarian:
      "hover:border-emerald-600 hover:bg-emerald-50 focus:ring-emerald-200",
    deontology: "hover:border-sky-700 hover:bg-sky-50 focus:ring-sky-200",
    empathy: "hover:border-rose-500 hover:bg-rose-50 focus:ring-rose-200",
    mixed: "hover:border-amber-600 hover:bg-amber-50 focus:ring-amber-200"
  }[mood];

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onSelect(choice)}
      className={`w-full rounded border border-stone-300 bg-white px-4 py-4 text-left text-base font-semibold leading-7 text-stone-900 shadow-sm transition focus:outline-none focus:ring-4 ${hoverClass}`}
    >
      <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded bg-stone-900 text-sm font-black text-white">
        {choice.id}
      </span>
      <span className="ml-3 break-words">{choice.text}</span>
    </motion.button>
  );
}

function getChoiceMood(score) {
  const entries = [
    ["utilitarian", score.utilitarian || 0],
    ["deontology", score.deontology || 0],
    ["empathy", score.empathy || 0]
  ];
  const max = Math.max(...entries.map((entry) => entry[1]));
  const winners = entries.filter((entry) => entry[1] === max && max > 0);
  return winners.length === 1 ? winners[0][0] : "mixed";
}
