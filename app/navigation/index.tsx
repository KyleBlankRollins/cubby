import * as React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './Tabs';

import {light, dark} from '../styles/theme';

const RootNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = isDarkMode ? dark : light;

  const NavigatorTheme = {
    dark: isDarkMode,
    colors: {
      primary: colors.main,
      background: colors.surface1,
      card: colors.surface2,
      text: colors.text2,
      border: colors.text2,
      notification: colors.surface2,
    },
  };

  return (
    <NavigationContainer theme={NavigatorTheme}>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default RootNavigator;
