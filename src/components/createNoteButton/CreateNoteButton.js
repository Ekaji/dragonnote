import React from 'react'
import styled from 'styled-components/native';
import { Icon } from 'react-native-elements'
import { Button, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const CreateButton = () => {
    // useNavigation is a hook which gives access to the navigation object https://reactnavigation.org/docs/connecting-navigation-prop
    const navigation = useNavigation();
    
    const CreateNoteButtonContainer = styled.View`
        position: absolute;
        zIndex: 20;
        bottom: 80px;
        right: 60px;
        margin: 0px auto;
    `;
 
    return(
        // button component for navigation
        <CreateNoteButtonContainer > 
                <Icon raised  name='plus' type='font-awesome' color="#f194ff" onPress={() => navigation.navigate('Createnote', {  title: '', content: ''} )} />
        </CreateNoteButtonContainer>
    )
}

export default CreateButton;