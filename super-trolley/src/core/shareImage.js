import { profileCopy } from "./classifier.js";
import { scoreToPercentages } from "./engine.js";

const shareCopy = {
  utilitarian: {
    headline: "冷静推进的收益号",
    analysis:
      "这辆电车擅长把混乱路线压缩成可比较的后果，判断果断、载重明确。它的优点是敢于承担复杂计算，也需要记得给不可量化的乘客留一盏灯。",
    theme: ["#052e16", "#10b981", "Σ", "MAX"]
  },
  deontological: {
    headline: "轨距稳定的原则号",
    analysis:
      "这辆电车行驶时很少越线，信号灯、边界和承诺都被认真维护。它的优点是可靠、公正、不轻易把人当作工具。",
    theme: ["#082f49", "#0ea5e9", "§", "ORDER"]
  },
  empathetic: {
    headline: "柔软但不脆弱的照护号",
    analysis:
      "这辆电车会放慢速度听见站台上的细小声音，尤其在意具体的人和正在发生的痛感。它的优点是敏锐、温和，也有保护弱者的稳定牵引力。",
    theme: ["#831843", "#fb7185", "♥", "CARE"]
  },
  balanced: {
    headline: "多轨并行的权衡号",
    analysis:
      "这辆电车的驾驶室里同时亮着好几盏仪表灯，转弯前会多看几次岔路。它的优点是谨慎、开放，能在互相冲突的原则之间保持弹性。",
    theme: ["#312e81", "#f59e0b", "?", "MIX"]
  }
};

