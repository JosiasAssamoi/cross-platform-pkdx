
import React from 'react';
import { Text , StyleSheet,SafeAreaView , ScrollView , View} from 'react-native';
import { myConfig } from './firebase-config'
import * as firebase from 'firebase';

export default class Auth extends React.Component {




  componentDidMount() {
    firebase.initializeApp(myConfig);
  }







  render() {
    return (<LoginScreen></LoginScreen>)
    }
  }
