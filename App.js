import React from 'react';
import { useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components/native'
import CreateNoteButton from './src/CreateNote'

const App = () => {


  const Safearea = styled.SafeAreaView`
    flex: 1;
    paddingTop: ${StatusBar.currentHeight};
  `;

  return (
    <Safearea >
      <View>
        <Text> HelloWorld</Text>
      </View>
      <CreateNoteButton />
    </Safearea>
  );
}


export default App;
