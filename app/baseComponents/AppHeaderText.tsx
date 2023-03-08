import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

type AppTextProps = {
  level: number;
  customStyle?: TextStyle;
  children: React.ReactNode;
};
// TODO: Define different heading levels and styles
export const AppHeaderText: React.FC<AppTextProps> = (
  props,
  {customStyle, level},
) => {
  return (
    <Text style={[styles.defaultHeaderStyle, customStyle]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultHeaderStyle: {
    fontSize: 40,
    fontFamily: 'Merriweather-Light',
    marginVertical: 30,
  },
});
