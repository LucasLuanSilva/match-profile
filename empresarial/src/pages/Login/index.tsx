import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Container } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
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

      setCredencial({ ...credencial, email: '', senha: '' });

      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(error.response.data.message);
      setCredencial({ ...credencial, senha: '' })
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.logo} source={require('../../images/logotipo.png')} />

      <Container>

        <View>
          <Text style={styles.titleText}>Login</Text>
          <Text style={styles.subtitleText}>Por favor entre com sua conta</Text>
        </View>

        <Input icon="mail"
          placeholder="E-mail"
          value={credencial.email}
          onChangeText={field('email')} />

        <Input icon="lock"
          placeholder="Senha"
          secureTextEntry={true}
          value={credencial.senha}
          onChangeText={field('senha')} />

        <Button onPress={() => { login() }}>Entrar</Button>

        <Text style={styles.subText}>Ao se inscrever você concorda com nossos&ensp;
          <Text onPress={() => { console.log("teste") }} style={styles.textAnchor}>Termos e Condições</Text>
        </Text>

      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  subtitleText: {
    fontSize: 16,
    marginBottom: 10
  },
  subText: {
    fontSize: 11,
    marginTop: 20
  },
  textAnchor: {
    fontSize: 11,
    color: 'blue',
    textDecorationLine: 'underline'
  },
  logo: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 50
  }
});

export default Login;
