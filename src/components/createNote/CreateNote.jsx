import React, { useState, useEffect, useCallback } from 'react';
import { BackHandler } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import { View, Text, TextInput} from 'react-native';
import { createNote } from './createNote.styles'

import { database } from '../database/Database'


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



  useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
               navigation.navigate('Home')
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            } 
        }, [navigation])
    )



    useEffect(() => {
      navigation.setOptions({
        
        headerRight: () => (
          <View  style={{marginRight: 20, borderRadius: 100}}>
              <Icon
                name="check"
                size={25}
                color={color}
                type='font-awesome'
                onPress={() => {
                          navigation.navigate('Home')
                            // if an id is not present new content is pushed to the database else the data should be updated
                            id === undefined ?  insertDataFunc() : updateNoteContent() 
                          } } 
           />
           </View>
          ),
        });
      },);


    return (
     <View  style={{flex: 1, backgroundColor: color, }}>
      <Text style= {createNote.timearea} >{  id || creationDate  }</Text>
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