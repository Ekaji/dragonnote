import React from 'react';
import { useState, useEffect, createContext, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, Text, TextInput, Button} from 'react-native';
import { createNote } from './createNote.styles'

import { database } from '../database/Database'

// export const bool = false;

const CreateNote = ({ route, navigation }) => {
    const date = new Date();
    const creationDate = date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes();
    
    // receives id, title and content props for use in editing
    let {id, title, content, color } = route.params; 


    const [noteTitle, setTitleOnChange] = useState(title);
    const [noteContent, setNoteOnChange] = useState(content);


    const insertDataFunc = () => {
      //sends the note title and content to the database
        database.insertNote( noteTitle, noteContent, color)
    }

    const updateNoteContent = () => {
      // updates note title and content 
        database.upDateNote( id, noteTitle, noteContent, color)
    }

    const deleteNote = () => {
      //for delete
      database.deleteNote(id)
    }

useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={() => {
              navigation.navigate('Home')
              // if an id is not present new content is pushed to the database else the data should be updated
              id === undefined ?  insertDataFunc() : updateNoteContent() 
            } } 
            title="save" />
          ),
        });
      },);

    return (
     <View >
      <Text style= {createNote.timearea}>{  creationDate  }</Text>
        <TextInput  style={createNote.textInputTitle}
                    multiline={true}
                    maxLength={50}
                    placeholder = 'title' 
                    value = {noteTitle}
                    onChangeText = { text => setTitleOnChange( text ) } 
                    />

        <TextInput  style={createNote.textInputNote}
                    multiline={true}
                    placeholder = 'write something' 
                    value = {noteContent} 
                    onChangeText = { text => setNoteOnChange( text) } 
                    />
      </View>
    )
};


export default CreateNote;