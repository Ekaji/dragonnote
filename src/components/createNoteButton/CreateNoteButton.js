import React from 'react'
import styled from 'styled-components/native';
import { Button, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {CreateNoteButton} from './createNoteButton.styles'


const CreateButton = () => {
    // useNavigation is a hook which gives access to the navigation object https://reactnavigation.org/docs/connecting-navigation-prop
    const navigation = useNavigation();
    //get the width of the screen
    const windowWidth = useWindowDimensions().width;

    const CreateNoteButtonContainer = styled.View`
        position: absolute;
        zIndex: 20;
        bottom: 10px;
        right: ${(windowWidth / 2) -50} ;
        left: ${(windowWidth / 2) -50} ;
        margin: 0px auto;
    `;
 
    return(
        // button component for navigation
        <CreateNoteButtonContainer > 
            <CreateNoteButton title= '+' color="#f194ff" name='button' onPress={() => navigation.navigate('Createnote', {  title: '', content: ''} )} />
        </CreateNoteButtonContainer>
    )
}

export default CreateButton;