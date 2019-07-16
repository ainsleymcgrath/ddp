// https://www.w3.org/TR/AERT/#color-contrast
const R_COEFFICIENT = 0.299;
const G_COEFFICIENT = 0.587;
const B_COEFFICIENT = 0.114;

// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
const CONTRAST_COEFFICIENT = 0.05;

// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast
const MINIMUM_ACCESSIBLE_CONTRAST = 4.5;

export function twoNewColors(namedColorsObject, ...oldColors) {
  const [oldFg, oldBg] = oldColors;

  const colorDataByName = Object.keys(namedColorsObject).reduce(
    (acc, cur) => ({ ...acc, ...namedColorsObject[cur] }),
    {},
  );

  let isAccessibleColorScheme = false;
  let newFg, newBg;

  while (!isAccessibleColorScheme) {
    [newFg, newBg] = shuffle(Object.keys(colorDataByName));

    const [fgLuminance, bgLuminance] = [
      colorDataByName[newFg].rgb,
      colorDataByName[newBg].rgb,
    ].map(luminance);

    isAccessibleColorScheme =
      contrast(fgLuminance, bgLuminance) < MINIMUM_ACCESSIBLE_CONTRAST;
  }

  return [newFg, newBg].sort();
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // swap
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function luminance(rgbString) {
  const [r, g, b] = rgbString.split(",");

  return r * R_COEFFICIENT + g * G_COEFFICIENT + b * B_COEFFICIENT;
}

function contrast(...luminances) {
  const [darker, lighter] = luminances.sort();

  return (lighter + CONTRAST_COEFFICIENT) / (darker + CONTRAST_COEFFICIENT);
}
