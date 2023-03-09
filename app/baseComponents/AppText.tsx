import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

type AppTextProps = {
  customStyle?: TextStyle;
  children: React.ReactNode;
  numberOfLines?: number;
  selectable?: boolean;
};

export const AppText: React.FC<AppTextProps> = props => {
  return (
    <Text
      style={[styles.defaultStyle, props.customStyle]}
      numberOfLines={props.numberOfLines}
      selectable={props.selectable}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 20,
    fontFamily: 'Karla-Light',
    marginVertical: 8,
  },
});
