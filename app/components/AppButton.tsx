import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

type AppButtonProps = {
  onPress: () => void;
  title: string;
  bgColor?: string;
  fullWidth?: boolean;
};

export const AppButton = React.memo<AppButtonProps>(
  ({onPress, title, bgColor, fullWidth}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.appButtonContainer,
          bgColor ? {backgroundColor: bgColor} : {backgroundColor: '#5A527D'},
          fullWidth ? styles.fullWidth : styles.fitWidth,
        ]}>
        <Text style={styles.appButtonText}> {title} </Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  appButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  fullWidth: {
    margin: 0,
  },
  fitWidth: {
    marginHorizontal: 2,
    marginVertical: 1,
  },
});
