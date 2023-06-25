import {StyleSheet} from 'react-native';

// Colors defined as objects with HSL values broken into object properties. This allows for easier manipulation to get color variants.

const mainLightColor = {
  hue: 9,
  saturation: 17,
  lightness: 92,
};

const mainDarkColor = {
  hue: 240,
  saturation: 4,
  lightness: 28,
};

const warning = {
  '100': 'hsl(4, 62%, 95%)',
  '300': 'hsl(4, 64%, 75%)',
};

// TODO: build out other colors.
// const secondaryColor = {

// }

// TODO: add spacing and font definitions
// https://shopify.engineering/5-ways-to-improve-your-react-native-styling-workflow

const light = {
  main: `hsl(${mainLightColor.hue}, ${mainLightColor.saturation}%, ${mainLightColor.lightness}%)`,
  mainLight: `hsl(${mainLightColor.hue}, ${mainLightColor.saturation}%, ${mainLightColor.lightness}%)`,
  text1: `hsl(${mainLightColor.hue}, ${mainLightColor.saturation}%, 10%)`,
  text2: `hsl(${mainLightColor.hue}, 30%, 30%)`,
  surface1: `hsl(${mainLightColor.hue}, 25%, 90%)`,
  surface2: `hsl(${mainLightColor.hue}, 20%, 99%)`,
  surface3: `hsl(${mainLightColor.hue}, 20%, 92%)`,
  surface4: `hsl(${mainLightColor.hue}, 20%, 85%)`,
  accent: {
    '100': 'hsl(195, 40%, 83%)',
    '200': 'hsl(197, 40%, 61%)',
    '300': 'hsl(197, 52%, 44%)',
    '400': 'hsl(197, 52%, 26%)',
    '500': 'hsl(197, 53%, 17%)',
  },
  darkAccent: {
    '100': 'hsl(205, 16%, 51%)',
    '200': 'hsl(206, 31%, 34%)',
    '300': 'hsl(206, 76%, 18%)',
    '400': 'hsl(206, 75%, 14%)',
    '500': 'hsl(205, 74%, 11%)',
  },
  warning,
};

const dark = {
  main: `hsl(${mainDarkColor.hue}, ${mainDarkColor.saturation / 2}%, ${
    mainDarkColor.lightness / 1.5
  }%)`,
  mainLight: `hsl(${mainDarkColor.hue}, ${mainDarkColor.saturation}%, ${mainDarkColor.lightness}%)`,
  text1: `hsl(${mainDarkColor.hue}, 15%, 85%)`,
  text2: `hsl(${mainDarkColor.hue}, 5%, 65%)`,
  surface1: `hsl(${mainDarkColor.hue}, 10%, 10%)`,
  surface2: `hsl(${mainDarkColor.hue}, 10%, 15%)`,
  surface3: `hsl(${mainDarkColor.hue}, 5%, 20%)`,
  surface4: `hsl(${mainDarkColor.hue}, 5%, 25%)`,
  accent: {
    '100': 'hsl(148, 45%, 88%)',
    '200': 'hsl(148, 46%, 72%)',
    '300': 'hsl(148, 46%, 59%)',
    '400': 'hsl(148, 31%, 47%)',
    '500': 'hsl(148, 31%, 35%)',
  },
  darkAccent: {
    '100': 'hsl(205, 16%, 51%)',
    '200': 'hsl(206, 31%, 34%)',
    '300': 'hsl(206, 76%, 18%)',
    '400': 'hsl(206, 75%, 14%)',
    '500': 'hsl(205, 74%, 11%)',
  },
  warning,
};

const lightStyles = StyleSheet.create({
  surface1: {
    backgroundColor: light.surface1,
    color: light.text2,
  },
  surface2: {
    backgroundColor: light.surface2,
    color: light.text2,
  },
  surface3: {
    backgroundColor: light.surface3,
    color: light.text1,
  },
  surface4: {
    backgroundColor: light.surface4,
    color: light.text1,
  },
  accentSurface: {
    backgroundColor: light.accent[100],
    color: light.text1,
  },
  warningSurface: {},
});

const darkStyles = StyleSheet.create({
  surface1: {
    backgroundColor: dark.surface1,
    color: dark.text2,
  },
  surface2: {
    backgroundColor: dark.surface2,
    color: dark.text2,
  },
  surface3: {
    backgroundColor: dark.surface3,
    color: dark.text1,
  },
  surface4: {
    backgroundColor: dark.surface4,
    color: dark.text1,
  },
  accentSurface: {
    backgroundColor: dark.accent[100],
    color: dark.text1,
  },
  // TODO: Create a warning surface.
});

export {light, lightStyles, dark, darkStyles};
