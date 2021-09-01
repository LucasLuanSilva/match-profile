import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert  } from 'react-native';
import { Container } from './styles';
import Button from '../../components/Button';
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
    // const [cidade, setCidade] = useState({
    //   codigo_municipio: "5554567",
    //   nome: "São João do Miriti",
    //   uf: "RJ"
    // })
    // const cadastrarCidade = async ()=> {
    //   await axios.post('http://10.0.2.2:3333/cidades', cidade).then(
    //     (response) => {
    //       console.log(response);
    //     }
    //   )
    //   .catch(
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // }
    return(
        <Container>
            <View style={styles.title}>
                <Text style={styles.titletext}>Login</Text>
                <Text style={styles.subtitletext}>Por favor entre com sua conta</Text>
            </View>

            <TextInput placeholder="E-mail"
                        style={styles.input}
                        value={credencial.email}
                        onChangeText={field('email')} />

            <TextInput placeholder="Senha"
                        style={styles.input}
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
        </Container>

    )
}

const styles = StyleSheet.create({
    title:{
        marginTop:100,
        marginLeft:'15%',
        marginBottom:20,
        alignItems:'flex-start'
    },
    titletext:{
        fontWeight:'bold',
        fontSize:20
    },
    subtitletext:{
        fontSize:16
    },
    textAnchor:{
        marginTop:20,
        alignItems:'center'
    },
    input:{
        width:'70%',
        height:60,
        borderRadius:10,
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        borderWidth: 1,
        alignSelf:'center',
        flexDirection:'row',
    }



});
export default Login;
