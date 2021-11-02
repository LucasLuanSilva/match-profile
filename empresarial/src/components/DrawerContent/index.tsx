import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  NameUser,
  TitleUser,
  Body,
  Footer,
  HeaderBody,
} from './styles';

const DrawerContent = (props: DrawerContentComponentProps): React.ReactElement => {
  const [usuario, setUsuario] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    nivel: '0'
  });

  const menuItems = [
    {
      label: 'Home',
      route: 'Home',
      icon: 'home',
    },
    {
      label: 'Vagas',
      route: 'Vaga',
      icon: 'briefcase',
    },
    {
      label: 'Testes',
      route: 'Teste',
      icon: 'clipboard',
    }
  ];

  const { signOut } = useAuth();

  const Deslogar = () => {
    signOut();
    props.navigation.navigate("Login");
  }

  useEffect(async () => {
    const [nome, sobrenome, email, nivel] = await AsyncStorage.multiGet([
      'nome',
      'sobrenome',
      'email',
      'nivel',
    ]);

    setUsuario({
      ...usuario,
      ['nome']: nome[1],
      ['sobrenome']: sobrenome[1],
      ['email']: email[1],
      ['nivel']: nivel[1]
    });
  }, [props.state])

  if (usuario.nivel == '1') {
    menuItems.push({
      label: 'Usuários',
      route: 'Usuario',
      icon: 'user',
    });
  }

  return (
    <Container>
      <Body>
        <HeaderBody>
          <NameUser>{usuario.nome + ' ' + usuario.sobrenome}</NameUser>
          <TitleUser>{usuario.email}</TitleUser>
        </HeaderBody>
        {
          menuItems.map((item, key) => {
            return (
              <TouchableOpacity key={key} style={styles.menuItem} onPress={() => props.navigation.navigate(item.route)}>
                <Text style={styles.textAnchor}>
                  <Icon style={styles.icon}
                    name={item.icon}
                    size={20}>
                  </Icon>
                  &ensp;
                  {item.label}
                </Text>

              </TouchableOpacity>
            )
          })
        }
      </Body>
      <Footer>
        <TouchableOpacity style={styles.menuItem} onPress={Deslogar}>
          <Text style={styles.textAnchor}>
            <Icon style={styles.icon}
              name='log-out'
              size={20}>
            </Icon>
            &ensp;
            Sair
          </Text>
        </TouchableOpacity>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({

  title: {
    marginTop: 100,
    marginLeft: '15%',
    marginBottom: 20,
    alignItems: 'flex-start'
  },
  textAnchor: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000',
    marginHorizontal: 10
  },
  icon: {
    marginHorizontal: 10,
    color: '#000'
  },
  menuItem: {
    justifyContent: 'center',
    height: 50,
    borderRadius: 2
  }

});

export default DrawerContent;
