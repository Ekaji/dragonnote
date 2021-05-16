import React from 'react';
import { useState, useEffect} from 'react';
import { View , Text, FlatList, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native';
import CreateNoteButton from './AddNewNoteButton';
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
        <TouchableOpacity onPress={() => navigation.navigate('Createnote', {id: id, title: title, content: content})}>
            <Notesview  >
                <Text_Title>{ title }</Text_Title>
                <Text>{ content }</Text>
            </Notesview>
        </TouchableOpacity>
    )  
}


const Home = () => {

    const [ note, setNote ] = useState(notesData);
    console.log(note._array, )

      useEffect(() => {
        const loadDataAsync = async () => {
           try{
                database.fetchData(setNote)

           } catch(e){
               console.log(e)
           }
       }
        loadDataAsync();
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
                keyExtractor = {item => item.id}
            />
            <CreateNoteButton />
        </>
    )
};

export default Home;