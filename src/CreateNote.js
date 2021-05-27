import React from 'react';
import { useState, useEffect, createContext, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, Text, TextInput, Button} from 'react-native';

import { database } from './components/Database'

export const bool = false;

const CreateNote = ({ route, navigation }) => {
    // receives id, title and content props for use in editing
    const {id, title, content } = route.params;

    const [noteTitle, setTitleOnChange] = useState(title);
    const [noteContent, setNoteOnChange] = useState(content);

    const date = new Date();
    const creationDate = date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes();

    const insertDataFunc = () => {
      //sends the note title and content to the database
        database.insertNote( noteTitle, noteContent )
    }

    const updateNoteContent = () => {
      // updates note title and content 
        database.upDateNote( id, noteTitle, noteContent )
        console.log('clicked')
    }

useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={() => {
              // if an id is not present new content is pushed to the database else the data should be updated
              id === undefined ?  insertDataFunc() : updateNoteContent() 
              console.log(id)
            } } 
            title="save" />
          ),
        });
      },);

    return (
     <View >
      <Text style= {styles.timearea}>{  creationDate  }</Text>
        <TextInput  style={styles.textInputTitle}
                    multiline={true}
                    maxLength={50}
                    placeholder = 'title' 
                    value = {noteTitle}
                    onChangeText = { text => setTitleOnChange( text ) } 
                    />

        <TextInput  style={styles.textInputNote}
                    multiline={true}
                    placeholder = 'write something' 
                    value = {noteContent} 
                    onChangeText = { text => setNoteOnChange( text) } 
                    />
      </View>
    )
};

//not using styled components because of a bug where the keyboard disapears with every keystroke
const styles = StyleSheet.create({
    textInputTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        height: 32,
        margin: 12,
        },

    textInputNote: {
        fontSize: 20,
        margin: 12,
        },

    timearea: {
        margin: 12,
        }
    },
);

export default CreateNote;