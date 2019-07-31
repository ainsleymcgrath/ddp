// https://www.w3.org/TR/AERT/#color-contrast
const R_COEFFICIENT = 0.299;
const G_COEFFICIENT = 0.587;
const B_COEFFICIENT = 0.114;

// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
const CONTRAST_COEFFICIENT = 0.05;

// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast
const MINIMUM_ACCESSIBLE_CONTRAST = 4.5;

export function twoNewColors(namedColorsObject, ...oldColors) {
  const colorDataByName = Object.keys(namedColorsObject).reduce(
    (acc, cur) => ({ ...acc, ...namedColorsObject[cur] }),
    {}
  );

  let isAccessibleColorScheme = false;
  let newFg, newBg;

  while (
    !isAccessibleColorScheme ||
    oldColors.some(color => [newFg, newBg].includes(color))
  ) {
    [newFg, newBg] = randomPair(Object.keys(colorDataByName));

    const [fgLuminance, bgLuminance] = [
      colorDataByName[newFg].rgb,
      colorDataByName[newBg].rgb
    ].map(luminance);

    isAccessibleColorScheme =
      contrast(fgLuminance, bgLuminance) < MINIMUM_ACCESSIBLE_CONTRAST;
  }

  return [newFg, newBg].sort();
}

function randomPair(array) {
  let randomIdx1 = Math.floor(Math.random() * array.length);
  let randomIdx2 = Math.floor(Math.random() * array.length);

  while (randomIdx1 === randomIdx2) {
    randomIdx2 = Math.floor(Math.random() * array.length);
  }

  return [array[randomIdx1], array[randomIdx2]];
}

function luminance(rgbString) {
  const [r, g, b] = rgbString.split(",");

  return r * R_COEFFICIENT + g * G_COEFFICIENT + b * B_COEFFICIENT;
}

function contrast(...luminances) {
  const [darker, lighter] = luminances.sort();

  return (lighter + CONTRAST_COEFFICIENT) / (darker + CONTRAST_COEFFICIENT);
}

export function setElementColor(element, fg, bg) {
  const objectWithSameValueForKeys = (keys, value) =>
    keys.reduce((acc, cur) => ({ [cur]: value, ...acc }), {});

  const colorAttrsByElementType = {
    ...objectWithSameValueForKeys(
      ["SPAN", "P", "H1", "H2", "H3", "H4", "H5", "H6", "A", "TITLE"],
      "color"
    ),
    ...objectWithSameValueForKeys(
      ["DIV", "SECTION", "ARTICLE"],
      "backgroundColor"
    )
  };

  const colorAttribute = colorAttrsByElementType[element.tagName];
  element.style[colorAttribute] = element.className === "fg" ? fg : bg;
}
