export default function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div aria-label="游戏进度" className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-stone-500">
        <span>
          {current} / {total}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded bg-stone-200">
        <div
          className="h-full rounded bg-emerald-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
