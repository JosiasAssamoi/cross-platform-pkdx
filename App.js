import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItem} from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from './Auth';
import Pokedex from './Pokedex'
import Pokemon from './Pokemon'
import WishList from './WishList'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()



function createPokedexTabs(){

  return (
    <Tab.Navigator>
      <Stack.Screen name ='Pokedex' component = {Pokedex} 
      />
      <Tab.Screen name ='Wish List' component = {WishList}  />
    </Tab.Navigator>

  )
}



function createPokedexStack() {
  return  (
    <Stack.Navigator   headerMode="none">
      <Stack.Screen name ='Pokedex' children = {createPokedexTabs} 
     
      />
      <Stack.Screen name ='Pokemon' component = {Pokemon} />
    </Stack.Navigator>
  )

}



export default function App() {
  return (

      <NavigationContainer>
        <Drawer.Navigator drawerType='back'>
          <Drawer.Screen name='Pokemons' children={createPokedexStack} />
          <Drawer.Screen name='Connexion' component={Auth}></Drawer.Screen>
        </Drawer.Navigator>

      </NavigationContainer>


  );
}



