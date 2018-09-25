import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import Main from 'layouts/Main'
import MainTabNav from 'navigation/MainTabNav'

export default MainNav = createStackNavigator({
  Main: {
    screen: Main
  },
  BarcodeTabNav: {  
    screen: MainTabNav.BarcodeTabNav
  },
  CouponsTabNav: {  
    screen: MainTabNav.CouponsTabNav
  },
  FavoritesTabnav: {  
    screen: MainTabNav.FavoritesTabnav
  },
  CartTabNav: {  
    screen: MainTabNav.CartTabNav
  },
}, { 
  headerMode: 'none',
  initialRouteName: 'Main',
})
