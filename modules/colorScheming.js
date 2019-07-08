import COLORS from "./COLORS.js";

export function twoNewColors(firstOldColor, secondOldColor) {
  const oldAndNewAreDifferent = (old, _new) => old !== _new;
  const twoNewColorsAreDifferent = (color1, color2) => color1 !== color2;
  const randomFrom = colorList => colorList[Math.ceil(Math.random() * colorList.length)];

  let firstNewColor, secondNewColor;

  let validNewColors = false;

  while (!validNewColors) {
    firstNewColor = randomFrom(COLORS);
    secondNewColor = randomFrom(COLORS);

    validNewColors = [
      oldAndNewAreDifferent(firstOldColor, firstNewColor),
      oldAndNewAreDifferent(secondOldColor, secondNewColor),
      twoNewColorsAreDifferent(firstNewColor, secondNewColor)
    ].every(el => el);
  }

  return [firstNewColor, secondNewColor];
}

