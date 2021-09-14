import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../hooks/auth';


import {
  Container,
  NameUser,
  TitleUser,
  Body,
  Footer,
  HeaderBody,
} from './styles';
import { NavigationContainer } from '@react-navigation/native';

const DrawerContent = (
  props: DrawerContentComponentProps,
): React.ReactElement => {

  const { signOut } = useAuth();

  const Deslogar = () =>{
    signOut();
    props.navigation.navigate("Login");
  }

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
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <Text style={styles.textanchor}>Home</Text>
        </TouchableOpacity>
      </Body>
      <Footer>
      <TouchableOpacity onPress={() =>Deslogar()}>
          <Text style={styles.textanchor}><Icon name="log-out" size={20} color="#000"/>Log-out</Text>
        </TouchableOpacity>
      </Footer>
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
