import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Home from '../pages/Home';
import DrawerContent from '../components/DrawerContent';
import Usuario from '../pages/Usuario';
import FormularioUsuario from '../pages/FormularioUsuario';
import Configuracao from '../pages/Configuracao';
import Teste from '../pages/Teste';
import FormularioTeste from '../pages/FormularioTeste';
import Vaga from '../pages/Vaga';
import FormularioVaga from '../pages/FormularioVaga';
import EnviarTeste from '../pages/EnviarTeste';
import Candidato from '../pages/Candidato';
import PerfilCandidato from '../pages/PerfilCandidato';
import TesteCandidato from '../pages/TesteCandidato';
import CurriculoCandidato from '../pages/CurriculoCandidato';
import FormularioTesteRespondido from '../pages/FormularioTesteRespondido';
import FormularioEmpresa from '../pages/FormularioEmpresa';

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
      <Drawer.Screen name="Teste" options={{ title: 'Testes' }} component={Teste} />
      <Drawer.Screen name="Vaga" options={{ title: 'Vagas' }} component={Vaga} />
      <Drawer.Screen name="Candidato" options={{ title: 'Candidatos' }} component={Candidato} />

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
      <Stack.Screen name="FormularioTeste" options={{ title: 'Formulário de Teste' }} component={FormularioTeste} />
      <Stack.Screen name="FormularioVaga" options={{ title: 'Formulário de Vaga' }} component={FormularioVaga} />
      <Stack.Screen name="EnviarTeste" options={{ title: 'Enviar Teste' }} component={EnviarTeste} />
      <Stack.Screen name="PerfilCandidato" options={{ title: 'Perfil' }} component={PerfilCandidato} />
      <Stack.Screen name="TesteCandidato" options={{ title: 'Testes do Candidato' }} component={TesteCandidato} />
      <Stack.Screen name="CurriculoCandidato" options={{ title: 'Curriculo do Candidato' }} component={CurriculoCandidato} />
      <Stack.Screen name="FormularioTesteRespondido" options={{ title: 'Teste Respondido' }} component={FormularioTesteRespondido} />
      <Stack.Screen name="FormularioEmpresa" options={{ title: 'Formulário Empresa' }} component={FormularioEmpresa} />

    </Stack.Navigator>
  );
}

export default StackNavigation;
