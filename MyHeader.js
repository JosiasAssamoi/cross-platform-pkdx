
import React from 'react';
import { Header,Button,Icon } from 'react-native-elements' ;

export default class MyHeader extends React.Component {

  render() {
    
    return (

        <Header
          leftComponent={ <Icon
            name='menu'
            type='Entypo'
            color='#fff'
            onPress={() => this.props.navigation.toggleDrawer()} />}    
          centerComponent={{ text: this.props.name, style: { color: '#fff' } }}
          rightComponent={ <Icon
            name='home'
            type='Entypo'
            color='#fff'
            onPress={() => this.props.navigation.navigate(('Pokedex'))} />}  
          containerStyle={{
            backgroundColor: 'rgb(250,90,86)',
            justifyContent: 'space-around',
            alignContent:'center',
            marginBottom:5
          }}
          />
          
        )
      }
      }
      
      

      

