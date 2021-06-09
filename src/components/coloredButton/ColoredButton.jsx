import React from 'react'
import { BlurView } from 'expo-blur';
import { View, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ColoredButtonStyle, BlurViewStyles } from './coloredButton.style';


 const ColoredButton = ({color, id}) => {
    const navigation = useNavigation();

    return(
        <View>
        <ColoredButtonStyle color={color}
                            onPress={() => navigation.navigate('Createnote', 
                                    {  title: '', content: '',  color: color 
                                } 
                              )
                            }
  />
  </View>
    )
}

const ButtonColorComp = () => {
    const colors = ['#FDDCA5', '#1DE9B6', '#4DD0E1', '#FF8A80']
    return(
        <BlurView intensity={100} style={ BlurViewStyles } >
        {colors.map((color, i) => (
            <ColoredButton color={color} key={i}  />
        ))}
        </BlurView >
    )
}

export default ButtonColorComp;