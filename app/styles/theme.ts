import {StyleSheet} from 'react-native';

// Colors defined as objects with HSL values broken into object properties.
// This allows for easier manipulation to get color variants.

const mainColor = {
  hue: 251,
  saturation: 21,
  lightness: 41,
};

// TODO: build out other colors.
// const secondaryColor = {

// }

// TODO: add spacing and font definitions
// https://shopify.engineering/5-ways-to-improve-your-react-native-styling-workflow

const shadow = {
  light: {
    surfaceShadow: `${mainColor.hue}, 10%, 20%`,
    shadowStrength: 0.02,
  },
  dark: {
    surfaceShadow: `${mainColor.hue}, 50%, 3%`,
    shadowStrength: 0.8,
  },
};

const light = {
  main: `hsl(${mainColor.hue}, ${mainColor.saturation}%, ${mainColor.lightness}%)`,
  text1: `hsl(${mainColor.hue}, ${mainColor.saturation}%, 10%)`,
  text2: `hsl(${mainColor.hue}, 30%, 30%)`,
  surface1: `hsl(${mainColor.hue}, 25%, 90%)`,
  surface2: `hsl(${mainColor.hue}, 20%, 99%)`,
  surface3: `hsl(${mainColor.hue}, 20%, 92%)`,
  surface4: `hsl(${mainColor.hue}, 20%, 85%)`,
  shadow: `0 2.8px 2.2px hsl(${shadow.light.surfaceShadow} / ${shadow.light.shadowStrength} + .03)),
  0 6.7px 5.3px hsl(${shadow.light.surfaceShadow} / ${shadow.light.shadowStrength} + .01)),
  0 12.5px 10px hsl(${shadow.light.surfaceShadow} / ${shadow.light.shadowStrength} + .02)),
  0 22.3px 17.9px hsl(${shadow.light.surfaceShadow} / ${shadow.light.shadowStrength} + .02)),
  0 41.8px 33.4px hsl(${shadow.light.surfaceShadow} / ${shadow.light.shadowStrength} + .03)),
  0 100px 80px hsl(${shadow.light.surfaceShadow} / ${shadow.light.shadowStrength})`,
};

const dark = {
  main: `hsl(${mainColor.hue}, ${mainColor.saturation / 2}%, ${
    mainColor.lightness / 1.5
  }%)`,
  text1: `hsl(${mainColor.hue}, 15%, 85%)`,
  text2: `hsl(${mainColor.hue}, 5%, 65%)`,
  surface1: `hsl(${mainColor.hue}, 10%, 10%)`,
  surface2: `hsl(${mainColor.hue}, 10%, 15%)`,
  surface3: `hsl(${mainColor.hue}, 5%, 20%)`,
  surface4: `hsl(${mainColor.hue}, 5%, 25%)`,
  shadow: `0 2.8px 2.2px hsl(${shadow.dark.surfaceShadow} / ${shadow.dark.shadowStrength} + .03)),
  0 6.7px 5.3px hsl(${shadow.dark.surfaceShadow} / ${shadow.dark.shadowStrength} + .01)),
  0 12.5px 10px hsl(${shadow.dark.surfaceShadow} / ${shadow.dark.shadowStrength} + .02)),
  0 22.3px 17.9px hsl(${shadow.dark.surfaceShadow} / ${shadow.dark.shadowStrength} + .02)),
  0 41.8px 33.4px hsl(${shadow.dark.surfaceShadow} / ${shadow.dark.shadowStrength} + .03)),
  0 100px 80px hsl(${shadow.dark.surfaceShadow} / ${shadow.dark.shadowStrength})`,
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
  // TODO: Create a warning surface.
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
  // TODO: Create a warning surface.
});

export {light, lightStyles, dark, darkStyles};
