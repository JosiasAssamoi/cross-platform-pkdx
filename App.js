import React from 'react';
import { NavigationContainer, DrawerActions} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItem, DrawerItemList,DrawerContentScrollView} from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from './Auth';
import Pokedex from './Pokedex'
import Pokemon from './Pokemon'
import WishList from './WishList'
import { myConfig } from './firebase-config'
import * as firebase from 'firebase';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()



function createPokedexTabs(){

  return (
    <Tab.Navigator>
      <Stack.Screen name ='Pokedex' component = {Pokedex} />
      <Tab.Screen name ='Wish List' component = {WishList}  />
    </Tab.Navigator>

  )
}

function createCustomButton(props){
  const jumpToAction = DrawerActions.jumpTo('StackMenu',{screen:'PokedexTab'})
  const jumpToConnexion = DrawerActions.jumpTo('StackMenu',{screen:'Connexion'})
return(
  <DrawerContentScrollView {...props}>
    <DrawerItem
    label ="Pokedex"
    onPress = {() => { props.navigation.dispatch(jumpToAction)}}
    />
    <DrawerItem label='Connexion' onPress = {() => { props.navigation.dispatch(jumpToConnexion)}}></DrawerItem>  
  </DrawerContentScrollView>
)

}

function createMenuStack() {
  return  (
    <Stack.Navigator   headerMode="none"  initialRouteName='PokedexTab' >
      <Stack.Screen name ='Pokedex' component = {Pokedex} />
      <Stack.Screen name ='Pokemon' component = {Pokemon} />
      <Stack.Screen name ='Connexion' component = {Auth} />
      <Stack.Screen name ='PokedexTab' component = {createPokedexTabs} />

    </Stack.Navigator>
  )

}

export default function App() {

  if (firebase.apps.length === 0) {
    firebase.initializeApp(myConfig);
}
  return (

      <NavigationContainer>
        <Drawer.Navigator drawerContent = { props => createCustomButton(props)} initialRouteName='Pokedextab'  > 
          <Drawer.Screen name='StackMenu' component={createMenuStack} />
        </Drawer.Navigator>
      </NavigationContainer>


  );
}



