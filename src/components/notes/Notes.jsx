import React, {
    useState, 
    useContext } from 'react'
import { Text } from 'react-native';
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

    const [checkedIDS, setCheckedIDS] = useContext(DeleteContext);
    
    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            setTrashOrMenuDisplay(!trashOrMenuDisplay)
            setHideCreateButton(!hideCreateButton)
        }
    };

    const [checkedState, setCheckedState] = useState(false);

   const handleCheckedState = () => {
       if (checkedState === !false) {
         return  setCheckedIDS( () => checkedIDS.filter(checkedID => checkedID !== id))
       }
      return setCheckedIDS( () => checkedIDS.concat(id))
   }


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