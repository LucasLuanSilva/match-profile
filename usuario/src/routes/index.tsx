import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Cadastro2 from '../pages/Cadastro/cadastro2';
import Home from '../pages/Home';
import ListaTestes from '../pages/Testes/listatestes';
import EditaCurriculo from '../pages/EditaCurriculo';
import MostraCurriculo from '../pages/MostraCurriculo';
import DrawerContent from '../components/DrawerContent';

export type RootDrawerParamList = {
  Home: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

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
      <Drawer.Screen name="ListaTestes"  options={{ title: 'Testes' }} component={ListaTestes}/>
    </Drawer.Navigator>
  );
};

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3B55E6'
        },
        headerTintColor: '#fff'
      }}
    >

      <Auth.Screen name="Login"  options={{ headerShown: false }} component={Login} />
      <Auth.Screen name="DrawerNavigation" options={{ headerShown: false }} component={DrawerNavigation}/>
      <Auth.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastro'}}/>
      <Auth.Screen name="Cadastro2" options={{ title: 'Cadastro'}} component={Cadastro2}/>
      <Auth.Screen name="EditaCurriculo"  options={{ title: 'Preenchimento Currículo' }} component={EditaCurriculo}/>
      <Auth.Screen name="MostraCurriculo"  options={{ title: 'Meu Currículo' }} component={MostraCurriculo}/>

    </Auth.Navigator>
);
export default AuthRoutes;
