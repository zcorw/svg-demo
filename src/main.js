import {
  SVG,
  Circle,
  Rect,
  Text,
  List,
  Point,
  Matrix,
  Color,
} from "@svgdotjs/svg.js";
import "@svgdotjs/svg.filter.js";

const colors = [
  new Color("#80BEAF"),
  new Color("#B3DDD1"),
  new Color("#d1dce2"),
  new Color("#f58994"),
  new Color("#ee9c6c"),
];

const draw = SVG().addTo("#app").size(1000, 800);
function createRule(rule) {
  const text = new Text().text(rule);
  const { width, height } = text.bbox();
  const background = new Rect({
    width: width + 20,
    height: height + 20,
  }).fill(colors[2]);
  return [background, text];
}
function drawRule(x, y, rules) {
  if (rules.length === 0) {
    return;
  }
  const rule = rules[0];
  rule[0].move(x, y);
  rule[1].move(x + 10, y + 10);
  return drawRule(x + rule[0].bbox().width + 20, y, rules.slice(1));
}
function drawLine(start, end) {
  const mx = start.x < end.x ? start.x : end.x;
  const my = start.y < end.y ? start.y : end.y;
  const t = start.x / start.y;
  draw
    .line(t * (start.y + 30), start.y + 30, t * (end.y - 50), end.y - 50)
    .stroke({ color: "#f06", width: 1 })
    .move(mx, my);
}
class Ploy {
  constructor(condition, rules) {
    const conditionBg = new Circle({ r: 30 }).fill(colors[0]);
    const conditionText = new Text().text(condition);
    this.condition = [conditionBg, conditionText];
    this.rules = rules.map(createRule);
    this.width = this.rules.reduce((res, rule) => {
      return rule[0].bbox().width + res + 20;
    }, 0);
    this.height =
      this.condition[0].bbox().height + this.rules[0][0].bbox().height + 80;
  }
  build(x, y) {
    drawRule(x, y, this.rules);
    const conditionX = x + this.width / 2;
    const conditionY = y + this.height - 15;
    console.log(this.rules);
    this.condition[0].center(conditionX, conditionY);
    this.condition[1].center(conditionX, conditionY);
    this.rules.forEach((rule) => {
      const cx = rule[0].bbox().cx;
      const cy = rule[0].bbox().cy;
      const mx = cx < conditionX ? cx : conditionX;
      const my = cy < conditionY ? cy : conditionY;
      draw
        .line(cx, cy, conditionX, conditionY)
        .stroke({ color: "#f06", width: 1 })
        .move(mx, my);
    });
    this.condition.forEach((svg) => svg.addTo(draw));
    this.rules.forEach((rule) => rule.forEach((svg) => svg.addTo(draw)));
  }
}
new Ploy("或", [
  "两个黄鹂鸣翠柳",
  "一行白鹭上青天",
  "窗含西岭千秋雪",
  "门泊东吴万里船",
]).build(10, 10);
