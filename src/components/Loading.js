import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import BusyIndicator from 'react-native-busy-indicator'

import { width, height } from 'constants/config'

export default class Loading extends Component {
  render() {
    const { show } = this.props
    return (
      <BusyIndicator
        isVisible={show}
        overlayColor="rgba(0,0,0,0.4)"
        overlayWidth="20%"
        overlayHeight="10%"
        size="small" />
    );
  }
}

// <View style={styles.container}>
//         <Spinner
//           style={styles.spinner}
//           isVisible={true}
//           size={
//             Platform.OS == 'ios'
//               ? width(28)
//               : width(22)
//           }
//           type={'Circle'}
//           color={'#FFFFFF'} />  
//       </View>

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    alignSelf: 'center'
  }
})