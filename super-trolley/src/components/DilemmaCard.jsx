import { motion } from "framer-motion";
import ChoiceButton from "./ChoiceButton.jsx";
import ExplanationPanel from "./ExplanationPanel.jsx";
import { classifyProfile } from "../core/classifier.js";

const palette = {
  classic: "from-emerald-100 via-amber-100 to-white",
  literary: "from-rose-100 via-amber-100 to-white",
  historical: "from-sky-100 via-stone-100 to-white",
  policy: "from-lime-100 via-stone-100 to-white",
  bioethics: "from-teal-100 via-rose-100 to-white"
};

export default function DilemmaCard({ dilemma, score, currentIndex, total, onSelect }) {
  return (
    <motion.article
      key={dilemma.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.28 }}
      className="overflow-hidden rounded border border-stone-200 bg-white shadow-soft"
    >
      <Illustration
        dilemma={dilemma}
        score={score}
        currentIndex={currentIndex}
        total={total}
      />
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap gap-2 text-xs font-bold text-stone-600">
          <span className="rounded border border-stone-300 px-2 py-1">
            {dilemma.category}
          </span>
          <span className="rounded border border-stone-300 px-2 py-1">
            sensitivity: {dilemma.sensitivity}
          </span>
        </div>
        <h1 className="text-2xl font-black leading-tight text-stone-950">
          <span className="mr-2">{titleEmoji(dilemma)}</span>
          {dilemma.title}
        </h1>
        <p className="mt-4 text-base leading-8 text-stone-700">
          {dilemma.context}
        </p>
        <div className="mt-6 grid gap-3">
          {dilemma.choices.map((choice) => (
            <ChoiceButton key={choice.id} choice={choice} onSelect={onSelect} />
          ))}
        </div>
        <div className="mt-5">
          <ExplanationPanel explanation={dilemma.explanation} />
        </div>
      </div>
    </motion.article>
  );
}

function titleEmoji(dilemma) {
  const byTitle = {
    "爆炸的油箱": "🔥",
    "圣·安妮的女生": "🛏️",
    "经双方同意的吃人": "🍽️",
    "平等主义的噩梦": "🎧",
    "录取中的公正": "🎓",
    "校正考试的不足": "📝"
  };
  const byCategory = {
    classic: "🚋",
    literary: "📖",
    historical: "🧭",
    policy: "📊",
    bioethics: "🫀"
  };
  return byTitle[dilemma.title] || byCategory[dilemma.category] || "💭";
}

const moods = {
  utilitarian: {
    badge: "Σ",
    label: "收益最大化",
    spark: "+5",
    trolley: "bg-emerald-500 shadow-[0_0_0_8px_rgba(16,185,129,0.18),0_18px_42px_rgba(16,185,129,0.32)]",
    gradient: "from-emerald-200 via-amber-100 to-white"
  },
  deontological: {
    badge: "§",
    label: "原则优先",
    spark: "NO",
    trolley: "bg-sky-500 shadow-[0_0_0_8px_rgba(14,165,233,0.18),0_18px_42px_rgba(14,165,233,0.3)]",
    gradient: "from-blue-100 via-sky-100 to-white"
  },
  empathetic: {
    badge: "♥",
    label: "照护模式",
    spark: "抱抱",
    trolley: "bg-rose-400 shadow-[0_0_0_8px_rgba(251,113,133,0.18),0_18px_42px_rgba(251,113,133,0.3)]",
    gradient: "from-rose-100 via-amber-100 to-white"
  },
  balanced: {
    badge: "?",
    label: "权衡中",
    spark: "嗯",
    trolley: "bg-amber-500 shadow-[0_0_0_8px_rgba(245,158,11,0.16),0_18px_42px_rgba(245,158,11,0.28)]",
    gradient: "from-lime-100 via-sky-100 to-white"
  }
};

