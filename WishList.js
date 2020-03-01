
import React from 'react';
import { Text, SafeAreaView, View, TextInput, ScrollView, Image, Picker, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import MyHeader from './MyHeader';
import { styles } from './assets/styles';
import * as firebase from 'firebase';
import FavIcons from './FavIcons';
export default class WishList extends React.Component {

    state = { initialPokemons: [], pokemons: [], searchFilter: 'name', user: null }

    async fetchPokemons() {
      
      if (this.state.user !=null) {
        
        const favsRef = firebase.database().ref('/users/' + this.state.user.uid+'/favs/')
        const classThis = this
        favsRef.once('value', function(snapshot) {
            if (snapshot !=undefined || snapshot != null){
         
                snapshot.forEach( (child) => {
                  let pokemon = {}
                    pokemon.url ="https://pokeapi.co/api/v2/pokemon/"+String(child.val().pokemonId)
                   
                   let pokemonAlready = classThis.state.pokemons.find(o => o.id === child.val().pokemonId)
                   console.log('pokemon aleready',pokemonAlready);
                   
                    if(pokemonAlready==undefined){
                      classThis.fetchSinglePokemon(pokemon)
                    }
              
                    })
                }
            else{
              classThis.setState({ initialPokemons: [], pokemons: []})
            }
            })
      }
   
  
    }

    async fetchSinglePokemon(pokemon) {
        const response = await fetch(pokemon.url)
        const pokeData = await response.json()
        const poket = {
            id: pokeData.id,
            name: pokeData.name,
            imgUrl: pokeData.sprites.front_default,
            height: pokeData.height,
            weight: pokeData.weight,
            types: pokeData.types.map((pokemon) => { return pokemon.type.name })
        }
        this.setState({ pokemons: [...this.state.pokemons, poket], initialPokemons: [...this.state.pokemons, poket] })
    }

    componentDidMount() { 
      const classThis = this
        
      firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.setState({user})
            } 
            else {
            this.setState({user:null})

            }

              this.fetchPokemons()
        
          });

           this.props.navigation.addListener('tabPress', e => {

            e.preventDefault();
            classThis.setState({pokemons:[]})
            this.fetchPokemons()
            classThis.props.navigation.navigate('PokedexTab',{screen:"Wish List"})
          });
        
    }



        searchMatchedPokemons(text) {
            const filter = String(this.state.searchFilter)
            text = String(text).toLowerCase()
            if (text == '') {
                this.setState({ pokemons: this.state.initialPokemons })
            }
            else {
                pokemons = this.state.pokemons.filter((pokemon) => {
                    if (String(pokemon[filter]).toLowerCase().includes(String(text))) {
                        return pokemon
                    }
                })
                this.setState({ pokemons })
            }
        }
        sortList() {
            const input_type = this.state.searchFilter
            console.log(input_type);

            let pokemons = this.state.pokemons
            if (input_type === 'id') {
                pokemons = pokemons.sort((a, b) => a[input_type] - b[input_type])
            }
            else if (input_type === 'types') {
                pokemons = pokemons.sort((a, b) => {

                    if (a[input_type][0] < b[input_type][0]) {
                        return -1
                    } if (a[input_type][0] > b[input_type][0]) { return 1 } return 0
                })
            }
            else {
                pokemons = pokemons.sort((a, b) => {
                    if (a[input_type] < b[input_type]) {
                        return -1
                    } if (a[input_type] > b[input_type]) { return 1 } return 0
                })
            }

            this.setState({ pokemons })

        }

        async updateFilterParam(searchFilter) {
            await this.setState({ searchFilter })
            this.sortList()
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
                            selectedValue={this.state.searchFilter}
                            style={{ height: 50, width: 110 }}
                            mode='dialog'
                            onValueChange={(itemValue, itemIndex) => {
                                this.updateFilterParam(itemValue)
                            }
                            }>
                            <Picker.Item label="Nom" value="name" />
                            <Picker.Item label="Type" value="types" />
                            <Picker.Item label="Numero" value="id" />
                        </Picker>
                        <TextInput placeholder='Taper votre recherche ici' style={styles.input} onChangeText={(text) => { this.searchMatchedPokemons(text) }}></TextInput>
                    </View>
                    <ScrollView style={styles.container}>
                        <View style={{ alignItems: 'center' }}>
                            {this.state.pokemons.map((pokemon) => {
                                return (
                                    <View style={styles.card} key={pokemon.id} >
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Pokemon', { pokemon }) }}>
                                            <Image source={{ uri: pokemon.imgUrl }} style={{ width: 90, height: 90 }} />
                                        </TouchableOpacity>

                                        <Button title={pokemon.name} buttonStyle={{ width: '100%', borderWidth: 0, backgroundColor: 'transparent' }} titleStyle={{ color: 'rgb(250,90,86)', textTransform: 'capitalize' }} onPress={() => { this.props.navigation.navigate('Pokemon', { pokemon }) }} />

                                    </View>)

                            })}


                        </View>

                    </ScrollView>
                </SafeAreaView>

            )
        }
    }
