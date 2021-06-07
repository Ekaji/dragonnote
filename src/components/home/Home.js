// force the state to clear with fast refresh in Expo
// @refresh reset
import React from 'react';
import { Icon } from 'react-native-elements'
import CreateNoteButton from '../createNoteButton/CreateNoteButton';
import Search from '../search/Search'

import { useState, useEffect, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { TrashOrMenuContext } from '../../context/TrashOrMenuContext';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { Text, FlatList, Button, TouchableWithoutFeedback } from 'react-native';

import { database } from '../database/Database';
import { TouchableOpacityComp, NotesviewContainer, ColorButtonsComp, TrashComponent, EllipsisMenu, Notesview, Text_Title } from './home.styles'

import  ButtonColorComp  from '../coloredButton/ColoredButton'

//discribes how the rendered item should look
const NotesInfo = ({ id, title, content, color, loadDataAsync }) => {
    const navigation = useNavigation();
    //applies css styling to either show or hide checkbox
    const [trashOrMenuDisplay, setTrashOrMenuDisplay] = useContext(TrashOrMenuContext);

    const [colorMenu, setColorMenu] = useState(false)
 

    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            setTrashOrMenuDisplay(!trashOrMenuDisplay)
        console.log("I've been pressed for 800 milliseconds");
        }
    };

    return(
        <TouchableOpacityComp color={color}  onPress={() => navigation.navigate('Createnote', 
            {id: id, title: title, content: content, color: color}
        )}>
            <LongPressGestureHandler
            onHandlerStateChange={onLongPress}
            minDurationMs={800}
        >
            <NotesviewContainer >
            <Notesview  >
                <Text_Title>{ title }</Text_Title>
                <Text>{ content }</Text>
            </Notesview>

            {trashOrMenuDisplay ?
            <TrashComponent> 
                <Icon  name='trash' type='font-awesome' color={`${color}`} raised
                    onPress={ () => { 
                        database.deleteNote(id);       
                        loadDataAsync();
                    }
                    } />
            </TrashComponent>
                : null
            }
            
            </NotesviewContainer>
            </LongPressGestureHandler>
        </TouchableOpacityComp>
    )  
}

const Home = ({navigation}) => {
    const [ note, getNote ] = useState([]);
    //passed as value to context
    const [trashOrMenuDisplay, setTrashOrMenuDisplay] = useState(false)


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
        //fetch data when the home screen comes into focus
        const reloadData = navigation.addListener('focus', () => {
            loadDataAsync();
            } )
            return reloadData
    })

    useEffect(() => {
        //loads data when app starts the first time
        loadDataAsync();
   },[])

    const renderItem = ( {item} ) => {
        return(
            <NotesInfo title={item.title} content={item.content} id={item.id} color={item.color} loadDataAsync={loadDataAsync} />
        )
    };


    const [rawDATA, setRawDATA] = useState([])
    //reverse data so last entry appears first
    useEffect(() => {
        const reverseData = () => {
            if (note._array === undefined){
                setRawDATA([])
            } else {
                setRawDATA(note._array.reverse())
            }
        } 
        reverseData()
    },[note])

    const [filteredData, setFilteredData] = useState(rawDATA)
    // search function
    // const filterResult = (word) => {
    //     let oldData = rawDATA.map( rawdata => {
    //         return {id: rawdata.id, title: rawdata.title.toLowerCase(), content: rawdata.content.toLowerCase(), color: rawdata.color}
    //     });
    //    if(word !== ''){
    //        let result = oldData.filter(data => {
    //         console.log(word)
    //            return data.content.includes(word.toLowerCase()) || data.title.includes(word.toLowerCase())
    //        })
    //        setFilteredData(result)
    //    } else  { 
    //        setFilteredData( rawDATA)
    //  }}

    
 
     //data passed to flatlist
    //  const [DATA, setDATA] = useState(rawDATA)

    //  useEffect(() => {
    //      setDATA(filteredData ? filteredData : rawDATA )
    //  })
    

    return(
        <TrashOrMenuContext.Provider value={[trashOrMenuDisplay, setTrashOrMenuDisplay]}>
            {/* <Search filterResult={filterResult} /> */}
            <TouchableWithoutFeedback onPress={() => console.log( 'pressed')}>
            <FlatList  
                data={ rawDATA }
                renderItem = {renderItem}
                keyExtractor = {item => item.id.toString()}
            />
          </TouchableWithoutFeedback>
          <ButtonColorComp />
          <CreateNoteButton />
        </TrashOrMenuContext.Provider>
    )
};


export default Home;