import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { width, hegith } from 'constants/config'

import StdRadioBtn from 'components/StdRadioBtn'

export default class StdRadiosBtnsSet extends Component {
  renderItem = ({ item, index }) => {
    const { value, onChange, itemWrapperCustomStyle, itemInnerCustomStyle, itemTextCustomStyle, 
      itemRadioWrapperCustomStyle, itemCircleCustomStyle, isHorizontal, changeFontWeightOnSelect, 
      optionTextSetFunc, inlineHint, hintWrapperCustomStyle, hintCustomStyle, middleSep, renderSep } = this.props
    const checked = value === item.key
    return (
      <StdRadioBtn
      value={checked}
      hint={item.hint}
      text={
        optionTextSetFunc
          ? optionTextSetFunc(item, index)
          : item.text
      }
      onPress={() => onChange(item.key)}
      inlineHint={inlineHint}
      hintWrapperCustomStyle={hintWrapperCustomStyle}
      hintCustomStyle={hintCustomStyle}
      wrapperCustomStyle={{ ...itemWrapperCustomStyle, ...(isHorizontal && index != 0 ? { marginLeft: width(6) } : {}), ...(itemWrapperCustomStyle ? itemWrapperCustomStyle : {})}}
      innerCustomStyle={itemInnerCustomStyle}
      textCustomStyle={
        changeFontWeightOnSelect && checked
          ? StyleSheet.flatten([itemTextCustomStyle, {fontWeight: '700'}])
          : itemTextCustomStyle
      }
      radioWrapperCustomStyle={itemRadioWrapperCustomStyle}
      circleCustomStyle={itemCircleCustomStyle}/>
    )
  }

  _keyExtractor = (item, idx, setName) => {
    return 'StdRadiosBtnsSet' + (setName ? '_' + setName : '') + '_option_' + idx
  }

  render() {
    const { value, onChange, options, customWrapperStyle, customInnerStyle,
      keyExtractor, isHorizontal, customOptionWrapper, name,
      itemWrapperCustomStyle, itemInnerCustomStyle, itemTextCustomStyle,
      itemRadioWrapperCustomStyle, itemCircleCustomStyle, renderSep, optionTextSetFunc, 
      changeFontWeightOnSelect, lastSep, inlineHint, hintWrapperCustomStyle, hintCustomStyle, middleSep } = this.props
    return (
      <View style={[styles.wrapper, customWrapperStyle]}>
        <View style={[styles.inner, isHorizontal && styles.innerHorizontal, customInnerStyle]}>
          {
            options && options.map((item, idx) => {
              const option = (
                <View 
                  style={[styles.optionWrapper, customOptionWrapper]}>
                  {this.renderItem({item, index: idx})}
                  {
                    middleSep 
                      ? renderSep
                      : null
                  }
                </View>
              )
              if (renderSep) {
                return (
                  <View key={
                    keyExtractor
                      ? keyExtractor(item, idx, name)
                      : this._keyExtractor(item, idx, name)
                    }>
                    {option}
                    {
                      (lastSep == false && idx != options.length - 1) || (lastSep == undefined)
                        ? renderSep
                        : null
                    }
                  </View>
                )
              } else {
                return (
                  <View key={
                    keyExtractor
                      ? keyExtractor(item, idx, name)
                      : this._keyExtractor(item, idx, name)
                    }>
                    {option}
                  </View>
                )
              }
            })
          }
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  wrapper: {

  },
  inner: {

  },
  innerHorizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionWrapper: {

  }
});
