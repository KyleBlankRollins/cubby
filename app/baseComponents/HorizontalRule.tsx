import React from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';

import {light, dark} from '../styles/theme';

export const HorizontalRule: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const fullThemeStyles = isDarkMode ? dark : light;

  const horizontalRuleStyle = {
    borderBottomColor: fullThemeStyles.text1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 32,
    marginHorizontal: 48,
  };

  return <View style={horizontalRuleStyle} />;
};
