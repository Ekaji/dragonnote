import React from 'react'
import styled from 'styled-components/native';
import { Button, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const CreateButton = () => {
    // useNavigation is a hook which gives access to the navigation object https://reactnavigation.org/docs/connecting-navigation-prop
    const navigation = useNavigation();
    //get the width of the screen
    const windowWidth = useWindowDimensions().width;

    const CreateNoteButtonContainer = styled.View`
        position: absolute;
        bottom: 50px;
        right: ${(windowWidth / 2) -50} ;
        left: ${(windowWidth / 2) -50} ;
        margin: 0px auto;
    `;

    const CreateNoteButton = styled.Button`
        background-color: aqua;
        font-size : 200px;
        padding: 90px;
    `;
 
    return(
        <CreateNoteButtonContainer > 
            <CreateNoteButton title= '+' color="#f194ff" name='button' onPress={() => navigation.navigate('Createnote', 
                {id: id, title: '', content: ''}
                )} />
        </CreateNoteButtonContainer>
    )
}

export default CreateButton;