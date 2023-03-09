import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

enum headingLevel {
  heading1 = 1,
  heading2,
  heading3,
  heading4,
}

type HeadingTypes = {
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
};

type AppTextProps = {
  level: headingLevel;
  customStyle?: TextStyle;
  children: React.ReactNode;
  numberOfLines: number;
};

export const AppHeaderText: React.FC<AppTextProps> = props => {
  return (
    <Text
      style={[
        props.customStyle,
        styles[headingLevel[props.level] as keyof HeadingTypes],
      ]}
      numberOfLines={props.numberOfLines}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading1: {
    fontSize: 40,
    fontFamily: 'Merriweather-Light',
    marginVertical: 30,
  },
  heading2: {
    fontSize: 30,
    fontFamily: 'Merriweather-Light',
    marginVertical: 20,
  },
  heading3: {
    fontSize: 20,
    fontFamily: 'Merriweather-Bold',
    marginVertical: 10,
  },
  heading4: {
    fontSize: 20,
    fontFamily: 'Merriweather-Black',
    marginVertical: 10,
  },
});
