import { onMouseUp } from "./modules/eventHandlers.js";
import { setElementColor } from "./modules/util.js";

const elementsToColor = document.querySelectorAll(".fg, .bg");

elementsToColor.forEach(el => {
  setElementColor(el, "steelblue", "snow");
});

document
  .querySelectorAll("span")
  .forEach(el => (el.innerText = el.style.color));

[["mouseup", onMouseUp]].forEach(([listener, callback]) =>
  elementsToColor.forEach(el => {
    setElementColor(el, "steelblue", "snow");
    el.addEventListener(listener, callback, false);
  }),
);
