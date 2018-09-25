import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation'

import { width, height } from 'constants/config'

import CustomDrawerContentComponent from 'components/CustomDrawerContentComponent'

import MainNav from 'navigation/MainNav'

const DrawerNavigatorConfig = {
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  drawerWidth: width(80),
  drawerPosition: 'left',
  drawerBackgroundColor: 'transparent',
  initialRouteName: 'MainNav',
  contentComponent: props => <CustomDrawerContentComponent {...props} />,
}

export default StackNav = createDrawerNavigator({
  MainNav: {  
    screen: MainNav
  },
}, DrawerNavigatorConfig)