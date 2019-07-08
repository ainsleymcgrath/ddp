import { twoNewColors } from "./colorScheming.js";

const circle = document.getElementById("circle");
const root = document.getElementById("root");

export function onMouseDown(event) {
  circle.addEventListener("mousemove", onMouseMove);
}

function onMouseMove(event) {
  const moveTo = (pageX, pageY) => {
    circle.style.left = pageX - circle.offsetWidth / 2 + "px";
    circle.style.top = pageY - circle.offsetHeight / 2 + "px";
  };

  moveTo(event.pageX, event.pageY);
}

export function onMouseUp(event) {
  circle.removeEventListener("mousemove", onMouseMove);
  circle.onmouseup = null;

  const [fg, bg] = twoNewColors(circle.style.background, root.style.background);

  circle.style.background = fg;
  root.style.background = bg;
}

export function onDragStart(event) {
  return false;
}

