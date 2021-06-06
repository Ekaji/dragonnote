// force the state to clear with fast refresh in Expo
// @refresh reset
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Button } from 'react-native';
import styled from 'styled-components/native';
import CreateNote from './src/components/createNote/CreateNote';
import CreateNoteButton from './src/components/createNoteButton/CreateNoteButton';
import Home from './src/components/home/Home'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();


const HomeScreenTab = () => {

    return(
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
      </Tab.Navigator>
    )
}



const App = ( ) => {

  const Safearea = styled.SafeAreaView`
    flex: 1;
    paddingTop: ${StatusBar.currentHeight};
  `;

  return (
    <Safearea>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
             name = 'Home' 
             component = { Home }
             options={{headerShown: false}}
            />
  
            <Stack.Screen
              name = 'Createnote' 
              component = { CreateNote } 
              options={{ title: '' }} />
  
        </Stack.Navigator>
      </NavigationContainer>
    </Safearea>
    );
  }


export default App;