function Illustration({ dilemma, score, currentIndex, total }) {
  const gradient = palette[dilemma.category] || palette.classic;
  const profile = classifyProfile(score);
  const mood = moods[profile];
  const progress = Math.round(((currentIndex + 1) / total) * 100);
  const left = Math.min(56, 12 + progress * 0.42);

  return (
    <div
      className={`relative h-56 overflow-hidden bg-gradient-to-br ${mood?.gradient || gradient}`}
    >
      <div className="absolute left-6 top-5 flex items-center gap-2 text-xs font-black text-stone-800">
        <span className="h-4 w-4 rounded-full border-2 border-stone-800 bg-white" />
        {mood.label}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-stone-800" />
      <div className="absolute bottom-10 left-1/2 h-3 w-[78%] -translate-x-1/2 rounded bg-stone-700" />
      <CartoonPerson className="left-[12%]" delay={0.1} />
      <CartoonPerson className="left-[75%]" delay={0.4} />
      <CartoonPerson className="left-[84%]" delay={0.8} />
      <motion.div
        animate={{ y: [0, -9, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[24%] top-[74px] grid h-9 w-9 place-items-center rounded-full bg-white/80 text-xs font-black text-stone-800"
      >
        {mood.spark}
      </motion.div>
      <motion.div
        animate={{ y: [0, -9, 0], rotate: [4, -4, 4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute right-[14%] top-[118px] grid h-9 w-9 place-items-center rounded-full bg-white/80 text-xs font-black text-stone-800"
      >
        !
      </motion.div>
      <motion.div
        animate={{ x: [0, 12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-14 h-20 w-32 rounded border-4 border-stone-800 ${mood.trolley}`}
        style={{ left: `${left}%` }}
      >
        <div className="absolute -top-6 left-1/2 grid h-8 w-9 -translate-x-1/2 place-items-center rounded-full border-4 border-stone-800 bg-orange-50 text-base font-black">
          {mood.badge}
        </div>
        <div className="absolute left-3 top-3 h-8 w-8 rounded bg-amber-100" />
        <div className="absolute right-3 top-3 h-8 w-8 rounded bg-amber-100" />
        <Passenger className="left-7" />
        <Passenger className="right-7" />
        <div className="absolute -bottom-5 left-5 h-10 w-10 rounded-full border-4 border-stone-800 bg-stone-100" />
        <div className="absolute -bottom-5 right-5 h-10 w-10 rounded-full border-4 border-stone-800 bg-stone-100" />
      </motion.div>
      <div className="absolute right-6 top-6 max-w-[45%] rounded border border-white/70 bg-white/70 px-3 py-2 text-xs font-bold text-stone-700 shadow-sm">
        {dilemma.illustration}
      </div>
      <div className="absolute bottom-6 right-8 flex gap-2">
        <span className="h-5 w-5 rounded-full bg-amber-400" />
        <span className="h-5 w-5 rounded-full bg-sky-500" />
        <span className="h-5 w-5 rounded-full bg-rose-500" />
      </div>
    </div>
  );
}

function CartoonPerson({ className, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute bottom-[49px] h-8 w-5 ${className}`}
    >
      <div className="absolute left-[3px] top-0 h-4 w-4 rounded-full border-2 border-stone-800 bg-amber-200 after:absolute after:left-1 after:top-[5px] after:h-1 after:w-2 after:rounded-full after:border-b-2 after:border-stone-800" />
      <div className="absolute left-[5px] top-[14px] h-4 w-3 rounded-t-md border-2 border-stone-800 bg-sky-400" />
    </motion.div>
  );
}

function Passenger({ className }) {
  return (
    <span
      className={`absolute top-11 h-5 w-5 rounded-full border-2 border-stone-800 bg-amber-200 after:absolute after:left-1 after:top-[5px] after:h-1 after:w-2 after:rounded-full after:border-b-2 after:border-stone-800 ${className}`}
    />
  );
}
