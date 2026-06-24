import { motion } from "framer-motion";
import { profileCopy } from "../core/classifier.js";

const finales = {
  utilitarian: {
    bg: "bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(135deg,#052e16,#111827_58%,#020617)] bg-[length:26px_100%,auto]",
    rail: "bg-amber-300",
    trolley: "bg-emerald-400",
    badge: "Σ",
    symbols: ["Σ", "+", "MAX"],
    label: "效率至上",
    text: "冷酷狂傲号启动：数字、速度和总收益把车灯打到最亮。",
    animate: {
      x: ["-48%", "72vw"],
      scale: [0.72, 1.22],
      skewX: [-5, -8]
    },
    duration: 1.45
  },
  deontological: {
    bg: "bg-[linear-gradient(90deg,rgba(186,230,253,.16)_1px,transparent_1px),linear-gradient(135deg,#082f49,#0f172a)] bg-[length:38px_100%,auto]",
    rail: "bg-sky-200",
    trolley: "bg-sky-500",
    badge: "§",
    symbols: ["§", "□", "OK"],
    label: "原则优先",
    text: "平静秩序号进站：轨道、信号和边界都按规则排列。",
    animate: {
      x: ["-36%", "58vw"],
      scale: [0.78, 0.98]
    },
    duration: 3.4
  },
  empathetic: {
    bg: "bg-[radial-gradient(circle_at_18%_28%,rgba(251,207,232,.55),transparent_20%),radial-gradient(circle_at_76%_35%,rgba(254,240,138,.42),transparent_22%),linear-gradient(135deg,#831843,#9f1239)]",
    rail: "bg-rose-200",
    trolley: "bg-rose-400",
    badge: "♥",
    symbols: ["♥", "☺", "抱抱"],
    label: "照护模式",
    text: "温和可爱号慢慢驶来：车厢里留着靠垫、热茶和一点点心软。",
    animate: {
      x: ["-38%", "58vw"],
      y: [0, -10],
      scale: [0.76, 1.02],
      rotate: [-1, 1]
    },
    duration: 3.1
  },
  balanced: {
    bg: "bg-[radial-gradient(circle_at_22%_30%,rgba(250,204,21,.4),transparent_18%),radial-gradient(circle_at_76%_42%,rgba(125,211,252,.34),transparent_20%),linear-gradient(135deg,#292524,#312e81_62%,#0f172a)]",
    rail: "bg-lime-200",
    trolley: "bg-amber-400",
    badge: "?",
    symbols: ["?", "↔", "晕"],
    label: "权衡中",
    text: "难以抉择号左右摇摆：三套原则都在驾驶室里抢方向盘。",
    animate: {
      x: ["-38%", "52vw"],
      y: [-8, 10],
      scale: [0.76, 1.02],
      rotate: [-7, 8]
    },
    duration: 1.8
  }
};

export default function TrolleyFinale({ profile }) {
  const style = finales[profile] || finales.balanced;

  return (
    <section className={`relative h-64 overflow-hidden rounded ${style.bg} text-white`}>
      <div className="absolute inset-x-0 bottom-12 h-2 bg-white/20" />
      <div className={`absolute inset-x-0 bottom-16 h-1 ${style.rail}`} />
      <motion.div
        animate={style.animate}
        transition={{
          duration: style.duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
        className={`absolute bottom-20 left-0 h-24 w-40 rounded border-4 border-white ${style.trolley} shadow-soft`}
      >
        <div className="absolute -top-6 left-1/2 grid h-8 w-9 -translate-x-1/2 place-items-center rounded-full border-4 border-white bg-orange-50 text-base font-black text-stone-900">
          {style.badge}
        </div>
        <div className="absolute left-4 top-4 h-9 w-9 rounded bg-white/85" />
        <div className="absolute right-4 top-4 h-9 w-9 rounded bg-white/85" />
        <Passenger className="left-9" />
        <Passenger className="right-9" />
        <div className="absolute -bottom-6 left-6 h-12 w-12 rounded-full border-4 border-white bg-stone-900" />
        <div className="absolute -bottom-6 right-6 h-12 w-12 rounded-full border-4 border-white bg-stone-900" />
      </motion.div>
      <div className="absolute left-5 right-5 top-5">
        <div className="text-sm font-black uppercase text-white/70">
          {profileCopy[profile].title}
        </div>
        <p className="mt-2 max-w-lg text-base font-bold leading-7">{style.text}</p>
        <span className="mt-2 inline-flex rounded border border-white/25 bg-white/10 px-2 py-1 text-xs font-black">
          {style.label}
        </span>
      </div>
      <div className="absolute bottom-5 right-6 flex gap-2 text-2xl font-black opacity-90">
        {style.symbols.map((item, index) => (
          <motion.span
            key={item}
            animate={{ y: [0, -9, 0], rotate: [-4, 4, -4] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.25
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function Passenger({ className }) {
  return (
    <span
      className={`absolute top-14 h-5 w-5 rounded-full border-2 border-white bg-amber-200 after:absolute after:left-1 after:top-[5px] after:h-1 after:w-2 after:rounded-full after:border-b-2 after:border-stone-800 ${className}`}
    />
  );
}
