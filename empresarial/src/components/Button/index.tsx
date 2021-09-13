import React from 'react';
import { View } from 'react-native';
import { Container, ButtonText } from './styles'
import { BaseButtonProperties } from 'react-native-gesture-handler';

interface ButtonProps extends BaseButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  )
}

export default Button;
