import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet} from 'react-native';

import {RealmContext} from './models';
import colors from './styles/colors';
import {App} from './App';

export const AppWrapper = (): JSX.Element => {
  const {RealmProvider} = RealmContext;

  return (
    <SafeAreaView style={styles.screen}>
      <RealmProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </RealmProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
