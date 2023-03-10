import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {CubbyScreenNavigationProp} from '../navigation/types';
import {CubbyScreenRouteProp} from '../navigation/types';
import {Cubby} from '../models/Cubby';
import {CubbySection} from '../components/CubbySection';
import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';

import {RealmContext} from '../models';

const {useRealm, useObject} = RealmContext;

export const CubbyScreen: React.FC<CubbyScreenNavigationProp> = () => {
  const route = useRoute<CubbyScreenRouteProp>();
  const {_id, name} = route.params;

  const cubbyObjectId = new Realm.BSON.ObjectID(_id);
  const cubby = useObject(Cubby, cubbyObjectId);

  const realm = useRealm();

  return (
    <View style={styles.cubbyContatiner}>
      {/* TODO: handle null cubby case */}
      <AppText>{cubby!.description}</AppText>

      <ScrollView contentContainerStyle={styles.containerFlex}>
        {cubby!.sections.map((section, index) => {
          return (
            <CubbySection key={index} sectionId={JSON.stringify(section._id)} />
          );
        })}
      </ScrollView>

      <View style={styles.buttonGroup}>
        {/* <AppButton 
        fullWidth={true}
        title="Add book"
        onPress={() => {
          navigation.navigate("Find a book", {cubby: JSON.stringify(
            {id: cubby._id, name: cubby.name}
          )});
        }}
      /> */}
        <AppButton
          title="Delete Cubby"
          options={{bgColor: '#5F2234', fullWidth: true}}
          onPress={() => {
            realm.write(() => {
              realm.delete(cubby);
            });
          }}
        />
      </View>

      <AppButton title="Back to Cubbies" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 8,
  },
  cubbyContainer: {
    marginHorizontal: 14,
    marginVertical: 10,
  },
  containerFlex: {
    display: 'flex',
    flexGrow: 1,
  },
});

export default CubbyScreen;
