import { StyleSheet } from 'react-native'

//not using styled components because of a bug where the keyboard disapears with every keystroke
const createNote = StyleSheet.create({
    textInputTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        height: 64,
        margin: 12,
        },

    textInputNote: {
        fontSize: 20,
        margin: 12,
        },

    timearea: {
        margin: 12,
        }
    },
);

export {createNote}