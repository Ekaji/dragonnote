// force the state to clear with fast refresh in Expo
// @refresh reset
import React from 'react';
import { useState, useEffect} from 'react';
import { View , Text, FlatList, TouchableOpacity, Button} from 'react-native'
import styled from 'styled-components/native';
import CreateNoteButton from './CreateNoteButton';
import { useNavigation } from '@react-navigation/native';

import { database } from './components/Database';

const notesData = [
    {
    id: 1,
    title: 'the rose that grew from concret',
    content: "Did you hear about the rose that grew from a crack in the concrete? Proving natures law is wrong it learned to walk with out having feet. Funny it seems, but by keeping its dreams, it learned to breathe fresh air. Long live the rose that grew from concrete when no one else ever cared.",
    color: '#0c7b93',
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



const Home = () => {
    const [ note, getNote ] = useState(notesData);
    console.log(note._array, 'testing' )

    const fetchDataAsync =  () => {
        // try{
             database.fetchData(getNote)
        // } catch(e){
        //     console.log(e)
        // }
    }

      useEffect(() => {
        fetchDataAsync(getNote);
        console.log('loaded from home comp')
   },[])


    const renderItem = ( {item} ) => {
        return(
            <NotesInfo title={item.title} content={item.content} />
        )
    };

    return(
        <>
            <FlatList 
                data={note._array}
                renderItem = {renderItem}
                keyExtractor = {item => item.id.toString()}
            />
            <CreateNoteButton />
        </>
    )
};

export default Home;