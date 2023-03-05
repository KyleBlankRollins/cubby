import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {RealmContext} from './models';
import colors from './styles/colors';

import RootNavigator from './navigation';
const {RealmProvider} = RealmContext;

export const App = (): JSX.Element => {
  return (
    <>
      <SafeAreaView style={styles.screen}>
        <RealmProvider>
          <RootNavigator />
        </RealmProvider>

        {/* TODO: update for dynamic theme */}
        <StatusBar barStyle={'light-content'} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
