import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, Image } from 'react-native';
import { connect } from 'react-redux'

import { width, height } from 'constants/config'
import { checkNextProps } from 'utils'

import StdInput from 'components/StdInput'
import StdBtn from 'components/StdBtn'
import NavBar from 'components/NavBar'

import fetchServ from 'actions/fetchServ'
import { setUserData } from 'actions/utils'

@connect(
	state => ({
    forgotPassword: state.forgotPassword,
    userData: state.userData
	}),
  dispatch => ({
    actionForgotPassword: (data) => {
      dispatch(fetchServ(urlsAndReducersKeys.forgotPassword, data))
    },
    setUserData: (data) => {
      dispatch(setUserData(data))
    }
  })
)
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    const fields = {
      email: '',
    }
    this.state = {
      fields,
      isLoading: false
    }
  }

  onFieldChange = (fieldName, value) => {
    const newStateFields = this.state.fields
    switch (typeof newStateFields[fieldName]) {
      case 'boolean':
        newStateFields[fieldName] = !newStateFields[fieldName]
        break
      default:
        newStateFields[fieldName] = value
    }
    this.setState({fields: newStateFields})
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, setUserData } = this.props
    const propsCheckerForgotPassword = checkNextProps(nextProps, this.props, 'forgotPassword')
    if (propsCheckerForgotPassword == 'error') {
      const error = nextProps.forgotPassword.response.status == 'failed' && nextProps.forgotPassword.response.desc
      this.setState({ isLoading: false });
      error && Alert.alert(error)
    } else if (propsCheckerForgotPassword && propsCheckerForgotPassword != 'empty') {
      const data = nextProps.forgotPassword.response.data
      console.log('nextProps.forgotPassword.response.data')
      console.log(data)
      this.setState({
        isLoading: false,
      })
    } else if (propsCheckerForgotPassword == 'empty') {
      this.setState({ isLoading: false });
    }

  }

  onPressSubmit = async () => {
    const { actionForgotPassword } = this.state
    const { email } = fields
    await this.setState({ isLoading: true })
    if (Object.values(fields).every(item => item)) {
      actionForgotPassword({
        email
      })
      Alert.alert('We send you password')
      navigation.goBack()
    } else {
      ALert.alert('Please check form')
    }
  }

  onPressGoBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }


  render() {
    const { navigation } = this.props
    const { isLoading, fields } = this.state
    const { email } = fields
    const navBarProps = {
      leftPart: {
        text: 'Back',
        onPress: this.onPressGoBack
      },
    }
    return (
      <View style={styles.wrapper}>
        <NavBar {...navBarProps} />
        <View style={styles.container}>
          <View style={styles.formWrapper}>
            <View style={styles.formInputWrapper}>
              <StdInput
                value={email}
                placeholder="Email"
                placeholderTextColor="#C0CAD3"
                onTextChange={value => this.onFieldChange('email', value)} />
            </View>
          </View>
          <View style={styles.btnsWrapper}>
            <View style={styles.submitBtnWrapper}>
              <StdBtn
                onPress={this.onPressSubmit}
                customInnerStyle={styles.btnCustomInnerStyle}
                title="Reset password" />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formWrapper: {
    width: width(80)
  },
  formInputWrapper: {
    height: width(14),
    width: '100%',
    borderColor: '#C0CAD3',
    borderWidth: 1,
    paddingHorizontal: width(2),
    paddingVertical: width(0.4)
  },
  checkBoxWrapper: {
    marginTop: width(6)
  },
  btnsWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitBtnWrapper: {
    marginTop: width(6),
    height: width(12),
    width: width(60)
  },
  btnCustomInnerStyle: {
    borderColor: '#C0CAD3',
    borderWidth: 1,
  },
})