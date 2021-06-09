import React from 'react'
import { useContext} from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { database } from '../database/Database'
import { useNavigation } from '@react-navigation/native';
import { TrashOrMenuContext } from '../../context/TrashOrMenuContext';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { TouchableOpacityComp, NotesviewContainer, TrashComponent, Notesview, Text_Title } from './note.styles'


//discribes how the rendered item should look
const Notes = ({ id, title, content, color, loadDataAsync, hideCreateButton, setHideCreateButton}) => {
    const navigation = useNavigation();
    //applies css styling to either show or hide checkbox
    const [trashOrMenuDisplay, setTrashOrMenuDisplay] = useContext(TrashOrMenuContext)

    
    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            setTrashOrMenuDisplay(!trashOrMenuDisplay)
            setHideCreateButton(!hideCreateButton)
        }
    };

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
                <Text_Title>{ title }</Text_Title>
                <Text>{ content }</Text>
            </Notesview>

            {trashOrMenuDisplay ?
            <TrashComponent> 
                <Icon  name='trash' type='font-awesome' color={color} raised
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

export default Notes