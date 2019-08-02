import { onMouseUp } from "./modules/eventHandlers.js";
import { setElementColor } from "./modules/util.js";

window.Oratorial = {
  elementsToColor: document.querySelectorAll(".fg, .bg"),
  extra: undefined,
  init: function() {
    // two faves to start off
    this.elementsToColor.forEach(el => {
      setElementColor(el, "steelblue", "snow");
    });

    document
      .querySelectorAll("span")
      .forEach(el => (el.innerText = el.style.color));

    [["mouseup", onMouseUp]].forEach(([listener, callback]) =>
      this.elementsToColor.forEach(el => {
        setElementColor(el, "steelblue", "snow");
        el.addEventListener(listener, callback, false);
      }),
    );
  },
};
