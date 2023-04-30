import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
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
  SearchResultsScreen: {
    results: any;
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

export type CubbyScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'CubbyScreen'
>;

export type SearchResultsRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'SearchResultsScreen'
>;

export type BookScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'BookScreen'
>;
