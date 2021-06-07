import React from 'react'
import styled from 'styled-components/native';
import { Icon } from 'react-native-elements'
import { CreateNoteButtonContainer } from './createNoteButton.styles'

// showColoredButton, setShowColoredButton from Home component
const CreateButton = ({showColoredButton, setShowColoredButton}) => {   
 
    return(
        // button component for navigation
        <CreateNoteButtonContainer > 
                <Icon raised  name='plus' type='font-awesome' color="#f194ff" onPress={() => setShowColoredButton(!showColoredButton)} />
        </CreateNoteButtonContainer>
    )
}

export default CreateButton;