import React from 'react';
import {View, StyleSheet} from 'react-native';

import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';

export const IntroText = () => {
  return (
    <View style={styles.content}>
      <AppHeaderText level={2}>Welcome to Cubby!</AppHeaderText>
      <AppText>Get started by adding your first Cubby of books.</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    // marginHorizontal: 20,
    // justifyContent: 'center',
  },
});
