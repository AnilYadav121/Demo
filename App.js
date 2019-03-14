import React from 'react';
import {Text,View} from 'react-native';
import {StackNavigator} from 'react-navigation';

import CategoriesMap from './app/pages/categoriesMap';
import Home from './app/pages/Home'
const Navigation = StackNavigator({
  Home:{screen:Home},
  CategoriesMap:{screen:CategoriesMap}
  
},{
  headerMode: 'none',
  navigationOptions: {
  headerVisible: false,
  }
 
});
export default Navigation;



// ,{
//   initialRouteName: 'Dashboard',
//   transitionConfig: () => fromLeft(500),
// },{
//   initialRouteName: 'CategoriesMap',
//   transitionConfig: () => flipY(1000),
// }