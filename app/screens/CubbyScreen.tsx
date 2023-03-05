import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

const CubbyScreen = () => {
  const route = useRoute();
  const {name, books} = route.params;

  return (
    <View style={{flex: 1, paddingTop: 12, paddingHorizontal: 10}}>
      <Text style={{fontSize: 18, paddingBottom: 12}}>Name: {name}</Text>
      <Text style={{fontSize: 18}}>books: {books.length}</Text>
    </View>
  );
};

export default CubbyScreen;
