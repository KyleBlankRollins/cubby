import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTabNavigatorParamList} from './types';
import HomeStackNavigator from './HomeStack';
import {FindBookScreen} from '../screens/FindBookScreen';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Find a book" component={FindBookScreen} />
      {/* <Tab.Screen name="All books" component={} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabs;
