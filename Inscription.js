import React from 'react';
import {  Text, View , SafeAreaView,TextInput} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {styles} from './assets/styles'
import MyHeader from './MyHeader'
import * as firebase from 'firebase';



export default class Inscription extends React.Component {

    
  state = { email: "", password: "", password2:"" };

  setInscription(email,pass,pass2) {

    if (pass !== pass2){
        alert("Vos mots de passe ne sont pas identiques")
    }
    else{
        const navigation = this.props.navigation
        

        try {
            firebase.auth().createUserWithEmailAndPassword(email, pass)
              .then(user => {
                
                firebase.database().ref('users/' + user.user.uid).update({
                  uid : user.user.uid,
                  email: email,
                });
                alert(`${user.user.email} est désormais inscrit,vous pourrez desormais fav les pok's ;) `)
                navigation.navigate('PokedexTab')
                
              })
              .catch(error => {
                alert(error)
      
              });
          }
          catch (error) {
            alert(error.toString(error));
          }
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
          <TextInput placeholder="Entrer votre email.." placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text) => { this.setState({ email: text }) }} />
          <TextInput placeholder="Mot de passe.." placeholderColor="#c4c3cb" secureTextEntry={true} style={styles.loginFormTextInput} onChangeText={(text) => { this.setState({ password: text }) }} />
          <TextInput placeholder="Confirmer votre mot de passe.." placeholderColor="#c4c3cb" secureTextEntry={true} style={styles.loginFormTextInput} onChangeText={(text) => { this.setState({ password2: text }) }} />
          <Button
            buttonStyle={styles.loginButton}
            onPress={() => { this.setInscription(this.state.email.trim(), this.state.password.trim(),this.state.password2.trim()) }
            }
            title="Valider"
          />
        </View>
      </SafeAreaView>
  );
}}


