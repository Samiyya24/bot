function parseHTMLColor(color) {
  const PRESET_COLORS = {
    red: '#FF0000',
    limegreen: '#32CD32',
    blue: '#0000FF',
    // Add other preset colors as needed
  };

  if (color.startsWith('#')) {
    if (color.length === 7) {
      // 6-digit hexadecimal
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return { r, g, b };
    } else if (color.length === 4) {
      // 3-digit hexadecimal
      const r = parseInt(color[1] + color[1], 16);
      const g = parseInt(color[2] + color[2], 16);
      const b = parseInt(color[3] + color[3], 16);
      return { r, g, b };
    }
  } else {
    const lowerColor = color.toLowerCase();
    if (PRESET_COLORS.hasOwnProperty(lowerColor)) {
      return parseHTMLColor(PRESET_COLORS[lowerColor]);
    }
  }
}

// Test cases
console.log(parseHTMLColor('#80FFA0')); // => { r: 128, g: 255, b: 160 }
console.log(parseHTMLColor('#3B7')); // => { r: 51, g: 187, b: 119 }
console.log(parseHTMLColor('LimeGreen')); // => { r: 50, g: 205, b: 50 }

// ---------------------------------------------------------------

// In this kata you parse RGB colors represented by strings. The formats are primarily used in HTML and CSS. Your task is to implement a function which takes a color as a string and returns the parsed color as a map (see Examples).

// Input:
// The input string represents one of the following:

// 6-digit hexadecimal - "#RRGGBB"
// e.g. "#012345", "#789abc", "#FFA077"
// Each pair of digits represents a value of the channel in hexadecimal: 00 to FF

// 3-digit hexadecimal - "#RGB"
// e.g. "#012", "#aaa", "#F5A"
// Each digit represents a value 0 to F which translates to 2-digit hexadecimal: 0->00, 1->11, 2->22, and so on.

// Preset color name
// e.g. "red", "BLUE", "LimeGreen"
// You have to use the predefined map PRESET_COLORS (JavaScript, Python, Ruby), presetColors (Java, C#, Haskell), PresetColors (Go) or preset-colors (Clojure). The keys are the names of preset colors in lower-case and the values are the corresponding colors in 6-digit hexadecimal (same as 1. "#RRGGBB").

// Examples:
// parseHTMLColor('#80FFA0');    // => { r: 128, g: 255, b: 160 }
// parseHTMLColor('#3B7');       // => { r: 51,  g: 187, b: 119 }
// parseHTMLColor('LimeGreen');  // => { r: 50,  g: 205, b: 50  }

