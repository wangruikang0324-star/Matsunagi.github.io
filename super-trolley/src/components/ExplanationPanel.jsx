import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExplanationPanel({ explanation }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded border border-stone-200 bg-white/85">
      <button
        onClick={() => setIsOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-bold text-stone-800"
      >
        <span>资料与讨论</span>
        <span aria-hidden="true" className="text-lg">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-stone-200 px-4 py-4 text-sm leading-7 text-stone-700">
              <InfoRow label="来源类型" value={explanation.sourceType} />
              <InfoRow label="简明来源" value={explanation.origin} />
              <InfoRow label="原型后果" value={explanation.consequence} />
              <InfoRow label="现实讨论" value={explanation.discussion} />
              <div>
                <div className="mb-2 font-bold text-stone-900">类似案例</div>
                <div className="flex flex-wrap gap-2">
                  {explanation.similarCases.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-stone-300 px-2 py-1 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <div className="font-bold text-stone-900">{label}</div>
      <p>{value}</p>
    </div>
  );
}
