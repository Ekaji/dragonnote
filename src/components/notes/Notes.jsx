import React, {
    useState, 
    useContext, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native';
import { BackHandler } from "react-native";
import { CheckBox } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { DeleteContext } from '../../context/deleteContext'
import { TrashOrMenuContext } from '../../context/TrashOrMenuContext';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { TouchableOpacityComp, NotesviewContainer, TrashComponent, Notesview, Text_Title } from './note.styles'


//discribes how the rendered item should look
const Notes = ({ id, title, content, color, loadDataAsync, hideCreateButton, setHideCreateButton}) => {
    const navigation = useNavigation();
    //applies css styling to either show or hide checkbox
    const [trashOrMenuDisplay, setTrashOrMenuDisplay] = useContext(TrashOrMenuContext)

    const {value, value2} = useContext(DeleteContext);
    const [checkedIDS, setCheckedIDS] = value;
    // const [markAll, setMarkAll] = value2;
    
    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            setTrashOrMenuDisplay(!trashOrMenuDisplay)
            setHideCreateButton(!hideCreateButton)
        }
    };

// cancles onLongPress 
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (trashOrMenuDisplay) {
                    setTrashOrMenuDisplay(!trashOrMenuDisplay)
                    setHideCreateButton(!hideCreateButton)
                    return true;
                } else {
                    return false;
                }
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            } 
        }, [trashOrMenuDisplay, setTrashOrMenuDisplay])
    )

    

    const [checkedState, setCheckedState] = useState(false);

    const handleCheckedState = () => {
       if ( checkedState === !false ) {
         return  setCheckedIDS( () => checkedIDS.filter(checkedID => checkedID !== id))
       }
      return setCheckedIDS( () => checkedIDS.concat(id))
   }

//    useState(() => {
//     setCheckedState(markAll)
//    }, [markAll])


    return(
        <TouchableOpacityComp color={color} onPress={() => navigation.navigate('Createnote', 
            {id: id, title: title, content: content, color: color}
        )}>
            <LongPressGestureHandler
            onHandlerStateChange={onLongPress}
            minDurationMs={400}
        >
            <NotesviewContainer >
            <Notesview  >
                <Text_Title numberOfLines={1} >{ title }</Text_Title>
                <Text numberOfLines={2} style={{overflow: 'hidden', marginRight: 15 }}>{ content }</Text>
                <Text style={{marginTop: 10}} > { id } </Text>

                 {trashOrMenuDisplay ?
            <TrashComponent> 
                <CheckBox
                    onPress={() => {
                        setCheckedState(!checkedState)
                        handleCheckedState()
                    }}
                    checked={checkedState}
                    />
            </TrashComponent>
                : null
            }
            </Notesview>

           
            
            </NotesviewContainer>
            </LongPressGestureHandler>
        </TouchableOpacityComp>
    )  
}

export default Notes