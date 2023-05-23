import React from 'react';
import {StyleSheet, Pressable, ViewStyle} from 'react-native';

import {AppButtonText} from './AppButtonText';

type AppButtonProps = {
  onPress: () => void;
  title: string;
  options?: {
    bgColor?: string;
    fullWidth?: boolean;
    customStyle?: ViewStyle;
    largeText?: boolean;
    disabled?: boolean;
  };
};

export const AppButton = React.memo<AppButtonProps>(
  ({onPress, title, options}) => {
    // TODO: find a way to not hard code the default color.
    const background = {
      backgroundColor: options?.bgColor ? options.bgColor : '#5A527D',
    };
    const textSize = {
      fontSize: options?.largeText ? 24 : 18,
    };
    const buttonWidth = options?.fullWidth ? styles.fullWidth : styles.fitWidth;
    const disabledStyle = options?.disabled ? styles.disabled : {};

    // console.log(`"${title}" button is disabled: ${options.disabled}`)

    return (
      <Pressable
        onPress={onPress}
        disabled={options?.disabled}
        style={[
          styles.appButtonContainer,
          background,
          buttonWidth,
          disabledStyle,
          options?.customStyle,
        ]}>
        <AppButtonText customStyle={textSize}> {title} </AppButtonText>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  appButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  fullWidth: {
    margin: 0,
  },
  // TODO: Fix this style property.
  fitWidth: {
    marginHorizontal: 2,
    marginVertical: 1,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: 'pink',
  },
});
