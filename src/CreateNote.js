import React from 'react'
import styled from 'styled-components/native';
import { Button, View, useWindowDimensions } from 'react-native';


const CreateButton = () => {
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
            <CreateNoteButton title= '+' color="#f194ff" />
        </CreateNoteButtonContainer>
    )
}

export default CreateButton;