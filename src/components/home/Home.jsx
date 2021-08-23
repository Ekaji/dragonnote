// force the state to clear with fast refresh in Expo
// @refresh reset
import React from 'react'
import Notes from '../notes/Notes'
import Search from '../search/Search'
import { BackHandler } from "react-native";
import { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { database } from '../database/Database'
import { Icon, CheckBox } from 'react-native-elements'
import { DeleteContext  } from '../../context/deleteContext'
import ButtonColorComp  from '../coloredButton/ColoredButton'
import CreateNoteButton from '../createNoteButton/CreateNoteButton'
import { TrashOrMenuContext } from '../../context/TrashOrMenuContext'
import { Keyboard, FlatList, TouchableWithoutFeedback, Text, View } from 'react-native'



const Home = ({ navigation }) => {
    const [ note, getNote ] = useState([]);
    //passed as value to context
    const [trashOrMenuDisplay, setTrashOrMenuDisplay] = useState(false)
    const [checkedIDS, setCheckedIDS] = useState([]);
    // passed to CreateNoteButton
    const [showColoredButton, setShowColoredButton] = useState(false)
    const [hideCreateButton, setHideCreateButton] = useState(false)

    
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => { setHideCreateButton(true)} )
        Keyboard.addListener('keyboardDidHide', () => { setHideCreateButton(false)} )    
    },[Keyboard])


    // const loadDataAsync = async () => {
    //     try{
    //         // usefull in developement
    //         // database.dropDatabaseTable(); 
    //         // database.setupNoteAsync();
    //         database.setupDatabaseAsync();
    //         database.fetchData(getNote)
    //     } catch(e){
    //         console.error(e)
    //     }
    // }

    const loadDataAsync = () => {
            // usefull in developement
            // database.dropDatabaseTable(); 
            // database.setupNoteAsync();
            database.setupDatabaseAsync();
            database.fetchData(getNote)  
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
    },[navigation])
    
    
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


  useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (showColoredButton) {
                    setShowColoredButton(!showColoredButton)
                    return true;
                } else {
                    return false;
                }
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            } 
        }, [showColoredButton, setShowColoredButton])
    )

        
        
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
                
                //filtered data would come from search, rawData from database
                let data = filteredData ? filteredData : rawDATA
                
                // removing this would cause notes not to display when search 
                // is hidden because notes depends on filtered data to display, the boolean trashOrmenuDisplay 
                // is used to toggle search, therefore when set to false 'data' should be the rawData 
                // from the database.
                if(!trashOrMenuDisplay){
                    data = rawDATA
    }
    
    // const [markAll, setMarkAll] = useState(false)
    // const handleMarkAll =  () => {
    //     let getIds = markAll ? data.map(data => data.id) : []
    //     setCheckedIDS( getIds )
    //     console.log( getIds, 'home', markAll)
    // }

    // useEffect(() => {
    //     handleMarkAll()
    // }, [markAll])


    return( 
        <DeleteContext.Provider value={{ value: [ checkedIDS, setCheckedIDS ], /*value2:[markAll, setMarkAll] */ }} >
        <TrashOrMenuContext.Provider value={ [ trashOrMenuDisplay, setTrashOrMenuDisplay ] }>
        
            <Text style={{fontSize: 30, margin: 10 }}>Notes</Text>

                {
                 trashOrMenuDisplay ?  
                    <View  style={{flexDirection: 'row', justifyContent: 'flex-end',  marginRight: 10, marginTop: 12}}>
                        <Icon  name='trash' type='font-awesome' iconStyle={{marginTop: 15, marginRight: 20 }} color='#000' 
                            onPress={ () => { 
                                database.multiDelete(checkedIDS)
                                loadDataAsync();                                 
                            }

                        } />
                        {/* <CheckBox onPress={ () => setMarkAll(!markAll) }  checked={ markAll }  /> */}
                    </View>
                    : 
                    <Search filterResult={ filterResult } />  
                }

            <TouchableWithoutFeedback >
                {  
                 data.length == 0 ? <Text> No notes to display </Text> : 
                    <FlatList  
                        data={ data }
                        renderItem = {renderItem}
                        keyExtractor = {item => item.id.toString()}
                    />
                }
          </TouchableWithoutFeedback>

          {showColoredButton ? <ButtonColorComp  showColoredButton={showColoredButton}  setShowColoredButton={setShowColoredButton} /> : null}
          {hideCreateButton ?  null :
          <CreateNoteButton  showColoredButton={showColoredButton} setShowColoredButton={setShowColoredButton} />
          
        }
        </TrashOrMenuContext.Provider>
        </DeleteContext.Provider>
    )
};


export default Home;