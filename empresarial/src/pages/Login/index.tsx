import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Container, Input } from './styles';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

const Login: React.FC = () => {

  const navigation = useNavigation();
  const { signIn } = useAuth();
  const [credencial, setCredencial] = useState({ email: '', senha: '' })
  const [access, setAccess] = useState(true)

  const field = (field) => {
    return (value) => {
      setCredencial({ ...credencial, [field]: value })
      let isEnable = (credencial.email != '' && credencial.senha != '')
      setAccess(!isEnable)
    }
  }

  const login = async () => {
    try {
      await signIn({
        email: credencial.email,
        senha: credencial.senha,
      });
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(error.response.data.message);
    }
  }

  return (
    <Container>

      <View>
        <Text style={styles.titleText}>Login</Text>
        <Text style={styles.subtitleText}>Por favor entre com sua conta</Text>
      </View>

      <Input placeholder="E-mail"
        value={credencial.email}
        onChangeText={field('email')} />

      <Input placeholder="Senha"
        secureTextEntry={true}
        value={credencial.senha}
        onChangeText={field('senha')} />

      <Button onPress={() => { login() }}>Entrar</Button>

      <Text style={styles.subText}>Ao se inscrever você concorda com nossos
        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.textAnchor}>Termos e Condições</Text>
        </TouchableOpacity>
      </Text>

    </Container>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  subtitleText: {
    fontSize: 16
  },
  subText: {
    fontSize: 12,
    marginTop: 20,
    alignItems: 'center'
  },
  textAnchor: {
    fontSize: 12
  }
});

export default Login;
