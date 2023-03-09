import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

type AppTextProps = {
  customStyle?: TextStyle;
  children: React.ReactNode;
};
// TODO: Figure out why customStyle isn't coming from the button.
export const AppButtonText: React.FC<AppTextProps> = props => {
  return (
    <Text style={[styles.defaultStyle, props.customStyle]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: 'Karla-SemiBold',
    marginVertical: 8,
    alignSelf: 'center',
  },
});
