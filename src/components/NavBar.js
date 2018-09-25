import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, Platform, TextInput } from 'react-native'

import { height, width, font, statusBarHeight } from 'constants/config'
import images from 'images'


export default class NavBar extends Component {
  renderPart = (part) => {
    if (part) {
      if (part.comp) {
        return part.comp
      } else if (part.icon) {
        return (
          <TouchableOpacity style={styles.btn} onPress={part.onPress}>  
            {part.icon}
          </TouchableOpacity>
        )
      } else if (part.text) {
        return (
          <TouchableOpacity style={styles.btn} onPress={part.onPress}>  
            <Text style={[styles.text, part.textStyle && part.textStyle]}>
              {part.text}
            </Text>  
          </TouchableOpacity>
        )
      } else if (part.image) {
        return (
          <TouchableOpacity style={styles.btn} onPress={part.onPress}>  
            <View style={[styles.iconImageWrapper, part.imageWrapperCustomStyle]}>
              <Image
                source={images[part.image]}
                style={styles.iconImage} />
            </View>  
          </TouchableOpacity>
        )
      }
    }
    return null
  }

  render() {
    const { navigation, withSearch, backgroundColor } = this.props
    const { leftPart, centerPart, rightPart } = this.props
    return (
      <View style={[styles.wrapper, backgroundColor && {backgroundColor: backgroundColor}]}>
        <View style={styles.container}> 
          <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />  
          <View style={[styles.leftPart, leftPart && leftPart.width && {width: leftPart.width}]}>
            {this.renderPart(leftPart)}
          </View>
          <View style={styles.centerPart}>
            {
              centerPart
                ? centerPart.comp
                  ? centerPart.comp
                  : <Text style={[styles.centerPartText, centerPart.fontSize && {fontSize: centerPart.fontSize}, centerPart.customTextStyles && centerPart.customTextStyles]}>{centerPart.text}</Text>
                : null
            }
          </View>
          <View style={[styles.rightPart, rightPart && rightPart.width && {width: rightPart.width}]}>
            {this.renderPart(rightPart)}
          </View>
        </View>
        {
          withSearch ?
            <View style={styles.searchInputWrapper}>
                <View style={styles.searchIconWrapper}>
                  <Image source={images.searchIconGrey} style={styles.searchIconImage} />
                </View>  
                <TextInput underlineColorAndroid="transparent" style={styles.searchInput} />
              </View>  
            : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingTop: statusBarHeight
  },
  container: {
    // height: Platform.OS == 'ios'
    //   ? width(14)
    //   : width(10),
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: width(4),
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: Platform.OS == 'ios'
      ? width(2)
      : width(2)
  },
  leftPart: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerPart: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerPartText: {
    fontSize: width(5),
    color: 'black',
  },
  rightPart: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconImageWrapper: {
    height: width(7),
    width: width(7),
  },
  iconImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  text: {
    fontSize: width(4.2),
    color: 'black'
  },
  btn: {
    padding: width(1)
  },
  searchInputWrapper: {
    width: width(96),
    borderRadius: width(2),
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingHorizontal: width(1),
    marginBottom: width(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    flex: 1,
    fontSize: font.small,
    paddingVertical: width(0.8),
    marginLeft: width(2)
  },
  searchIconWrapper: {
    height: width(5),
    width: width(5),
  },
  searchIconImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  }
})
