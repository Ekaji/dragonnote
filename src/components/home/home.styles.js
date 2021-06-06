import styled from 'styled-components/native';

const TouchableOpacityComp = styled.TouchableOpacity`
        border-width: 1px;
        border-color: ${props => props.color};
        background-color: ${props => props.color};
        margin: 10px;
        border-radius: 6px;
`;

const Notesview = styled.View`
        margin: 10px;
        width: 60%;
        `;

const Text_Title = styled.Text`
        font-size: 20px;
        margin-bottom: 8px;
        `;

const NotesviewContainer = styled.View`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        `;

const TrashComponent = styled.View`
        margin-top: auto;
        margin-bottom: auto; 
        margin-right: 10px;
        `;

const EllipsisMenu = styled.View`
        margin-top: 10px;
        margin-right: 10px;
        width: 40;
        `;

const ColorButtonsComp = styled.View`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        zIndex: 200;
        width: 120px;
        margin-left: -270px;
        `;

export { TouchableOpacityComp, NotesviewContainer, ColorButtonsComp, TrashComponent, EllipsisMenu, Notesview, Text_Title }