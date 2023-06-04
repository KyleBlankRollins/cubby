import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Pressable,
  ViewStyle,
  useColorScheme,
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

    const [animationSurface, setAnimationSurface] = useState(
      new Animated.Value(0),
    );
    const [animationAccent, setAnimationAccent] = useState(
      new Animated.Value(0),
    );
    const [isPressed, setIsPressed] = useState(false);

    const themeColors = isDarkMode ? dark : light;

    // Animations
    const animationToAccent = () => {
      Animated.timing(animationSurface, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    };

    const animationToSurface = () => {
      Animated.timing(animationAccent, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    };

    const surfaceInterpolation = animationSurface.interpolate({
      inputRange: [0, 1],
      outputRange: [themeColors.surface2, themeColors.accent[500]],
    }) as any;

    const accentInterpolation = animationSurface.interpolate({
      inputRange: [0, 1],
      outputRange: [themeColors.accent[500], themeColors.surface2],
    }) as any;

    // Computed styles
    const background: ViewStyle = {
      backgroundColor: isPressed ? accentInterpolation : surfaceInterpolation,
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: options?.isWarning
        ? themeColors.warning[300]
        : themeColors.accent[400],
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
    const pressedStyle: ViewStyle = {
      elevation: 0,
      backgroundColor: themeColors.accent[500],
    };
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
          setIsPressed(true);
          animationToAccent();
        }}
        onPressOut={() => {
          setIsPressed(false);
          animationToSurface();
        }}
        disabled={options?.disabled}>
        <Animated.View
          style={[
            appButtonContainer,
            background,
            buttonWidth,
            disabledStyle,
            options?.customStyle,
            isPressed ? pressedStyle : null,
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
