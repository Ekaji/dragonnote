import 'react-native-gesture-handler';
import React from 'react';
import { useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import CreateNoteButton from './src/AddNewNoteButton';
import CreateNote from './src/CreateNote';

const App = () => {
  const Stack = createStackNavigator();

  const Safearea = styled.SafeAreaView`
    flex: 1;
    paddingTop: ${StatusBar.currentHeight};
  `;

  return (
  <Safearea>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="create button">
          <Stack.Screen name = 'Createbutton' component = { CreateNoteButton } />
          <Stack.Screen name = 'createnote' component = { CreateNote } />
      </Stack.Navigator>
    </NavigationContainer>
  </Safearea>
  );
}


export default App;
