
import React from 'react';
import { Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import { myConfig } from './firebase-config'
import * as firebase from 'firebase';
import { styles } from './assets/styles'
import MyHeader from './MyHeader'

export default class Auth extends React.Component {


  state = { email: "", password: "" };

  setInscription() {
    let email = this.state.email
    let pass = this.state.password
    try {
      firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(user => {
          console.log('auth',user)
          alert(`${user.user.email} est désormais inscrit`)
        })
        .catch(error => {
          alert(error)

        });
    }
    catch (error) {
      alert(error.toString(error));
    }
  };

  setConnexion(email, pass) {
    const navigation = this.props.navigation

    try {
      firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(res => {
          alert(`${res.user.email} connexion reussie`);
          navigation.navigate('PokedexTab')

        }).catch(error => {

          alert(error)

        });
    }
    catch (error) {
      console.log(error.toString(error));
    }
  };




  componentDidMount() {
    
    const user = firebase.auth().currentUser;
    if (user) {
      alert('deja connecté');
      this.props.navigation.navigate('PokedexTab')
      } 
  

};
  





render() {

  return (
    <SafeAreaView>
      <MyHeader navigation={this.props.navigation} name={this.constructor.name}></MyHeader>
      <View  >
        <Icon
          reverse
          name='user-circle'
          type='font-awesome'
          color="rgb(250,90,86)"
          size={70}
          containerStyle={{ alignSelf: "center" }}
        />
        <TextInput placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text) => { this.setState({ email: text }) }} />
        <TextInput placeholder="Mot de passe" placeholderColor="#c4c3cb" secureTextEntry={true} style={styles.loginFormTextInput} onChangeText={(text) => { this.setState({ password: text }) }} />
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => { this.setConnexion(this.state.email, this.state.password) }
          }
          title="Let's Go"
        />
        <TouchableOpacity onPress={() => { this.setInscription() }} >
          <Text style={styles.signUpText}>Inscris toi !</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
}

