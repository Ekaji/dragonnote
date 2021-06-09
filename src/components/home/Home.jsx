// force the state to clear with fast refresh in Expo
// @refresh reset
import React from 'react';
import Notes from '../notes/Notes'
import Search from '../search/Search'
import { useState, useEffect } from 'react';
import { database } from '../database/Database';
import  ButtonColorComp  from '../coloredButton/ColoredButton'
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import CreateNoteButton from '../createNoteButton/CreateNoteButton';
import { TrashOrMenuContext } from '../../context/TrashOrMenuContext';


const Home = ({ navigation }) => {
    const [ note, getNote ] = useState([]);
    //passed as value to context
    const [trashOrMenuDisplay, setTrashOrMenuDisplay] = useState(false)
    // passed to CreateNoteButton
    const [showColoredButton, setShowColoredButton] = useState(false)
    const [hideCreateButton, setHideCreateButton] = useState(false)


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
   },[])

    useEffect(() => {
        //fetch data when the home screen comes into focus
        const reloadData = navigation.addListener('focus', () => {
            loadDataAsync();
            } )
            return reloadData
    })


    const renderItem = ( {item} ) => {
        return(
            <Notes 
                id={item.id}
                color={item.color}
                title={item.title}
                content={item.content}
                loadDataAsync={loadDataAsync}
                hideCreateButton={hideCreateButton}
                setHideCreateButton={setHideCreateButton}
                />
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
    const filterResult = (word) => {
        let oldData = rawDATA.map( rawdata => {
            return {id: rawdata.id, title: rawdata.title, content: rawdata.content, color: rawdata.color}
        });
       if(word !== ''){
           let result = oldData.filter(data => {
               return (
                data.content.includes(word.toLowerCase()) ||
                data.title.includes(word.toLowerCase()) ||
                data.content.includes(word.toUpperCase()) ||
                data.title.includes(word.toUpperCase()) ||
                data.content.includes(word) || 
                data.title.includes(word)
                   )
           })
           setFilteredData(result)
       } else  { 
           setFilteredData(null)
     }}
     

    const data = filteredData ? filteredData : rawDATA
    console.log(data)

    return(
        <TrashOrMenuContext.Provider value={[trashOrMenuDisplay, setTrashOrMenuDisplay]}>
            <Search filterResult={filterResult} />
            <TouchableWithoutFeedback onPress={() => console.log( 'pressed')}>
            <FlatList  
                data={ data }
                renderItem = {renderItem}
                keyExtractor = {item => item.id.toString()}
            />
          </TouchableWithoutFeedback>
          {showColoredButton ? <ButtonColorComp /> : null}
          {hideCreateButton ?  null :
          <CreateNoteButton  showColoredButton={showColoredButton} setShowColoredButton={setShowColoredButton} />
          
        }
        </TrashOrMenuContext.Provider>
    )
};


export default Home;