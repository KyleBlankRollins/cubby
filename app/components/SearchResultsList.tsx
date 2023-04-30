import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import {BookOverview} from '../components/BookOverview';
import {AppHeaderText} from '../baseComponents/AppHeaderText';
import {AppText} from '../baseComponents/AppText';
import {useRoute} from '@react-navigation/native';
import {SearchResultsRouteProp} from '../navigation/types';

export const SearchResultsList: React.FC<SearchResultsList> = () => {
  const route = useRoute<SearchResultsRouteProp>();
  const results = route.params.results;

  return (
    <View style={styles.listContainer}>
      {/* <AppText>{resultMessage}</AppText> */}
      <FlatList
        style={styles.searchList}
        data={results}
        keyExtractor={result => result.id.toString()}
        numColumns={2}
        renderItem={({item}) => {
          return <BookOverview bookInfo={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchList: {
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 14,
    marginVertical: 10,
    // height: 300,
    // backgroundColor: '#fff',
    // marginHorizontal: 20,
    // justifyContent: 'center',
  },
});
