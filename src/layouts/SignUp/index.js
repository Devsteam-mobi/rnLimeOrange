import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, Image } from 'react-native';
import { connect } from 'react-redux'

import { width, height } from 'constants/config'
import { checkNextProps } from 'utils'

import StdInput from 'components/StdInput'
import StdBtn from 'components/StdBtn'
import StdCheckBox from 'components/StdCheckBox'

import fetchServ from 'actions/fetchServ'
import { setUserData } from 'actions/utils'

@connect(
	state => ({
    signUp: state.signUp,
    userData: state.userData
	}),
  dispatch => ({
    actionSignUp: (data) => {
      dispatch(fetchServ(urlsAndReducersKeys.signUp, data))
    },
    setUserData: (data) => {
      dispatch(setUserData(data))
    }
  })
)
export default class SignUp extends Component {
  constructor(props) {
    super(props)
    const fields = {
      email: '',
      pswd: '',
      termsOfUse: false
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

  async componentDidMound() {
    const { actionSignUp } = this.props
    await this.setSTate({isLoading: true})
    actionSignUp()
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, setUserData } = this.props
    const propsCheckerSignUp = checkNextProps(nextProps, this.props, 'signUp')
    if (propsCheckerSignUp == 'error') {
      const error = nextProps.signUp.response.status == 'failed' && nextProps.signUp.response.desc
      this.setState({ isLoading: false });
      error && Alert.alert(error)
    } else if (propsCheckerSignUp && propsCheckerSignUp != 'empty') {
      const data = nextProps.signUp.response.data
      console.log('nextProps.signUp.response.data')
      console.log(data)
      this.setState({
        isLoading: false,
      })
    } else if (propsCheckerSignUp == 'empty') {
      this.setState({ isLoading: false });
    }

    const propsCheckerUserData = checkNextProps(nextProps, this.props, 'userData', null, true)
    if (propsCheckerUserData) {
      if (nextProps.userData && nextProps.userData.data && nextProps.userData.data.token) {
        const getUserData = nextProps.getUser.response.data
        if (getUserData && getUserData.user && nextProps.userData.data.userModel && Object.keys(nextProps.userData.data.userModel).length) {
          // move next
        } else {
          actionGetUser({ token: nextProps.userData.data.token })
        }
      }
    }
  }

  onPressSubmit = () => {
    const { navigation } = this.props
    if (Object.values(fields).every(item => item)) {
      navigation.navigate('DrawerNav')
    } else {
      ALert.alert('Please check form')
    }
  }


  render() {
    const { navigation } = this.props
    const { isLoading, fields } = this.state
    const { email, pswd, termsOfUse } = fields
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.formWrapper}>
            <View style={styles.formInputWrapper}>
              <StdInput
                value={email}
                placeholder="Email"
                placeholderTextColor="#C0CAD3"
                onTextChange={value => this.onFieldChange('email', value)} />
            </View>
            <View style={styles.formInputWrapper}>
              <StdInput
                value={pswd}
                placeholder="Password"
                placeholderTextColor="#C0CAD3"
                onTextChange={value => this.onFieldChange('pswd', value)} />
            </View>
            <View style={styles.checkBoxWrapper}>
              <StdCheckBox
                value={termsOfUse}
                text="Terms of Use"
                onPress={() => this.onFieldChange('termsOfUse')} />
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <View style={styles.submitBtnWrapper}>
              <StdBtn
                onPress={this.onPressSubmit}
                customInnerStyle={styles.btnCustomInnerStyle}
                title="Submit" />
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
  btnWrapper: {
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
  }
})