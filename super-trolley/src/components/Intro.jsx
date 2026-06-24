import { motion } from "framer-motion";
import { useGameStore } from "../store/useGameStore.js";

export default function Intro() {
  const start = useGameStore((state) => state.start);

  return (
    <section className="grain flex min-h-screen items-center justify-center px-5 py-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-3xl"
      >
        <div className="mb-5 inline-flex rounded border border-stone-300 bg-white/75 px-3 py-1 text-sm text-stone-600">
          Ethics Simulator
        </div>
        <h1 className="text-4xl font-black leading-tight text-stone-950 sm:text-6xl">
          Super Trolley
          <span className="mt-2 block text-2xl font-bold text-emerald-700 sm:text-4xl">
            超级大电车
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
          这是一套轻量的伦理决策模拟系统。你会连续面对二选一的道德困境，系统只记录倾向，不给出标准答案。
        </p>
        <div className="mt-7 border-l-4 border-amber-500 bg-white/80 p-4 text-sm leading-7 text-stone-700 shadow-soft">
          内容仅用于思辨启蒙与娱乐，不构成法律、医疗、政治或道德建议。现实议题均经过抽象化处理。
        </div>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={start}
          className="mt-8 w-full rounded bg-stone-950 px-6 py-4 text-base font-bold text-white shadow-soft transition hover:bg-emerald-800 sm:w-auto"
        >
          开始模拟
        </motion.button>
      </motion.div>
    </section>
  );
}
