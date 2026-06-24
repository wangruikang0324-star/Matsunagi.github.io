export const profileCopy = {
  utilitarian: {
    title: "功利优化型",
    subtitle: "偏结果最大化",
    description: "你更容易把注意力放在总体收益、效率和可比较的后果上。"
  },
  deontological: {
    title: "规则优先型",
    subtitle: "偏权利与义务",
    description: "你更容易把注意力放在不可侵犯的原则、边界和个人权利上。"
  },
  empathetic: {
    title: "情感优先型",
    subtitle: "偏共情与照护",
    description: "你更容易把注意力放在具体处境、可感的伤害和关系中的责任上。"
  },
  balanced: {
    title: "混合型",
    subtitle: "在原则之间权衡",
    description: "你没有单一主导倾向，更常在结果、规则和共情之间来回校准。"
  }
};

export function classifyProfile(score) {
  const total = score.utilitarian + score.deontology + score.empathy;

  if (total <= 0) return "balanced";

  const u = score.utilitarian / total;
  const d = score.deontology / total;
  const e = score.empathy / total;

  if (u > 0.45) return "utilitarian";
  if (d > 0.45) return "deontological";
  if (e > 0.45) return "empathetic";
  return "balanced";
}
