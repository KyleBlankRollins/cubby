import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {Cubby} from '../models/Cubby';
import {BookMap} from '../models/gBookApiRaw';

export type HomeStackNavigatorParamList = {
  CubbyManager: {};
  CubbyScreen: {
    _id: string;
    name: string;
  };
  BookScreen: {
    bookInfo: {
      _id: string;
      isInRealm: boolean;
      rawBook?: BookMap;
    };
  };
  AddCubbyModal: {};
  AddBookModal: {};
};

export type BottomTabNavigatorParamList = {
  Home: HomeStackNavigatorParamList;
  'Find a book': undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'CubbyScreen' // All route possibilities for CubbyManager. Undefined means access to all routes.
>;

export type CubbyScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'CubbyManager' // All route possibilities for CubbyManager. Undefined means access to all routes.
>;

export type BookScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'CubbyManager' // All route possibilities for CubbyManager. Undefined means access to all routes.
>;

export type FindBookScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'CubbyManager' // All route possibilities for CubbyManager. Undefined means access to all routes.
>;

// export type HomeScreenRouteProp = RouteProp<
//   HomeStackNavigatorParamList,
//   'CubbyManager'
// >;

export type CubbyScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'CubbyScreen'
>;

export type BookScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'BookScreen'
>;
