import 'react-native-gesture-handler';
import React from 'react';
import { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import CreateNote from './src/CreateNote';
import Home from './src/Home'

import { database } from './src/components/Database'

const App = () => {
  const Stack = createStackNavigator();

  useEffect(() => {
     const loadDataAsync = async () => {
        try{
            database.dropDatabaseTable();
            database.setupDatabaseAsync();
            database.setupUsersAsync();

        } catch(e){
            console.log(e)
        }
    }
     loadDataAsync();
},[])

  const Safearea = styled.SafeAreaView`
    flex: 1;
    paddingTop: ${StatusBar.currentHeight};
  `;

  return (
  <Safearea>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name = 'Home' component = { Home } />
          <Stack.Screen name = 'Createnote' component = { CreateNote } />
      </Stack.Navigator>
    </NavigationContainer>
  </Safearea>
  );
}


export default App;
