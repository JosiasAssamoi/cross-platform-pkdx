
import React from 'react';
import { Text, SafeAreaView, View, TextInput, ScrollView, Image, Picker } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import MyHeader from './MyHeader';
import { styles } from './assets/styles';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
export default class Pokedex extends React.Component {

    state = { initialPokemons: [], pokemons: [], searchFilter: 'name' }

    async fetchPokemons() {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
        let pokemons = await response.json()
        Object.values(pokemons.results).forEach((pokemon) => {

            this.fetchSinglePokemon(pokemon)
        })


    }

    async fetchSinglePokemon(pokemon) {
        const response = await fetch(pokemon.url)
        const pokeData = await response.json()
        const poket = { id: pokeData.id, name: pokeData.name, imgUrl: pokeData.sprites.front_default, height: pokeData.height, weight: pokeData.weight }
        this.setState({ pokemons: [...this.state.pokemons, poket], initialPokemons: [...this.state.pokemons, poket] })
    }

    componentDidMount() {
        this.fetchPokemons()
    }

    SearchMatchedPokmons(text) {

        const filter = String(this.state.searchFilter)
        text = String(text).toLowerCase()
        if (text == '') {
            this.setState({ pokemons: this.state.initialPokemons })
        }
        else {
            pokemons = this.state.pokemons.filter((pokemon) => {

                console.log(text, String(pokemon[filter]).toLowerCase(), typeof String(pokemon[filter]).toLowerCase(), String(pokemon[filter]).toLowerCase().includes(text))
                if (String(pokemon[filter]).toLowerCase().includes(String(text))) {
                    return pokemon
                }

            })
            this.setState({ pokemons })
            
        }





    }

    render() {

        return (
            <SafeAreaView>
                <MyHeader navigation={this.props.navigation} name={this.constructor.name}></MyHeader>
                <View style={styles.inputRow}>

                    <Icon
                        reverse
                        name='filter'
                        type='font-awesome'
                        color="black"
                        size={15}
                    />
                    <Picker
                        selectedValue="name"
                        style={{ height: 50, width: 110 }}
                        mode='dialog'
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ searchFilter: itemValue })
                        }>
                        <Picker.Item label="Nom" value="name" />
                        <Picker.Item label="Espcece" value="species" />
                        <Picker.Item label="Numero" value="num" />
                    </Picker>
                    <TextInput placeholder='Taper votre recherche ici' style={styles.input} onChangeText={(text) => { this.SearchMatchedPokmons(text) }}></TextInput>
                </View>
                <ScrollView style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        {this.state.pokemons.map((pokemon) => {
                            return (
                                <View style={styles.card}>
                                    <Image source={{ uri: pokemon.imgUrl }} style={{ width: 90, height: 90 }} />
                                    <Button title={pokemon.name} buttonStyle={{ width: '100%', borderWidth: 0, backgroundColor: 'transparent' }} titleStyle={{ color: 'rgb(250,90,86)', textTransform: 'capitalize' }} onPress={() => { this.props.navigation.navigate('Pokemon', { pokemon }) }} />
                                </View>)

                        })}


                    </View>

                </ScrollView>
            </SafeAreaView>

        )
    }
}