export function downloadShareImage({ score, answers, profile }) {
  const percentages = scoreToPercentages(score);
  const copy = profileCopy[profile];
  const share = shareCopy[profile] || shareCopy.balanced;
  const summary = summarizeAnswers(answers);
  const highlights = pickHighlights(answers);
  const width = 1200;
  const height = 1500;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#f7f3ea";
  ctx.fillRect(0, 0, width, height);
  drawGrid(ctx, width, height);
  roundRect(ctx, 54, 54, width - 108, height - 108, 18, "#ffffff");
  drawWideShareHero(ctx, share.theme, 54, 54, width - 108, 300);

  ctx.fillStyle = "#1c1917";
  ctx.font = "900 36px 'Microsoft YaHei', sans-serif";
  ctx.fillText("Super Trolley 超级大电车", 90, 405);
  ctx.font = "900 58px 'Microsoft YaHei', sans-serif";
  ctx.fillText(copy.title, 90, 477);
  ctx.font = "500 24px 'Microsoft YaHei', sans-serif";
  wrapText(ctx, copy.description, 90, 525, 520, 34);

  drawRadar(ctx, 880, 520, 145, percentages);
  drawShareBar(ctx, "结果导向", percentages.utilitarian, 690, 705, "#059669");
  drawShareBar(ctx, "规则导向", percentages.deontology, 690, 765, "#0369a1");
  drawShareBar(ctx, "共情导向", percentages.empathy, 690, 825, "#f43f5e");

  roundRect(ctx, 90, 650, 540, 172, 14, "#fafaf9");
  ctx.fillStyle = "#292524";
  ctx.font = "900 23px 'Microsoft YaHei', sans-serif";
  ctx.fillText(share.headline, 116, 690);
  ctx.font = "500 20px 'Microsoft YaHei', sans-serif";
  wrapText(ctx, share.analysis, 116, 724, 486, 30);

  ctx.fillStyle = "#292524";
  ctx.font = "900 30px 'Microsoft YaHei', sans-serif";
  ctx.fillText("选择速览", 90, 900);

  drawSummaryPill(ctx, "结果型选择", summary.utilitarian, 90, 940, "#059669");
  drawSummaryPill(ctx, "规则型选择", summary.deontology, 335, 940, "#0369a1");
  drawSummaryPill(ctx, "共情型选择", summary.empathy, 580, 940, "#f43f5e");
  drawSummaryPill(ctx, "混合型选择", summary.mixed, 825, 940, "#d97706");

  let y = 1040;
  highlights.forEach((answer, index) => {
    roundRect(ctx, 90, y - 34, 1020, 74, 12, index % 2 ? "#fafaf9" : "#f5f5f4");
    ctx.fillStyle = "#1c1917";
    ctx.font = "900 21px 'Microsoft YaHei', sans-serif";
    trimText(ctx, answer.dilemmaTitle, 116, y, 330);
    ctx.font = "700 19px 'Microsoft YaHei', sans-serif";
    trimText(ctx, `${answer.choiceId}. ${answer.choiceText}`, 470, y, 470);
    ctx.fillStyle = "#78716c";
    ctx.font = "700 16px 'Microsoft YaHei', sans-serif";
    ctx.fillText(choiceLabel(answer.score), 116, y + 28);
    y += 96;
  });

  ctx.fillStyle = "#78716c";
  ctx.font = "600 18px 'Microsoft YaHei', sans-serif";
  ctx.fillText(`完整作答 ${answers.length} 题，图中仅展示代表性选择。仅用于伦理思辨与娱乐，不代表标准答案。`, 90, height - 82);

  const link = document.createElement("a");
  link.download = `super-trolley-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function summarizeAnswers(answers) {
  return answers.reduce(
    (acc, answer) => {
      acc[choiceMood(answer.score)] += 1;
      return acc;
    },
    { utilitarian: 0, deontology: 0, empathy: 0, mixed: 0 }
  );
}

function pickHighlights(answers) {
  const buckets = {};
  for (const answer of answers) {
    const mood = choiceMood(answer.score);
    if (!buckets[mood]) buckets[mood] = answer;
  }
  return [buckets.utilitarian, buckets.deontology, buckets.empathy, buckets.mixed]
    .filter(Boolean)
    .slice(0, 4);
}

function choiceMood(score) {
  const entries = [
    ["utilitarian", score.utilitarian || 0],
    ["deontology", score.deontology || 0],
    ["empathy", score.empathy || 0]
  ];
  const max = Math.max(...entries.map((entry) => entry[1]));
  const winners = entries.filter((entry) => entry[1] === max && max > 0);
  return winners.length === 1 ? winners[0][0] : "mixed";
}

function choiceLabel(score) {
  const labels = {
    utilitarian: "主要推动车轮：结果导向",
    deontology: "主要推动车轮：规则导向",
    empathy: "主要推动车轮：共情导向",
    mixed: "主要推动车轮：混合影响"
  };
  return labels[choiceMood(score)];
}

function drawSummaryPill(ctx, label, value, x, y, color) {
  roundRect(ctx, x, y - 34, 210, 58, 999, "#fafaf9");
  ctx.fillStyle = color;
  ctx.font = "900 28px 'Microsoft YaHei', sans-serif";
  ctx.fillText(String(value), x + 20, y + 4);
  ctx.fillStyle = "#44403c";
  ctx.font = "800 17px 'Microsoft YaHei', sans-serif";
  ctx.fillText(label, x + 64, y + 2);
}

function drawRadar(ctx, cx, cy, radius, p) {
  const axes = [
    { label: "结果", value: p.utilitarian, angle: -Math.PI / 2, color: "#059669" },
    { label: "规则", value: p.deontology, angle: Math.PI / 6, color: "#0369a1" },
    { label: "共情", value: p.empathy, angle: (5 * Math.PI) / 6, color: "#f43f5e" }
  ];
  roundRect(ctx, cx - 190, cy - 190, 380, 360, 18, "#fafaf9");
  ctx.strokeStyle = "#d6d3d1";
  ctx.lineWidth = 2;
  for (const step of [0.33, 0.66, 1]) {
    drawRadarPolygon(ctx, axes.map((axis) => pointOnAxis(cx, cy, radius * step, axis.angle)));
  }
  ctx.strokeStyle = "#a8a29e";
  axes.forEach((axis) => {
    const end = pointOnAxis(cx, cy, radius, axis.angle);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  });
  const points = axes.map((axis) => pointOnAxis(cx, cy, (radius * axis.value) / 100, axis.angle));
  ctx.beginPath();
  points.forEach((point, index) => (index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y)));
  ctx.closePath();
  ctx.fillStyle = "rgba(245, 158, 11, .28)";
  ctx.fill();
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 5;
  ctx.stroke();
  axes.forEach((axis) => {
    const labelPoint = pointOnAxis(cx, cy, radius + 34, axis.angle);
    if (axis.label === "结果") {
      labelPoint.y += 24;
    }
    ctx.fillStyle = axis.color;
    ctx.font = "900 20px 'Microsoft YaHei', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${axis.label} ${axis.value}%`, labelPoint.x, labelPoint.y);
  });
  ctx.textAlign = "left";
}

