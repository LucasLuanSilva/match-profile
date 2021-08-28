import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
    screenOptions={{
        headerShown:false
    }}
    >
        <Auth.Screen name="Login" component={Login}/>
        <Auth.Screen name="Cadastro" component={Cadastro}/>
        <Auth.Screen name="Home" component={Home}/>
    </Auth.Navigator>
);
export default AuthRoutes;