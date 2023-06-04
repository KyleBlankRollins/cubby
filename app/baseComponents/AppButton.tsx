import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Pressable,
  ViewStyle,
  useColorScheme,
  Easing,
} from 'react-native';

import {light, dark} from '../styles/theme';
import {AppButtonText} from './AppButtonText';

type AppButtonProps = {
  onPress: () => void;
  title: string;
  options?: {
    isWarning?: boolean;
    fullWidth?: boolean;
    customStyle?: ViewStyle;
    largeText?: boolean;
    disabled?: boolean;
  };
};

export const AppButton = React.memo<AppButtonProps>(
  ({onPress, title, options}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const [animation, setAnimationSurface] = useState(new Animated.Value(0));

    const themeColors = isDarkMode ? dark : light;

    // Animations
    // TODO: abstract animation stuff to a hook that can animate from one color to another.
    const animateToAccent = () => {
      Animated.timing(animation, {
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
        duration: 300,
        useNativeDriver: false,
      }).start();
    };
    const animateFromAccent = () => {
      Animated.timing(animation, {
        toValue: 0,
        easing: Easing.inOut(Easing.ease),
        duration: 300,
        useNativeDriver: false,
      }).start();
    };

    const bgStartColor = options?.isWarning
      ? themeColors.warning[300]
      : themeColors.accent[500];

    const colorInterpolation = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [themeColors.surface2, bgStartColor],
    }) as any;

    // Computed styles
    const background: ViewStyle = {
      backgroundColor: colorInterpolation,
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: options?.isWarning
        ? themeColors.warning[300]
        : themeColors.accent[400],
      borderRadius: 8,
    };
    const textSize = {
      fontSize: options?.largeText ? 24 : 18,
    };
    const buttonWidth = options?.fullWidth ? styles.fullWidth : styles.fitWidth;
    const disabledStyle = options?.disabled
      ? {
          opacity: 0.5,
          backgroundColor: themeColors.surface4,
        }
      : null;
    const appButtonContainer = {
      elevation: 4,
      paddingVertical: 6,
      paddingHorizontal: 8,
      shadowColor: themeColors.accent[100],
    };

    return (
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          animateToAccent();
        }}
        onPressOut={() => {
          animateFromAccent();
        }}
        disabled={options?.disabled}>
        <Animated.View
          style={[
            appButtonContainer,
            background,
            buttonWidth,
            disabledStyle,
            options?.customStyle,
          ]}>
          <AppButtonText customStyle={textSize}> {title} </AppButtonText>
        </Animated.View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  appButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  fullWidth: {
    margin: 0,
  },
  fitWidth: {
    marginHorizontal: 2,
    marginVertical: 1,
  },
});