function drawRadarPolygon(ctx, points) {
  ctx.beginPath();
  points.forEach((point, index) => (index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y)));
  ctx.closePath();
  ctx.stroke();
}

function pointOnAxis(cx, cy, radius, angle) {
  return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
}

function drawWideShareHero(ctx, theme, x, y, width, height) {
  const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
  gradient.addColorStop(0, theme[0]);
  gradient.addColorStop(1, "#111827");
  roundRect(ctx, x, y, width, height, 18, gradient);

  ctx.fillStyle = "rgba(255,255,255,.11)";
  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    ctx.arc(x + 72 + i * 58, y + 58 + (i % 3) * 38, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  roundRect(ctx, x + 66, y + height - 74, width - 132, 14, 999, "rgba(255,255,255,.28)");
  roundRect(ctx, x + 66, y + height - 42, width - 132, 8, 999, "rgba(255,255,255,.14)");

  const tx = x + 590;
  const ty = y + 102;
  roundRect(ctx, tx, ty, 370, 116, 18, theme[1]);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 7;
  ctx.stroke();
  roundRect(ctx, tx + 28, ty + 30, 72, 46, 8, "#fff7ed");
  roundRect(ctx, tx + 136, ty + 30, 72, 46, 8, "#fff7ed");
  roundRect(ctx, tx + 244, ty + 30, 72, 46, 8, "#fff7ed");
  drawWheel(ctx, tx + 92, ty + 124);
  drawWheel(ctx, tx + 280, ty + 124);

  ctx.fillStyle = "#fff7ed";
  ctx.font = "900 70px 'Microsoft YaHei', sans-serif";
  ctx.fillText(theme[2], x + 110, y + 128);
  ctx.font = "900 46px 'Microsoft YaHei', sans-serif";
  ctx.fillText(theme[3], x + 110, y + 194);
}

function drawWheel(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 38, 0, Math.PI * 2);
  ctx.fillStyle = "#f8fafc";
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
}

function drawShareBar(ctx, label, value, x, y, color) {
  ctx.fillStyle = "#44403c";
  ctx.font = "900 20px 'Microsoft YaHei', sans-serif";
  ctx.fillText(`${label} ${value}%`, x, y);
  roundRect(ctx, x, y + 18, 260, 14, 999, "#e7e5e4");
  roundRect(ctx, x, y + 18, Math.max(8, (260 * value) / 100), 14, 999, color);
}

function drawGrid(ctx, width, height) {
  ctx.strokeStyle = "rgba(255,255,255,.8)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 28) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function roundRect(ctx, x, y, width, height, radius, color) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function trimText(ctx, text, x, y, maxWidth) {
  let output = text;
  while (ctx.measureText(output).width > maxWidth && output.length > 4) {
    output = output.slice(0, -2);
  }
  if (output !== text) output += "...";
  ctx.fillText(output, x, y);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  let line = "";
  for (const char of text) {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) ctx.fillText(line, x, y);
}
