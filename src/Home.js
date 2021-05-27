// force the state to clear with fast refresh in Expo
// @refresh reset
import React from 'react';
import { useState, useEffect, useLayoutEffect} from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, Button, StyleSheet} from 'react-native'
import styled from 'styled-components/native';
import CreateNoteButton from './CreateNoteButton';
import { useNavigation } from '@react-navigation/native';

import { database } from './components/Database';

const notesData = [
    {
    id: 1,
    title: 'the rose that grew from concret',
    content: "Did you hear about the rose that grew from a crack in the concrete? Proving natures law is wrong it learned to walk with out having feet. Funny it seems, but by keeping its dreams, it learned to breathe fresh air. Long live the rose that grew from concrete when no one else ever cared.",
    }
];

//discribes how the rendered item should look
const NotesInfo = ({ id, title, content }) => {
    const navigation = useNavigation();

    const Notesview = styled.View`
        margin: 20px;
    `;
    const Text_Title = styled.Text`
        font-size: 20px;
        margin-bottom: 8px;
    `;

    return(
        <TouchableOpacity onPress={() => navigation.navigate('Createnote', 
            {id: id, title: title, content: content}
        )}>
            <Notesview  >
                <Text_Title>{ title }</Text_Title>
                <Text>{ content }</Text>
            </Notesview>
        </TouchableOpacity>
    )  
}


const Home = ({navigation}) => {
    const [ note, getNote ] = useState(notesData);
    console.log(note._array, 'testing' )

const loadDataAsync = async () => {
    try{
        // usefull in developement
        // database.dropDatabaseTable(); 
        // database.setupNoteAsync();
        database.setupDatabaseAsync();
        database.fetchData(getNote)

    } catch(e){
        console.log(e)
    }
  }


    useEffect(() => {
        //loads data when app starts the first time
        loadDataAsync();
        //fetch data when the home screen comes into focus
        const reloadData = navigation.addListener('focus', () => {
            loadDataAsync();
        })
        return reloadData
   },[])


    const renderItem = ( {item} ) => {
        return(
            <NotesInfo title={item.title} content={item.content} id={item.id} />
        )
    };

    return(
         <>
            <FlatList  
                style= {{backgroundColor: "#f9c2ff", display: 'flex', flexDirection: 'column-reverse'}}
                data={note._array}
                renderItem = {renderItem}
                keyExtractor = {item => item.id.toString()}
                inverted={true}
            />
          <CreateNoteButton /> 
         </>
    )
};

export default Home;