import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {IntroText} from '../components/IntroText';
import CubbyList from '../components/CubbyList';
import {HorizontalRule} from '../baseComponents/HorizontalRule';
import {AppButton} from '../baseComponents/AppButton';

import {Cubby} from '../models/Cubby';

import {HomeScreenNavigationProp} from '../navigation/types';
import {RealmContext} from '../models';

const {useQuery} = RealmContext;

export const CubbyManager: React.FC<HomeScreenNavigationProp> = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const result = useQuery(Cubby).sorted('name');
  // TODO: Consider passing just an array to the CubbyList.
  // Possibly no need for the actual objects in the list.
  const cubbies = useMemo(() => result.sorted('name'), [result]);

  return (
    <View style={styles.container}>
      {!cubbies || !cubbies.length ? (
        <View style={styles.welcomeText}>
          <IntroText />

          <HorizontalRule />

          <View>
            <AppButton
              onPress={() => {
                // TODO: Figure out how I messed up the navigation types
                navigation.navigate('AddCubbyScreen');
              }}
              title="Add Cubby"
              options={{
                largeText: true,
              }}
            />
          </View>
        </View>
      ) : (
        <View>
          <CubbyList cubbies={cubbies} />
        </View>
      )}

      {cubbies && (
        <View style={styles.addCubby}>
          <AppButton
            onPress={() => {
              // TODO: Figure out how I messed up the navigation types
              navigation.navigate('AddCubbyScreen');
            }}
            title="Add Cubby"
            options={{
              largeText: true,
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    marginHorizontal: 14,
    marginVertical: 10,
  },
  welcomeText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCubby: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
