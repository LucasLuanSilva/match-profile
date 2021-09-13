import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  NameUser,
  TitleUser,
  Body,
  Footer,
  HeaderBody,
} from './styles';
import Login from '../../pages/Login';

const DrawerContent = (
  props: DrawerContentComponentProps,
): React.ReactElement => {
  const menuItems = [
    {
      label: 'Home',
      route: 'Home',
      icon: 'home',
    }
  ];

  return (
    <Container>
      <Body>
        <HeaderBody>
          <NameUser>Usuário Teste</NameUser>
          <TitleUser>teste@gmail.com</TitleUser>
        </HeaderBody>
        {
          menuItems.map((item, key) => {
            return (
              <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate(item.route)}>
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
        <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate(Login)}>
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
