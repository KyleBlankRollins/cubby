import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import {Realm} from '@realm/react';
import {useNavigation} from '@react-navigation/native';

import {HorizontalRule} from '../baseComponents/HorizontalRule';
import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {light, dark} from '../styles/theme';

import {Cubby} from '../models/Cubby';
import {CubbyOverview} from './CubbyOverview';

import {HomeScreenNavigationProp} from '../navigation/types';

type CubbyListProps = {
  cubbies: Realm.Results<Cubby & Realm.Object>;
};

const CubbyList: React.FC<CubbyListProps> = ({cubbies}) => {
  return (
    <View>
      <FlatList
        data={cubbies}
        keyExtractor={cubby => cubby._id.toString()}
        renderItem={({item}) => <CubbyOverview cubby={item} />}
        ItemSeparatorComponent={HorizontalRule}
        ListHeaderComponent={() => (
          <AddCubbyButton numberOfCubbies={cubbies.length} />
        )}
        // ListHeaderComponentStyle={styles.cubbyListHeaderProps}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

type CubbyListHeaderProps = {
  numberOfCubbies: number;
};

const AddCubbyButton: React.FC<CubbyListHeaderProps> = ({numberOfCubbies}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? dark : light;

  const cubbyListHeaderProps: ViewStyle = {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.main,
    opacity: 0.9,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 30,
    borderRadius: 8,
  };

  return (
    <View style={cubbyListHeaderProps}>
      <AppText customStyle={styles.cubbyListHeaderText}>
        You have {numberOfCubbies} Cubbies.
      </AppText>
      <AppButton
        onPress={() => {
          navigation.navigate('AddCubbyScreen');
        }}
        title="Add Cubby"
        options={{
          customStyle: styles.cubbyListHeaderButton,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cubbyListHeaderText: {
    flex: 3,
    // alignSelf: 'center',
  },
  cubbyListHeaderButton: {
    flex: 1,
    // alignSelf: 'center',
  },
});

export default CubbyList;
