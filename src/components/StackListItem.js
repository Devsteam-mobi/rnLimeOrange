import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import { width, height, randomBool } from 'constants/config'

export default class StackListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemAwayAnimationValue: new Animated.Value(0),
      itemTopAnimationValue: new Animated.Value(0)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animationEnabled != nextProps.animationEnabled && nextProps.animationEnabled) {
      if (nextProps.idx == nextProps.stackLength -1) {
        Animated.parallel([this.animationAway(1), this.animationTop(1)]).start()
      } else {
        this.animationTop(0.1).start()
      }
    }
  }

  animationAway = (value) => {
    const { stackOptions } = this.props
    Animated.timing(
      this.state.itemAwayAnimationValue, 
      {
        toValue: value,
        duration: stackOptions.animation.speed,
      }
    ).start();  
  }

  animationTop = (value) => {
    const { stackOptions } = this.props
    return Animated.timing(
      this.state.itemTopAnimationValue, 
      {
        toValue: value,
        duration: stackOptions.animation.speed,
      }
    )
  }
  
  render() {
    const { item, renderItem, idx, stackOptions, itemWrapperStyle, itemContainerStyle, listWidth, stackLengthMax, stackLength, animationEnabled, dataLength } = this.props
    const { itemAwayAnimationValue, itemTopAnimationValue } = this.state
    const WrapperComponent = stackOptions && stackOptions.animation
      ? Animated.View
      : View
    const opacity = (1/stackLength)*(idx+(animationEnabled ? 2 : 1)) * (
      animationEnabled
        ? idx == stackLength - 2
          ? 1
          : 0.5
        : idx == stackLength - 1 
          ? 1
          : 0.5 
    )
    const moveSide = stackOptions && stackOptions.animation && item.moveSide
      ? item.moveSide
      : randomBool()
        ? 'left'
        : 'right'
    const rotation = itemAwayAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', moveSide == 'left' ? '-100deg' : '100deg'],
    });
    const moveSideAmount = itemAwayAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -1*width(100)],
    });
    const topDefault = (stackOptions.offsetSide == 'top' || !stackOptions.offsetSide ? (stackOptions.itemOffset * (idx + (dataLength > stackLengthMax && idx != stackLength - 2  && animationEnabled ? 0 : 0))) : 0)
    const moveDown = itemTopAnimationValue.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [topDefault, topDefault + stackOptions.itemOffset, height(50)],
    });
    return (
      <WrapperComponent style={[
        styles.wrapper,
        listWidth && {width: listWidth},
        stackOptions && stackOptions.itemOffset && { [stackOptions.offsetSide || 'top']: topDefault },
        stackOptions && stackOptions.animation && {transform: [
            {rotateZ: rotation},
            {perspective: 1000},
          ], 
        [moveSide]: moveSideAmount, top: moveDown},
        itemWrapperStyle && itemWrapperStyle
        ]}>
        <View style={[
          styles.container,
          itemContainerStyle && itemContainerStyle,
          stackOptions && stackOptions.changeOpacity && { 
            opacity: opacity},
          ]}>
          {renderItem({item, index: idx})}
        </View>
      </WrapperComponent>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'white'
  },
  container: {

  }
});

