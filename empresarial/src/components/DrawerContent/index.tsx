import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import {
  Container,
  NameUser,
  TitleUser,
  Body,
  Footer,
  HeaderBody,
} from './styles';

const DrawerContent = (
  props: DrawerContentComponentProps,
): React.ReactElement => {
  const menuItems = [
    {
      label: 'Login',
      route: 'Login',
      icon: 'home',
    },
    {
      label: 'Cadastro',
      route: 'Cadastro',
      icon: 'information',
    },
  ];

  return (
    <Container>
      <Body>
        <HeaderBody>
          <NameUser>Match</NameUser>
          <TitleUser>Profile</TitleUser>
        </HeaderBody>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cadastro')}>
          <Text style={styles.textanchor}>Cadastro</Text>
        </TouchableOpacity>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  title:{
      marginTop:100,
      marginLeft:'15%',
      marginBottom:20,
      alignItems:'flex-start'
  },
  textanchor:{
      fontWeight:'bold',
      fontSize:20,
      marginLeft:20
  },



});

export default DrawerContent;
