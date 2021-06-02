// force the state to clear with fast refresh in Expo
// @refresh reset
import React from 'react';
import { Icon } from 'react-native-elements'
import styled from 'styled-components/native';
import CreateNoteButton from './CreateNoteButton';

import { useState, useEffect, useContext} from 'react';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { TrashOrMenuContext } from './context/TrashOrMenuContext';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import { database } from './components/Database';

//discribes how the rendered item should look
const NotesInfo = ({ id, title, content, loadDataAsync}) => {
    const navigation = useNavigation();
    //checkbox toggle
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    //applies css styling to either show or hide checkbox
    const [trashOrMenuDisplay, setTrashOrMenuDisplay] = useContext(TrashOrMenuContext)

    const [noteid, getNoteid] = useState('h')

    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            setTrashOrMenuDisplay(!trashOrMenuDisplay)
        console.log("I've been pressed for 800 milliseconds");
        }
    };

    

    return(
        <TouchableOpacity style={{borderWidth: 1, borderColor: '#517fa4', margin: 10, borderRadius: 6}}  onPress={() => navigation.navigate('Createnote', 
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

            {trashOrMenuDisplay ?
            <View style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 10}}> 
                <Icon  name='trash' type='font-awesome' color='#517fa4' raised
                    onPress={ () => { 
                        database.deleteNote(id);       
                        loadDataAsync();
                    }
                    } />
            </View>
                
                :
            <View style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 10}}> 
                <Icon name='ellipsis-v' type='font-awesome' color='#517fa4' />
            </View>
            
            }
            

            </View>
            </LongPressGestureHandler>
        </TouchableOpacity>
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
            <NotesInfo title={item.title} content={item.content} id={item.id} loadDataAsync={loadDataAsync} />
        )
    };

    return(
         <TrashOrMenuContext.Provider value={[trashOrMenuDisplay, setTrashOrMenuDisplay]}>
            <FlatList  
                style= {{ display: 'flex', flexDirection: 'column-reverse'}}
                data={note._array}
                renderItem = {renderItem}
                keyExtractor = {item => item.id.toString()}
                inverted={true}
            />
          <CreateNoteButton /> 
         </TrashOrMenuContext.Provider>
    )
};

const Notesview = styled.View`
margin: 10px;
width: 60%;
`;
const Text_Title = styled.Text`
font-size: 20px;
margin-bottom: 8px;
`;

const styles = StyleSheet.create({
hideBox : {
    opacity: 0,
    height: 0,
},
showBox : {
    marginTop: 50,
    marginRight: 12,
    opacity: 1,
    height: 9,
}
})

export default Home;