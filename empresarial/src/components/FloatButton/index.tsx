import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container } from './styles';

interface FloatButtonProps extends TouchableOpacityProps {
  icon: string;
}

const FloatButton: React.FC<FloatButtonProps> = ({ icon, ...rest }) => {
  return (
    <Container {...rest}>
      <Icon name={icon} size={20} color="#FFF" />
    </Container>
  )
}

export default FloatButton;
