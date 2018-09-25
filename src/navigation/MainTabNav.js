import React, { Component } from 'react';
import { View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'

import { width, height, tabBarMenuItems } from 'constants/config'

import TabBar from 'components/TabBar'

import Barcode from 'layouts/Barcode'
import Coupons from 'layouts/Coupons'
import Favorites from 'layouts/Favorites'
import Cart from 'layouts/Cart'


const layouts = {
  Barcode: Barcode,
  Coupons: Coupons,
  Favorites: Favorites,
  Cart: Cart
}

const getNavComp = (initialRouteName) => {
  return createBottomTabNavigator(tabBarMenuItems.reduce(function(acc, cur, i) {
    acc[cur.layoutType] = {
      screen: (props) => { 
        const LayOutComp = layouts[cur.layoutType] || layouts[cur.layoutType + 'Stack']
        return <LayOutComp screenProps={{...cur, navigation: props.navigation}}/>
      }
    };
    return acc;
  }, {}), { 
    headerMode: 'none',
    initialRouteName: initialRouteName,
    tabBarPosition: 'bottom',
    tabBarComponent: TabBar,
    tabBarOptions: {
      style: {
        height: width(14)
      },
      labelStyle: {
        margin: 0,
        padding: 2
      }
    },
    lazy: true
  })
}

export default { BarcodeTabNav: getNavComp('Barcode'), CouponsTabNav: getNavComp('Coupons'), FavoritesTabnav: getNavComp('Favorites'), CartTabNav: getNavComp('Cart') }
