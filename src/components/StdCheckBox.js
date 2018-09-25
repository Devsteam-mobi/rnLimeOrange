import React, { Component, PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native'

import { height, width } from 'constants/config'

export default class StdCheckBox extends PureComponent {
  render() {
    const { text, onPress, wrapperCustomStyle, innerCustomStyle, checkBoxImageWrapperCustomStyle, checkBoxElementCustomStyle, checkBoxElementActiveCustomStle, textWrapperCustomStyle, textCustomStyle, image, value } = this.props
    return (
      <View style={[styles.checkBoxWrapper, wrapperCustomStyle]}>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.checkBoxInner, innerCustomStyle]}>
            {
              image ?
                <View style={[styles.checkBoxImageWrapper, checkBoxImageWrapperCustomStyle]}>
                  <Image style={styles.checkBoxImage} source={images[image + (value ? 'Active' : '')]} />
                </View>
                :
                <View style={[styles.checkBoxElement, checkBoxElementCustomStyle, value && styles.checkBoxElementActive, value && checkBoxElementActiveCustomStle]}>

                </View>
            }
            {
              text ?
                <View style={[styles.textWrapper, textWrapperCustomStyle]}>
                  <Text style={[styles.text, textCustomStyle]}>
                    {text}
                  </Text>
                </View>
                : null
            }
          </View>  
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkBoxWrapper: {

  },
  checkBoxInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkBoxImageWrapper: {
    width: width(3),
    height: width(3)
  },
  checkBoxImage: {
    width: '100%',
    height: '100%'
  },
  checkBoxElement: {
    width: width(3),
    height: width(3),
    borderColor: '#C0CAD3',
    borderWidth: 1
  },
  checkBoxElementActive: {
    backgroundColor: 'black'
  },
  textWrapper: {

  },
  text: {
    marginLeft: width(3),
    fontSize: width(4)
  }
})