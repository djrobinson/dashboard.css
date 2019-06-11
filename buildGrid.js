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

const recursivelyBuildGrid = (cumulativeSize, baseSize, precedingSizes) => {
  let allCss = '';
  let cssString = '';
  for (let key of keys) {
    key = parseInt(key);
    baseSize = parseInt(baseSize);
    if ((cumulativeSize + key) > 12) {
      break;
    }

    let className = '';

    className += `.${gridType}-${baseSize}`;

    for (let size of precedingSizes) {
      className += ` + .${gridType}-${size}`;
    }
    cssString += `${className} {
      position: absolute;
      height: ${gridSizes[key]}%;
      top: ${gridSizes[cumulativeSize] || 0}%;
    }
    `;
    precedingSizes.push(key);
    cumulativeSize += key;
    cssString += recursivelyBuildGrid(cumulativeSize, key, precedingSizes);
    return cssString;
  }
  return allCss;
};

const cssFinal = recursivelyBuildGrid(0, 1, []);
console.log("What is cssFinal: ", cssFinal);
