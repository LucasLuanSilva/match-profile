import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image  } from 'react-native';
import { Container } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

const Login: React.FC =()=> {

    const navigation = useNavigation();
    const { signIn } = useAuth();
    const [credencial, setCredencial] = useState({ email:'', senha: '' })
    const [access, setAccess] = useState(true)

    const field = (field) => {
        return (value) => {
            setCredencial({...credencial, [field]: value })
            let isEnable = (credencial.email != '' && credencial.senha != '')
            setAccess(!isEnable)
        }
    }

    const login = async() => {
        try{
            await signIn({
              email:credencial.email,
              senha:credencial.senha,
          });
          navigation.navigate("DrawerNavigation");
        }catch(error){
          Alert.alert(error.response.data.message);
        }
    }

    const cadastro = () => {
        navigation.navigate("Cadastro");
    }

    return(
        <View style={{ flex: 1 }}>
          <Image style={styles.logo} source={require('../../images/logotipo.png')} />

            <Container>
                <View style={styles.title}>
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

                <Button onPress={()=>{login()}}>Entrar</Button>
                <View style={styles.viewAnchor}>
                  <Text style={styles.subText}>Não possui uma conta?&ensp;
                  <Text onPress={()=>{cadastro()}} style={styles.textAnchor}>Criar conta agora!</Text>
                  </Text>
                  <Text style={styles.subText}>Ao se inscrever você concorda com nossos&ensp;
                  <Text onPress={() => { console.log("teste") }} style={styles.textAnchor}>Termos e Condições</Text>
                  </Text>
                </View>

            </Container>
        </View>

    )
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 28,
    marginTop:-30,
    marginBottom: 10

  },
  subtitleText: {
    fontSize: 20,
    marginBottom: 30
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
    alignSelf: 'center',
    marginTop: 50
  },
  title:{

  },
  viewAnchor:{
    alignContent:'center'
  }




});
export default Login;
