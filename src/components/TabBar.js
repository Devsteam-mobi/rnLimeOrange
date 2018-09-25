import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur';

import { width, height, font, tabBarMenuItems, overlay } from 'constants/config'
import images from 'images'

export default class StdTabBar extends Component {
  keyExtractor = (item, index) => 'tabBarBtn_' + item.key

  onPressTabBarItem = (layoutType) => {
    const { navigation } = this.props
    switch (layoutType) {
      default:
        navigation.navigate(layoutType)
    }
  }

  keyExtractor = (item, index) => 'tabBarItem_' + item.key + '_' + index

  renderItem = ({ item, index }) => {
    const { navigation } = this.props
    const currentRoute = navigation.state && navigation.state.routes && navigation.state.routes[navigation.state.index]
    const isCurrentRoute = currentRoute && currentRoute.key == item.layoutType
    return (
      <TouchableOpacity style={styles.touchableWrapper} onPress={() => this.onPressTabBarItem(item.layoutType)}>
        <View style={[styles.menuItemWrapper, isCurrentRoute && styles.menuItemWrapperHighlighted]}>
          <View style={[styles.menuItemInner, isCurrentRoute && styles.menuItemInnerHighlighted]}>
            <View style={styles.menuItemIconWrapper}>
              <Image source={
                isCurrentRoute
                  ? images[item.icon + 'Active']
                  : images[item.icon]
              } style={styles.menuItemImage} />
            </View>  
            {
              item.text ?
                  <Text style={[styles.menuItemTitle, isCurrentRoute && styles.menuItemTitleHighlighted]}>
                    {item.text}
                  </Text>
                : null
            }
          </View>  
        </View>  
        {
          item.key == 'barcode' ?
            <View style={styles.labelWrapper}>
              <View style={styles.labelInner}>
                <Text style={styles.labelText}>
                  1400p
                </Text>
              </View>
            </View>
            : null
        }
      </TouchableOpacity>
    )
  }

  render() {
    const { navigation, blur=false, wrapperCustomStyle } = this.props
    return (
      <View style={styles.wrapper}>
        <View style={[styles.inner, blur && { backgroundColor: 'rgba(0,0,0,0.1)' }, wrapperCustomStyle]}>
          {
            blur ?
              <BlurView
                style={styles.blurView}
                viewRef={1}
                blurType={'light'}
                blurAmount={2} />
              : null
          }
          <View style={styles.content}>
            {
              tabBarMenuItems && tabBarMenuItems.map((item, index) => <View style={{flex: 1}} key={this.keyExtractor(item, index)}>{this.renderItem({item, index})}</View>)
            }  
          </View>
        </View>
      </View>  
    )
  }
}

// <FlatList
//   horizontal={true}  
//   data={tabBarMenuItems}
//   extraData={this.props}
//   keyExtractor={this.keyExtractor}
//   renderItem={this.renderItem}/> 

const styles = StyleSheet.create({
  wrapper: {
    width: width(100),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: width(14)
  },
  inner: {
    flex: 1
  },
  blurView: {
    ...overlay,
    top: 0,
    left: 0
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemWrapper: {
    paddingVertical: width(0),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemWrapperHighlighted: {
    backgroundColor: 'white'
  },
  menuItemInner: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
    paddingVertical: width(0),
  },
  menuItemInnerHighlighted: {
    borderRightWidth: 0
  },
  menuItemIconWrapper: {
    height: width(7),
    width: width(7)
  },
  menuItemImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  menuItemTitle: {
    fontSize: font.small,
    color: 'grey',
    marginTop: width(1),
    textAlign: 'center'
  },
  menuItemTitleHighlighted: {
    color: '#4578E9'
  },
  labelWrapper: {
    position: 'absolute',
    top: width(-4),
    right: 0
  },
  labelInner: {
    paddingHorizontal: width(0.8),
    paddingVertical: width(0.3),
    backgroundColor: '#DD6C3C'
  },
  labelText: {
    fontSize: font.tiny,
    color: 'white'
  }
})