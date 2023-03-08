import React from 'react';
import {StyleSheet, TouchableOpacity, Text, ViewStyle} from 'react-native';

type AppButtonProps = {
  onPress: () => void;
  title: string;
  options?: {
    bgColor?: string;
    fullWidth?: boolean;
    customStyle?: ViewStyle;
    largeText?: boolean;
  };
};

export const AppButton = React.memo<AppButtonProps>(
  ({onPress, title, options}) => {
    // TODO: find a way to not hard code the default color.
    const background = {
      backgroundColor: options?.bgColor ? options.bgColor : '#5A527D',
    };
    const textSize = {
      fontSize: options?.largeText ? 24 : 12,
    };
    const buttonWidth = options?.fullWidth ? styles.fullWidth : styles.fitWidth;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.appButtonContainer,
          background,
          buttonWidth,
          options?.customStyle,
        ]}>
        <Text style={[styles.appButtonText, textSize]}> {title} </Text>
      </TouchableOpacity>
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
  fitWidth: {
    marginHorizontal: 2,
    marginVertical: 1,
  },
});
