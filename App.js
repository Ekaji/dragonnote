// force the state to clear with fast refresh in Expo
// @refresh reset
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Button } from 'react-native';
import styled from 'styled-components/native';
import CreateNote from './src/CreateNote';
import Home from './src/Home'


const App = ( ) => {
  const Stack = createStackNavigator();

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
           options={{title: 'Dragon_Note' }}
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