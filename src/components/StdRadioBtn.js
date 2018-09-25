import React, { Component, PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native'

import { height, width, font } from 'constants/config'

export default class StdRadioBtn extends PureComponent {
  render() {
    const { value, text, hint, onPress, wrapperCustomStyle, innerCustomStyle,
      radioWrapperCustomStyle, circleCustomStyle, textCustomStyle,
      hintWrapperCustomStyle, hintCustomStyle, inlineHint } = this.props
    hintComp = (
      <View style={[styles.hintWrapper, hintWrapperCustomStyle]}>
        <Text style={[styles.hintText, hintCustomStyle]}>
          {hint}
        </Text>
      </View>
    )
    return (
      <View style={[styles.wrapper, wrapperCustomStyle]}>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.inner, innerCustomStyle]}>
            <View style={[styles.radioWrapper, radioWrapperCustomStyle]}>
              {
                value ?
                  <View style={[styles.circle, circleCustomStyle]} />
                  : null
              }
            </View>
            <Text style={[styles.text, textCustomStyle]}>
              {text}
            </Text>
            {
              inlineHint && hint ? 
                hintComp
                : null
            }
          </View>  
        </TouchableOpacity>
        {
          hint && !inlineHint ?
            hintComp
            : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {

  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  radioWrapper: {
    width: width(5),
    height: width(5),
    borderRadius: width(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  checkBoxImage: {
    width: '100%',
    height: '100%'
  },
  text: {
    marginLeft: width(3),
    fontSize: width(4)
  },
  circle: {
    height: width(3),
    width: width(3),
    borderRadius: width(3),
    backgroundColor: 'rgb(39, 118, 250)',
    marginLeft: 0.8,
    marginTop: 0.8
  },
  hintWrapper: {
    marginLeft: width(6)
  },
  hintText: {
    fontSize: font.regular * 0.8,
    color: 'white'
  }
})
