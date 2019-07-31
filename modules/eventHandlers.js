import { twoNewColors, setElementColor } from "./util.js";
import COLORS from "./COLORS.js";

const elementsToColor = document.querySelectorAll(".fg, .bg");
let currentBg, currentFg;

export function onMouseUp() {
  for (let element of elementsToColor.values()) {
    if (currentBg && currentFg) {
      break;
    }

    if (element.tagName === "SECTION") {
      currentFg =
        element.className === "fg"
          ? element.backgroundColor
          : currentFg || false; // avoid overrwriting this if already set
      currentBg =
        element.className === "bg"
          ? element.backgroundColor
          : currentBg || false;
    }
  }
  const [fg, bg] = twoNewColors(COLORS, currentFg, currentBg);

  elementsToColor.forEach(el => setElementColor(el, fg, bg));

  document
    .querySelectorAll("span")
    .forEach(el => (el.innerText = el.style.color));
}
