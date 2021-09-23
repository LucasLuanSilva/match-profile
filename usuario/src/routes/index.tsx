import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Cadastro2 from '../pages/Cadastro/cadastro2';
import Home from '../pages/Home';
import Teste1 from '../pages/Testes/teste1';
import Teste2 from '../pages/Testes/teste2';
import Teste3 from '../pages/Testes/teste3';
import Teste4 from '../pages/Testes/teste4';
import Teste5 from '../pages/Testes/teste5';
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
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}

    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
    screenOptions={{
      headerShown:true
    }}
    >

      <Auth.Screen name="DrawerNavigation" component={DrawerNavigation}/>
      <Auth.Screen name="Login"  options={{ headerShown: false }} component={Login} />
      <Auth.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastro',
          headerStyle: {
            backgroundColor: '#3B55E6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
      <Auth.Screen name="Cadastro2" component={Cadastro2} options={{ title: 'Cadastro',
          headerStyle: {
            backgroundColor: '#3B55E6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
      <Auth.Screen name="Home" component={Home} options={{ title: 'My home',
          headerStyle: {
            backgroundColor: '#3B55E6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
      <Auth.Screen name="Teste1" component={Teste1}/>
      <Auth.Screen name="Teste2" component={Teste2}/>
      <Auth.Screen name="Teste3" component={Teste3}/>
      <Auth.Screen name="Teste4" component={Teste4}/>
      <Auth.Screen name="Teste5" component={Teste5}/>

    </Auth.Navigator>
);
export default AuthRoutes;
