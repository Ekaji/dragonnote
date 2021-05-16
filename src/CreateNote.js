import React from 'react';
import { useState, useEffect} from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, Text, TextInput, } from 'react-native';

const CreateNote = ({ route }) => {
    // receives id, title and content props for use in editing
    const {id, title, content } = route.params;

    const [noteTitle, onChangeText] = useState(title);
    const [noteContent, onChangeNote] = useState(content);

    const date = new Date();
    const creationDate = date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes();

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

    return (
        <View>
            <Text style= {styles.timearea}>{  creationDate  }</Text>
            <TextInput style={styles.textInputTitle} placeholder = 'title'  onChangeText = { onChangeText } value = {noteTitle} />
            <TextInput style={styles.textInputNote} placeholder = 'write something'  onChangeText = { onChangeNote } value = {noteContent} />
        </View>
    )
};

export default CreateNote;