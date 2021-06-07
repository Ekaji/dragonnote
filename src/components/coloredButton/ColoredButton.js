import React from 'react'
import { View, Button, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

 const Blue = ({color, id}) => {
    const navigation = useNavigation();

    return(
        <View>
        <TouchableOpacity style={{  borderWidth:1, borderColor:'rgba(0,0,0,0.2)',
                                alignItems:'center',
                                justifyContent:'center',
                                width: 50,
                                height: 50,
                                bottom:  5,
                                backgroundColor: `${color}`,
                                borderRadius:100,
                                margin: 12,
                            }}
                            onPress={() => navigation.navigate('Createnote', {  title: '', content: '',  color: color } )}
  />
  </View>
    )
}

const ButtonColorComp = () => {
    const colors = ['#FB8C00', '#1DE9B6', '#4DD0E1', '#FF8A80']
    return(
        <View style={{ position: 'absolute', zIndex: 30, bottom: 160, right: 60, backgroundColor: '#fff', width: 75 }}  >
        {colors.map((color, i) => (
            <Blue color={color} key={i} id={i}  />
        ))}
        </View>
    )
}

export default ButtonColorComp;