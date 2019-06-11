const fs = require('fs');

const gridSizes = {
  1: 8.33333,
  2: 16.66667,
  3: 25,
  4: 33.33333,
  5: 41.66667,
  6: 50,
  7: 58.33333,
  8: 66.66667,
  9: 75,
  10: 83.33333,
  11: 91.66667,
  12: 100
};

const gridType = 'row';

const keys = Object.keys(gridSizes);

const recursivelyBuildGrid = (cumulativeSize, precedingSizes, level) => {
  level += 1;
  let allCss = '';
  let cssString = '';
  for (let key of keys) {
    key = parseInt(key);
    if ((cumulativeSize + key) > 12) {
      break;
    }

    precedingSizes.push(key);
    cumulativeSize += key;

    let className = '';

    for (const [i, size] of precedingSizes.entries()) {
      if (!i) {
        className += `.${gridType}-${size}`;
      } else {
        className += ` + .${gridType}-${size}`;
      }
    }

    cssString += `${className} {
      position: absolute;
      height: ${gridSizes[key]}%;
      top: ${gridSizes[cumulativeSize] || 0}%;
    }
    `;
    cssString += recursivelyBuildGrid(cumulativeSize, precedingSizes, level);
    if (level !== 1) {
      return cssString;
    } else {
      allCss += cssString;
      precedingSizes = [];
      cumulativeSize = 0;
      cssString = '';
    }
  }
  return allCss;
};

const cssFinal = recursivelyBuildGrid(0, [], 0);
console.log("What is cssFinal: ", cssFinal);
