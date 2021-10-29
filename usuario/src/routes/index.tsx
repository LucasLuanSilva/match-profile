import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Cadastro2 from '../pages/Cadastro/cadastro2';
import Home from '../pages/Home';
import ListaTestes from '../pages/Testes/listatestes';
import Teste1 from '../pages/Testes/teste1';
import Teste2 from '../pages/Testes/teste2';
import Teste3 from '../pages/Testes/teste3';
import Teste4 from '../pages/Testes/teste4';
import Teste5 from '../pages/Testes/teste5';
import EditaCurriculo from '../pages/EditaCurriculo';
import MostraCurriculo from '../pages/MostraCurriculo';
import DrawerContent from '../components/DrawerContent';

export type RootDrawerParamList = {
  // Login: undefined;
  // Cadastro: undefined;
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
      {/* <Drawer.Screen name="EditaCurriculo"  options={{ title: 'Preenchimento Currículo' }} component={EditaCurriculo}/> */}
      <Drawer.Screen name="Teste1"  options={{ title: 'Testes' }} component={Teste1}/>
      <Drawer.Screen name="Teste2" component={Teste2}/>
      <Drawer.Screen name="Teste3" component={Teste3}/>
      <Drawer.Screen name="Teste4" component={Teste4}/>
      <Drawer.Screen name="Teste5" component={Teste5}/>
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
