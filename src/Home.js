// force the state to clear with fast refresh in Expo
// @refresh reset
import React from 'react';
import { useState, useEffect, useLayoutEffect} from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, Button, StyleSheet} from 'react-native'
import styled from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';
import CreateNoteButton from './CreateNoteButton';
import { useNavigation } from '@react-navigation/native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

import { database } from './components/Database';

//discribes how the rendered item should look
const NotesInfo = ({ id, title, content }) => {
    const navigation = useNavigation();
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [showheckboixes, setShowCheckBoxes] = useState(false)

    const [currentCheckBox, setCurrentCheckBox] = useState('')
    const [checkBoxIds, setCheckBoxIds] = useState([])
    
    const Notesview = styled.View`
        margin: 20px;
    `;
    const Text_Title = styled.Text`
        font-size: 20px;
        margin-bottom: 8px;
    `;
    
        const onLongPress = (event) => {
            if (event.nativeEvent.state === State.ACTIVE) {
              console.log("I've been pressed for 800 milliseconds");
              setShowCheckBoxes(!showheckboixes)
            }
          };

        const getChecked = (ID) => {
            setCurrentCheckBox(ID);
            setCheckBoxIds([...checkBoxIds, currentCheckBox])
        }

        // useEffect(() => {
        //     setCheckBoxIds([...checkBoxIds, currentCheckBox])
        //     console.log('checkBoxIds',checkBoxIds)
        // },)


    return(
        <TouchableOpacity  onPress={() => navigation.navigate('Createnote', 
            {id: id, title: title, content: content}
        )}>
             <LongPressGestureHandler
            onHandlerStateChange={onLongPress}
            minDurationMs={800}
        >
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Notesview  >
                <Text_Title>{ title }</Text_Title>
                <Text>{ content }</Text>
            </Notesview>
            {showheckboixes === !true? <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={() => { 
                    getChecked(id)
                    setToggleCheckBox(!toggleCheckBox)
                    toggleCheckBox === !true? database.deleteNote(id) : null    
                }
            }
            /> : null
        } 
            </View>
            </LongPressGestureHandler>
        
        </TouchableOpacity>
    )  
}


const Home = ({navigation}) => {
    const [ note, getNote ] = useState([]);
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
                style= {{ display: 'flex', flexDirection: 'column-reverse'}}
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