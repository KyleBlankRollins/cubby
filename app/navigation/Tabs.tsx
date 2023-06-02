import * as React from 'react';
import {useColorScheme} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BottomTabNavigatorParamList} from './types';
import HomeStackNavigator from './HomeStack';
import {light, dark} from '../styles/theme';

import {FindBookScreen} from '../screens/FindBookScreen';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? dark : light;

  const textStyle = {
    fontSize: 20,
    margin: 0,
    padding: 0,
  };

  return (
    <Tab.Navigator backBehavior="order">
      {/* TODO: reconcile stack navigator with tab navigator
      https://reactnavigation.org/docs/nesting-navigators/ */}
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarActiveTintColor: themeColors.mainLight,
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: textStyle,
          tabBarIcon: ({color, size}) => (
            <Icon name="bookshelf" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Find a book"
        component={FindBookScreen}
        options={{
          tabBarActiveTintColor: themeColors.mainLight,
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: textStyle,
          tabBarIcon: ({color, size}) => (
            <Icon name="book-search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// const BookShelfIcon = <Icon name="mdiBookshelf" size={30} color="#900" />;

export default BottomTabs;
