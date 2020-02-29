
import React from 'react';
import { Icon } from 'react-native-elements'
import * as firebase from 'firebase';



export default class FavIcons extends React.Component {


    state = { name: 'star-o', color:'black', pokemonId:this.props.pokemonId , userId: firebase.auth().currentUser.uid  };

    toggleFav(){
        // On doit le fav
        const pokemonId = this.state.pokemonId
        
        const favsRef = firebase.database().ref('/users/' + this.state.userId+'/favs/')
        
        
        if(this.state.name =='star-o'){
            this.setState({name:"star" , color:"#ebcc34"})
            let alreadyHere = false
            favsRef.once('value', function(snapshot) {
                if (snapshot !=undefined && snapshot != null  ){
                    favsRef.push({pokemonId}) 
                }
                // pas favs on init
                else{
                    firebase.database().ref('users/' + this.state.userId).update({
                        favs : {pokemonId}
                       });  
                }
                });
        }
        // On doit le defav
        else{
            this.setState({name:"star-o" , color:"black"})
            favsRef.once('value', function(snapshot) {
                if (snapshot !=undefined && snapshot != null){
                    snapshot.forEach((child) => {
                        console.log(child.val().pokemonId , '-',pokemonId);
                        
                        if(child.val().pokemonId ==pokemonId){
                            favsRef.child(child.key).remove();   
                        }
                        
                    })
                }
                });
        }

    }


  render() {
        return (<Icon
            name={this.state.name}
            type='font-awesome'
            color={this.state.color}
            size={25}
            
            onPress={() => this.toggleFav() } />
  );
}
}





