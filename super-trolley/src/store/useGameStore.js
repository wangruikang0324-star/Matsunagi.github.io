import { create } from "zustand";
import { applyChoiceScore, emptyScore } from "../core/engine.js";
import dilemmas from "../data/dilemmas.json";

const initialState = {
  phase: "intro",
  currentIndex: 0,
  score: emptyScore,
  answers: [],
  hasFinished: false
};

export const useGameStore = create((set, get) => ({
  ...initialState,
  start: () =>
    set({
      phase: "game",
      currentIndex: 0,
      score: emptyScore,
      answers: [],
      hasFinished: false
    }),
  selectChoice: (dilemma, choice) => {
    const nextScore = applyChoiceScore(get().score, choice);
    const nextAnswers = [
      ...get().answers,
      {
        dilemmaId: dilemma.id,
        dilemmaTitle: dilemma.title,
        choiceId: choice.id,
        choiceText: choice.text,
        score: choice.score
      }
    ];

    set({
      score: nextScore,
      answers: nextAnswers
    });
  },
  nextQuestion: () => {
    const nextIndex = get().currentIndex + 1;

    if (nextIndex >= dilemmas.length) {
      set({
        hasFinished: true,
        phase: "result"
      });
      return;
    }

    set({ currentIndex: nextIndex });
  },
  restart: () => set({ ...initialState })
}));
