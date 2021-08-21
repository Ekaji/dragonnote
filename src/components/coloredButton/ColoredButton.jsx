import React from 'react'
import { BlurView } from 'expo-blur';
import { View, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ColoredButtonStyle, BlurViewStyles } from './coloredButton.style';


 const ColoredButton = ({color, id, showColoredButton, setShowColoredButton}) => {
    const navigation = useNavigation();

    return(
        <View>
            <ColoredButtonStyle 
                color={color}
                onPress={() => { setShowColoredButton(false); //hides the colored buttons
                return navigation.navigate('Createnote', 
                        {  title: '', content: '',  color: color  } 
                            )
                        }
                    }
                />
        </View>
    )
}

const ButtonColorComp = ({showColoredButton, setShowColoredButton}) => {
    const colors = ['#FDDCA5', '#1DE9B6', '#4DD0E1', '#FF8A80']
    return(
        <BlurView intensity={100} style={ BlurViewStyles } >
        {colors.map((color, i) => (
            <ColoredButton color={color} key={i} showColoredButton={showColoredButton} setShowColoredButton={setShowColoredButton} />
        ))}
        </BlurView >
    )
}

export default ButtonColorComp;