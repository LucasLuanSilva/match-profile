import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Home from '../pages/Home';
import DrawerContent from '../components/DrawerContent';
import Usuario from '../pages/Usuario';
import FormularioUsuario from '../pages/FormularioUsuario';
import Configuracao from '../pages/Configuracao';

const Drawer = createDrawerNavigator();

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3B55E6'
        },
        headerTintColor: '#fff'
      }}
      drawerContent={props => <DrawerContent {...props} />}
    >

      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Usuario" options={{ title: 'Usuários' }} component={Usuario} />
      <Drawer.Screen name="Configuracao" options={{ title: 'Configurações' }} component={Configuracao} />

    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

const StackNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3B55E6'
        },
        headerTintColor: '#fff'
      }}
    >

      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="DrawerNavigation" options={{ headerShown: false }} component={DrawerNavigation} />
      <Stack.Screen name="Cadastro" options={{ title: 'Formulário de Usuário' }} component={FormularioUsuario} />

    </Stack.Navigator>
  );
}

export default StackNavigation;
