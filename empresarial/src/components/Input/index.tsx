import React from 'react';
import { TextInputProps, View } from 'react-native';
import { Container, InputText } from './styles';
import Icon from 'react-native-vector-icons/Feather'

interface InputProps extends TextInputProps {
  icon?: string
}

const Input: React.FC<InputProps> = ({ icon, ...rest }) => {
  function Icone() {
    if (icon) {
      return (
        <Icon name={icon} size={20} color="#000" style={{ marginHorizontal: 10 }} />
      )
    }

    return null;
  }

  return (
    <Container>
      <InputText placeholderTextColor="gray" {...rest} />
      <Icone />
    </Container>
  )
}

export default Input;
