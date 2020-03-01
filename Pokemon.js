
import React from 'react';
import { Text,Image,View,SafeAreaView } from 'react-native';
import {Icon} from 'react-native-elements'
import MyHeader from './MyHeader'
import { styles } from './assets/styles';
export default class Pokemon extends React.Component {

  state = { pokemon: '' }

  componentDidMount() {
    let pokemon = this.props.route.params.pokemon ? this.props.route.params.pokemon : 'Aucun  pokemon selectionné'
    this.setState({ pokemon })

  }

  render() {

    return (

        <SafeAreaView style={{flex:1,width:'100%'}}>
          <MyHeader navigation={this.props.navigation} name={this.constructor.name}></MyHeader>
          <View  style={{ alignContent:"center",justifyContent:"center",borderBottomWidth:3,borderTopWidth:3,borderBottomEndRadius:50,borderBottomStartRadius:50,borderTopStartRadius:50,borderTopEndRadius:50,borderRightWidth:1,borderLeftWidth:1, flexDirection:"row",marginHorizontal:"auto",borderColor:"rgb(250,90,86)"}} >
          <Image source={{ uri: this.state.pokemon.imgUrl }} style={{ width: 300, height: 300 }} />
          </View >
          <View style={styles.infos}> 
          <Icon
          name='arrows-v'
          type='font-awesome'
          color='black'
          containerStyle={{height:30,width:20 }}
          />
          
            <Text style = {{fontSize:30 }}> {this.state.pokemon.height} m </Text>
          </View>
          <View style={styles.infos}> 
          <Image
            source={require('./assets/weight.png')}
            style={{height:30,width:30}}

             />
            <Text style = {{fontSize:30}}> {this.state.pokemon.weight} lbs </Text>
          </View>
          <View style={styles.infos}> 
              <Text style = {{fontSize:30}}>Type</Text>
  
            <Text style = {{fontSize:30}}>  {String(this.state.pokemon.types)}  </Text>
            
          </View>
        </SafeAreaView>

        );
        }
      }
