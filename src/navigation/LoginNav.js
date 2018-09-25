import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import Wellcome from 'layouts/Wellcome'
import SignIn from 'layouts/SignIn'
import SignUp from 'layouts/SignUp'
import ForgotPassword from 'layouts/ForgotPassword'

export default LoginNav = createStackNavigator({
  Wellcome: {
    screen: Wellcome
  },
  SignIn: {
    screen: SignIn
  },
  SignUp: {
    screen: SignUp
  },
  ForgotPassword: {
    screen: ForgotPassword
  }
}, { 
  headerMode: 'none',
  initialRouteName: 'SignIn',
})
