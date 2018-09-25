import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import StackListItem from './StackListItem'

const defaultStackLength = 5
const defaultAnimationSpeed = 1500

export default class StackList extends Component {
  constructor(props) {
    super(props);
    const { stackOptions } = this.props
    this.state = {
      animation: false,
      animationSpeed: stackOptions && stackOptions.animation && stackOptions.animation.speed || defaultAnimationSpeed,
      data: this.props.data
    }
  }
  
  async shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state != nextState) {
      return true
    }
    if (this.props.extraData) {
      if (this.props.extraData != nextProps.extraData) {
        if (this.props.data.length != nextProps.data.length) {
          if (nextProps.stackOptions && nextProps.stackOptions.animation) {
            await this.animateList()
            this.setState({data: nextProps.data})
          }
        }
        return true
      }
    }
    return false
  }

  animateList = () => {
    const { animationSpeed } = this.state
    return new Promise((resolve, reject) => {
      this.setState({animation: true}, () => {
        setTimeout(() => {
          this.setState({animation: false}, () => resolve())
        }, animationSpeed)
      })
    })
  }
  
  _keyExtractor = (item, idx) => 'stackListItem_' + idx

  render() {
    const { keyExtractor, renderItem, style, contenContainerStyle, stackOptions, itemWrapperStyle, itemContainerStyle } = this.props
    const { animation, animationSpeed, data } = this.state
    // in case of big arrays and with animated items it is a must to limit amount of data
    const stackLength = data && data.length 
      ? stackOptions && stackOptions.maxStackLength
        ? stackOptions.maxStackLength < data.length
          ? stackOptions.maxStackLength
          : data.length
        : stackOptions && stackOptions.animation
          ? defaultStackLength
          : data.length
      : data.length
    const dataAfterSlice = data && data.length && data.slice(-1 * stackLength)
    return (
      <View style={[styles.wrapper, style && style]}>
        <View style={[styles.container, contenContainerStyle && contenContainerStyle]}>
          {
            dataAfterSlice && dataAfterSlice.length ?
              dataAfterSlice.map((item, idx) => <StackListItem
                stackLengthMax={stackLength}
                animationEnabled={animation}
                stackLength={dataAfterSlice.length}
                dataLength={data.length}
                listWidth={style.width}
                itemContainerStyle={itemContainerStyle}
                itemWrapperStyle={itemWrapperStyle}
                stackOptions={
                  stackOptions && stackOptions.animation && stackOptions.animation.speed
                    ? {...stackOptions, animation: {...stackOptions.animation, speed: animationSpeed} }
                    : stackOptions
                }
                renderItem={renderItem}
                item={item}
                idx={idx}
                key={keyExtractor
                  ? keyExtractor(item, idx) 
                  : this._keyExtractor(item, idx)} />)
              : null
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%'
  },
  container: {
    width: '100%'
  }
});

