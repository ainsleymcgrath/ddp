(() => {
  const circle = document.getElementById("circle");

  const listeners = [
    ["mousedown", onMouseDown],
    ["mouseup", onMouseUp],
    ["dragstart", onDragStart],
  ];

  listeners.forEach(([listener, callback]) =>
    circle.addEventListener(listener, callback, false),
  );

  function onMouseDown(event) {
    circle.addEventListener("mousemove", onMouseMove);
  }

  function onMouseMove(event) {
    const moveTo = (pageX, pageY) => {
      circle.style.left = pageX - circle.offsetWidth / 2 + "px";
      circle.style.top = pageY - circle.offsetHeight / 2 + "px";
    };

    moveTo(event.pageX, event.pageY);
  }

  function onMouseUp(event) {
    circle.removeEventListener("mousemove", onMouseMove);
    circle.onmouseup = null;
  }

  function onDragStart(event) {
    return false;
  }
})();
