import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation'

import LoginNav from 'navigation/LoginNav'
import DrawerNav from 'navigation/DrawerNav'

export default StackNav = createStackNavigator({
  LoginNav: {
    screen: LoginNav
  },
  DrawerNav: {
    screen: DrawerNav
  }
}, {
  headerMode: 'none',
  initialRouteName: 'LoginNav',
})