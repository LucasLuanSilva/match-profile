import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';
import DrawerContent from '../components/DrawerContent';

export type RootDrawerParamList = {
  Login: undefined;
  Cadastro: undefined;
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
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Cadastro" component={Cadastro} />
    </Drawer.Navigator>
  );
};

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
      <Auth.Screen name="DrawerNavigation" component={DrawerNavigation}/>
      <Auth.Screen name="Login" component={Login}/>
      <Auth.Screen name="Cadastro" component={Cadastro}/>
      <Auth.Screen name="Home" component={Home}/>
    </Auth.Navigator>
);
export default AuthRoutes;
