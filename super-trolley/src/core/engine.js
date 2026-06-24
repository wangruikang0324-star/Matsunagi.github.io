export const emptyScore = {
  utilitarian: 0,
  deontology: 0,
  empathy: 0
};

export function applyChoiceScore(prev, choice) {
  return {
    utilitarian: prev.utilitarian + (choice.score.utilitarian || 0),
    deontology: prev.deontology + (choice.score.deontology || 0),
    empathy: prev.empathy + (choice.score.empathy || 0)
  };
}

export function scoreToPercentages(score) {
  const total = score.utilitarian + score.deontology + score.empathy;

  if (total <= 0) {
    return {
      utilitarian: 0,
      deontology: 0,
      empathy: 0
    };
  }

  return {
    utilitarian: Math.round((score.utilitarian / total) * 100),
    deontology: Math.round((score.deontology / total) * 100),
    empathy: Math.round((score.empathy / total) * 100)
  };
}
