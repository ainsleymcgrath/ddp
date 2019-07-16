import {
  onMouseDown,
  onMouseUp,
  onDragStart,
} from "./modules/eventHandlers.js";

(() => {
  const circle = document.getElementById("circle");
  const root = document.getElementById("root");

  circle.style.backgroundColor = "lightsteelblue";
  root.style.backgroundColor = "snow";

  [
    ["mousedown", onMouseDown],
    ["mouseup", onMouseUp],
    ["dragstart", onDragStart],
  ].forEach(([listener, callback]) =>
    circle.addEventListener(listener, callback, false),
  );
})();
