import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { width, height } from 'constants/config'

export default class btnItem extends Component {
  render() {
    const { item, idx, onPressItem, isActive } = this.props
    const { text, key } = item
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={() => onPressItem(item, idx)}>
          <View style={[styles.btnInner, isActive && styles.btnInnerActive]}>
            <View style={styles.btnTextWrapper}>
              <Text style={[styles.btnText, isActive && styles.btnTextActive]}>
                {text}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnWrapper: {
    paddingHorizontal: width(2),
    paddingVertical: width(1)
  },
  btnInner: {
    
  },
  btnInnerActive: {

  },
  btnTextWrapper: {

  },
  btnText: {

  },
  btnTextActive: {
    color: '#D8D8D8'
  },
});
