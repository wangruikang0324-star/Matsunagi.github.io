export default function AnswerHistory({ answers }) {
  return (
    <section className="rounded border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
      <h2 className="text-xl font-black text-stone-950">回答历史</h2>
      <div className="mt-4 space-y-3">
        {answers.map((answer, index) => (
          <article
            key={`${answer.dilemmaId}-${index}`}
            className="rounded border border-stone-200 bg-stone-50 p-3"
          >
            <div className="text-sm font-black text-stone-500">
              {String(index + 1).padStart(2, "0")} · {answer.dilemmaTitle}
            </div>
            <div className="mt-1 text-sm font-semibold leading-6 text-stone-800">
              {answer.choiceId}. {answer.choiceText}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
