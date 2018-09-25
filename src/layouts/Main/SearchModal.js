import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { width, height } from 'constants/config'
import images from 'images'

import StdModal from 'components/StdModal'
import StdInput from 'components/StdInput'

export default class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }
  
  render() {
    const { show, onClosePress, onPressSearch } = this.props
    const { searchText } = this.state
    return (
      <StdModal
        animationType="fade"
        onClosePress={onClosePress}
        show={show}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View style={styles.inputWrapper}>
              <StdInput
                value={searchText}
                onTextChange={value => this.setState({searchText: value})}/>
            </View>
            <View style={styles.searchBtnWrapper}>
              <TouchableOpacity onPress={() => onPressSearch(searchText)}>
                <View style={styles.searchImageWrapper}>
                  <Image style={styles.searchImage} source={images.searchSmallBlack} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </StdModal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: width(80)
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputWrapper: {
    borderColor: '#C0CAD3',
    borderWidth: 1,
    flex: 1,
    height: width(14),
    paddingHorizontal: width(2),
    paddingVertical: width(0.4)
  },
  searchBtnWrapper: {
    marginHorizontal: width(2)
  },
  searchImageWrapper: {
    height: width(7),
    width: width(7)
  },
  searchImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  }
});
