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
          navigation.navigate("Home");
        }catch(error){
          Alert.alert("Erro: "+ error);
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
                    <Text style={styles.titletext}>Login</Text>
                    <Text style={styles.subtitletext}>Por favor entre com sua conta</Text>
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

                <TouchableOpacity onPress={()=>{cadastro()}} style={styles.textAnchor}>
                    <Text><Icon name="log-in" size={20} color="#000"/>Fazer Cadastro</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>{}} style={styles.textAnchor}>
                    <Text>Esqueci minha senha</Text>
                </TouchableOpacity>
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
    alignSelf: 'center',
    marginTop: 50
  },
  



});
export default Login;
