
import React from 'react';
import { Text, Image, View, SafeAreaView,ScrollView
 } from 'react-native';
import { Icon } from 'react-native-elements'
import MyHeader from './MyHeader'
import { styles } from './assets/styles';
import { Audio } from 'expo-av';





export default class Pokemon extends React.Component {

  state = { pokemon: '' }

  componentDidMount() {
    let pokemon = this.props.route.params.pokemon ? this.props.route.params.pokemon : 'Aucun pokemon selectionné'
    this.setState({ pokemon })

    this.playPokemonSound(pokemon.name)
    this.changeScreenOrientation()

  }

  async  changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
  }

  async playPokemonSound(name) {
    const url = `https://play.pokemonshowdown.com/audio/cries/${name}.ogg`
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri: url });
      await soundObject.playAsync();

    } catch (error) {
      alert(error)
    }
  }

  render() {

    return (

      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <MyHeader navigation={this.props.navigation} name={this.constructor.name}></MyHeader>
        <ScrollView>
          <View style={{ width: '100%', alignContent: "center", alignItems: 'center' }}>
            <View style={{ alignContent: "center", justifyContent: "center", borderBottomWidth: 1, borderTopWidth: 1, flexDirection: "row", marginHorizontal: "auto", borderColor: "rgb(250,90,86)", width: '90%' }} >
              <Image source={{ uri: this.state.pokemon.imgUrl }} style={{ width: 250, height: 250 }} />
            </View >
            <Icon
              name='sound'
              type='entypo'
              size={35}
              onPress={() => { this.playPokemonSound(this.state.pokemon.name) }}
              containerStyle={{ height: 50, width: 50 }}
            />
          </View>

          <View style={styles.infos} >
            <Icon
              name='arrows-v'
              type='font-awesome'
              color='black'
              containerStyle={{ height: 30, width: 20 }}
            />

            <Text style={{ fontSize: 30 }}> {this.state.pokemon.height} m </Text>
          </View>
          <View style={styles.infos}>
            <Image
              source={require('./assets/weight.png')}
              style={{ height: 30, width: 30 }}

            />
            <Text style={{ fontSize: 30 }}> {this.state.pokemon.weight} lbs </Text>
          </View>
          <View style={styles.infos}>
            <Text style={{ fontSize: 30 }}>Type</Text>

            <Text style={{ fontSize: 30 }}>  {String(this.state.pokemon.types)}  </Text>

          </View>
        </ScrollView>

      </SafeAreaView >

    );
  }
}
