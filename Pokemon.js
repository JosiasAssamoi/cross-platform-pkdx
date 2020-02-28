
import React from 'react';
import { Text } from 'react-native';
import MyHeader from './MyHeader'
import { SafeAreaView } from 'react-native-safe-area-context';
export default class Pokemon extends React.Component {

  state = { pokemon: '' }

  componentDidMount() {
   
    
    let pokemon = this.props.route.params.pokemon ? this.props.route.params.pokemon : 'Aucun pokemon selectionné'
    this.setState({ pokemon })

  }

  render() {

    return (

      <SafeAreaView>
        <MyHeader navigation={this.props.navigation} name={this.constructor.name}></MyHeader>
        <Text >{this.state.pokemon.name}</Text>
      </SafeAreaView>

    )
  }
}
