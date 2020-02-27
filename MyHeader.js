
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
          rightComponent={{ icon: 'man', color: '#fff' }} 
          containerStyle={{
            backgroundColor: 'rgb(250,90,86)',
            justifyContent: 'space-around',
            marginBottom:5
          }}
          />
          
        )
      }
      }
      
      

      

