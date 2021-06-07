import styled from 'styled-components/native';
import { StyleSheet} from 'react-native';


const ColoredButtonStyle = styled.TouchableOpacity`
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        bottom:  1px;
        backgroundColor: ${props => props.color};
        borderRadius: 100px;
        margin: 12px;
`;

const styles = StyleSheet.create({
  blurViewStyles: {
    position: 'absolute',
    zIndex: 30,
    bottom: 160,
    right: 60,
    width: 65,
    borderRadius: 50,
    }
});

const BlurViewStyles = styles.blurViewStyles

export { ColoredButtonStyle, BlurViewStyles }