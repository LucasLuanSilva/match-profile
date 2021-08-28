import React from 'react';
import { TextInputProps, View } from 'react-native';
import { Container, InputText } from './styles';
import Icon from 'react-native-vector-icons/Feather'

interface InputProps extends TextInputProps {
    name: string,
    icon: string
}

const Input: React.FC<InputProps> =({name, icon, ...rest})=> {
    return(
        <Container>
            <InputText placeholderTextColor="#000" {...rest}/>
            <Icon name={icon} size={20} color="#000" style={{marginHorizontal:10}}/>
        </Container>
    )
}

export default Input;
