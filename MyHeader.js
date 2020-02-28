
import React from 'react';
import { Header, Button, Icon } from 'react-native-elements';
import { View } from 'react-native';
import * as firebase from 'firebase';


export default class MyHeader extends React.Component {

  logout(){

    firebase.auth().signOut().then(() => {
      alert("deconnexion ...")
      this.props.navigation.navigate(('PokedexTab'))
    }, function(error) {
      alert(error)
    });
    

  }

  render() {

    return (

      <Header
        leftComponent={<Icon
          name='menu'
          type='Entypo'
          color='#fff'
          onPress={() => this.props.navigation.toggleDrawer()} />}
        centerComponent={{ text: this.props.name, style: { color: '#fff' } }}
        rightComponent={<View style= {{flexDirection:'row' }}>
          <Icon
            name='home'
            type='Entypo'
            color='#fff'
            onPress={() => this.props.navigation.navigate(('Pokedex'))} />
            <Icon
            name='logout'
            type='material-community'
            color='white'
            containerStyle={{marginLeft:20}}
            onPress={() =>{ this.logout() }} />
        </View>
        }
        containerStyle={{
          backgroundColor: 'rgb(250,90,86)',
          justifyContent: 'space-around',
          alignContent: 'center',
          marginBottom: 5
        }}
      />

    )
  }
}





