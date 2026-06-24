import { motion } from "framer-motion";
import { classifyProfile, profileCopy } from "../core/classifier.js";
import ScorePanel from "./ScorePanel.jsx";

export default function ResultProfile({ score }) {
  const profile = classifyProfile(score);
  const copy = profileCopy[profile];

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded border border-stone-200 bg-white p-5 shadow-soft sm:p-6"
    >
      <div className="text-sm font-black uppercase text-emerald-700">
        Your profile
      </div>
      <h1 className="mt-2 text-3xl font-black text-stone-950">{copy.title}</h1>
      <p className="mt-2 text-lg font-bold text-stone-700">{copy.subtitle}</p>
      <p className="mt-4 text-base leading-8 text-stone-700">
        {copy.description}
      </p>
      <div className="mt-6">
        <ScorePanel score={score} />
      </div>
    </motion.section>
  );
}
