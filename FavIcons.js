
import React from 'react';
import { Icon } from 'react-native-elements'
import * as firebase from 'firebase';



export default class FavIcons extends React.Component {


    state = { pokemonId:this.props.pokemonId , userId: firebase.auth().currentUser.uid,favs:[]  };

    toggleFav(){
        // On doit le fav
        const pokemonId = this.state.pokemonId
        const classThis = this
        
        const favsRef = firebase.database().ref('/users/' + this.state.userId+'/favs/')
        
        
        if(this.state.favs.includes(pokemonId)==false){
            favsRef.once('value', function(snapshot) {
                if (snapshot !=undefined || snapshot != null  ){
                    favsRef.push({pokemonId}) 
                    classThis.setState({favs:[...classThis.state.favs,pokemonId]})

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
            favsRef.once('value', function(snapshot) {
                if (snapshot !=undefined && snapshot != null){
                    snapshot.forEach((child) => {
                        if(child.val().pokemonId ==pokemonId){
                            favsRef.child(child.key).remove();  
                            classThis.setState({favs:classThis.state.favs.filter((elt) => { return elt != pokemonId}  )}) 
                            
                        }
                        
                    })
                }
                });
        }

    }

    componentDidMount(){

        const favsRef = firebase.database().ref('/users/' + this.state.userId+'/favs/')
        const classThis = this
        favsRef.once('value', function(snapshot) {
            if (snapshot !=undefined && snapshot != null){
                const favs=[]
                snapshot.forEach( (child) => {
                    favs.push(child.val().pokemonId)
                    })
                    classThis.setState({favs})
                }
            })

    }

    getFavName(){
       return  this.state.favs.includes(this.state.pokemonId) ?  'star' : 'star-o'
    }

    getFavColor(){

       return this.state.favs.includes(this.state.pokemonId) ? '#ebcc34' : 'black'
    }


  render() {
        return (<Icon
            name={this.getFavName()}
            type='font-awesome'
            color={this.getFavColor()}
            size={25}
            onPress={() => this.toggleFav() } />
  );
}
}





