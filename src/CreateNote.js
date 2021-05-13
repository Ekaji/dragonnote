import React from 'react';
import { useState} from 'react';
import styled from 'styled-components/native';
import {View, StyleSheet, Text, TextInput, KeyboardAvoidingView} from 'react-native';

const CreateNote = () => {
    const [title, onChangeText] = useState('');
    const [note, onChangeNote] = useState('');
    const date = new Date();
    const creationDate = date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes();

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
            <TextInput style={styles.textInputTitle} placeholder = 'title'  onChangeText = { onChangeText} value = {title} />
            <TextInput style={styles.textInputNote} placeholder = 'write something'  onChangeText = {onChangeNote} value = {note} />
        </View>
    )
};

export default CreateNote;