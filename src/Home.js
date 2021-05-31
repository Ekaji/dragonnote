// force the state to clear with fast refresh in Expo
// @refresh reset
import React from 'react';
import { useState, useEffect, useLayoutEffect, useContext} from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, Button, StyleSheet} from 'react-native'
import styled from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';
import CreateNoteButton from './CreateNoteButton';
import { useNavigation } from '@react-navigation/native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

import { CheckboxContext } from './context/CheckBoxContext'

import { database } from './components/Database';

//discribes how the rendered item should look
const NotesInfo = ({ id, title, content, loadDataAsync}) => {
    const navigation = useNavigation();
    //checkbox toggle
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    //applies css styling to either show or hide checkbox
    const [checkBoxDisplay, setCheckBoxDisplay] = useContext(CheckboxContext)

    const [checkBoxIDs, getCheckBoxIDs] = useState([])

    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
        setCheckBoxDisplay(checkBoxDisplay === styles.hideBox ? styles.showBox : styles.hideBox)
        console.log("I've been pressed for 800 milliseconds");
        }
    };


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

            <CheckBox
                style={checkBoxDisplay}
                disabled={false}
                value={toggleCheckBox}
                tintColors = {{ true: '#FF6900' , false: '#d4d4d4' }}
                onChange={() => {
                    setToggleCheckBox(!toggleCheckBox);
                    getCheckBoxIDs([...checkBoxIDs, id])
                    console.log('IDS',checkBoxIDs)
                    // togggleCheckboxFunc()
                    // toggleCheckBox === !true ? database.deleteNote(id) : null
                    //reload after delete
                    loadDataAsync();    
                }
            }
            />
            </View>
            </LongPressGestureHandler>
        </TouchableOpacity>
    )  
}


const Home = ({navigation}) => {
    const [ note, getNote ] = useState([]);
    //passed as value to context
    const [checkBoxDisplay, setCheckBoxDisplay] = useState(styles.hideBox)
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
         <CheckboxContext.Provider value={[checkBoxDisplay, setCheckBoxDisplay]}>
            <FlatList  
                style= {{ display: 'flex', flexDirection: 'column-reverse'}}
                data={note._array}
                renderItem = {renderItem}
                keyExtractor = {item => item.id.toString()}
                inverted={true}
            />
          <CreateNoteButton /> 
         </CheckboxContext.Provider>
    )
};

const Notesview = styled.View`
margin: 20px;
width: 70%;
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