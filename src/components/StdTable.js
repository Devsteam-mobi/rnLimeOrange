import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { width, height, font } from 'constants/config'

export default class StdTable extends Component {
  
  render() {
    const { data, amountOfColumns, borderWidth, borderColor, onPressItemCallback, customWrapperStyle, customRowStyle, customItemWrapperStyle, customInnerStyle, customItemInnerStyle, customItemTextStyle, renderItem, itemTintColor } = this.props
    let newNestedArrays = []
    data && data.forEach((dataItem) => {
      const lastNestedArray = newNestedArrays[(newNestedArrays.length || 1) - 1]
      if (lastNestedArray && lastNestedArray.length) {
        if (lastNestedArray.length < amountOfColumns) {
          newNestedArrays[(newNestedArrays.length || 1) - 1].push(dataItem)
        } else {
          newNestedArrays[newNestedArrays.length] = [dataItem]
        }
      } else if (!lastNestedArray) {
        newNestedArrays[(newNestedArrays.length || 1) - 1] = [dataItem]
      }
    })
    return (
      <View style={[styles.wrapper, customWrapperStyle]}>
        <View style={[styles.inner, customInnerStyle]}>
          {
            newNestedArrays && newNestedArrays.map((rowItems, rowIdx) => (
              <View key={'row_' + rowIdx} style={[styles.row, customRowStyle, borderWidth && rowIdx < newNestedArrays.length - 1 && {borderBottomWidth: borderWidth, borderColor: borderColor || 'black'}]}>
                {
                  rowItems && rowItems.map((item, itemIdx) => (
                    <View key={'row_' + rowIdx + 'item_' + itemIdx} style={[styles.itemWrapper, customItemWrapperStyle, item.heighlighted && {backgroundColor: itemTintColor}, borderWidth && itemIdx < rowItems.length - 1 && {borderRightWidth: borderWidth, borderColor: borderColor || 'black'}]}>
                      <TouchableOpacity onPress={() => onPressItemCallback(item, itemIdx, rowIdx)}>
                        <View style={[styles.itemInner, customItemInnerStyle]}>
                          {
                            renderItem
                              ? renderItem(item, itemIdx, rowIdx)
                              : <Text style={[styles.itemText, customItemTextStyle]}>
                                {
                                  item.text 
                                    ? item.text
                                    : item
                                }
                                </Text>
                          }
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                }
              </View>
            ))
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%'
  },
  inner: {
    height: '100%',
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  itemWrapper: {
    flex: 1
  },
  itemInner: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: font.regular,
    color: 'black',
    textAlign: 'center'
  }
});

