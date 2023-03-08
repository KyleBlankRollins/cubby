import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// @ts-ignore openURLInBrowser will open the url in your machine browser. (This isn't currently typed in React Native)

export const IntroText = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.paragraph}>Welcome to Cubby!</Text>
      <Text style={styles.paragraph}>
        Get started by adding your first Cubby of books.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  paragraph: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
  },
  link: {
    fontWeight: 'bold',
  },
});
