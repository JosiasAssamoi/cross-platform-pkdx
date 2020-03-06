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
import Inscription from './Inscription';
import { ScreenOrientation } from 'expo';

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
  const jumpToAction = DrawerActions.jumpTo('StackApp',{screen:'PokedexTab'})
  const jumpToConnexion = DrawerActions.jumpTo('StackApp',{screen:'Connexion'})
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

function createAppStack() {
  return  (
    <Stack.Navigator   headerMode="none"  initialRouteName='PokedexTab' >
      <Stack.Screen name ='Pokedex' component = {Pokedex} />
      <Stack.Screen name ='Pokemon' component = {Pokemon} />
      <Stack.Screen name ='Connexion' component = {Auth} />
      <Stack.Screen name ='Inscription' component = {Inscription} />
      <Stack.Screen name ='PokedexTab' component = {createPokedexTabs} />

    </Stack.Navigator>
  )

}

async  function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
}

export default function App() {

  //init l'instance firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(myConfig);
}
changeScreenOrientation()
  return (

      <NavigationContainer>
        <Drawer.Navigator drawerContent = { props => createCustomButton(props)} initialRouteName='Pokedextab'  > 
          <Drawer.Screen name='StackApp' component={createAppStack} />
        </Drawer.Navigator>
      </NavigationContainer>


  );
}



