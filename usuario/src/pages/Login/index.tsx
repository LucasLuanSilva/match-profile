import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert  } from 'react-native';
import { Container } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';

const Login: React.FC =()=> {

    const navigation = useNavigation();
    const [credencial, setCredencial] = useState({ email:'', password: '' })
    const [access, setAccess] = useState(true)

    const field = (field) => {
        return (value) => {
            setCredencial({...credencial, [field]: value })
            let isEnable = (credencial.email != '' && credencial.password != '')
            setAccess(!isEnable)
        }
    }

    const login = () => {
        Alert.alert(credencial.password);
        navigation.navigate("Home");
    }

    const cadastro = () => {
        navigation.navigate("Cadastro");   
    }
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
                        value={credencial.password}
                        
                        onChangeText={field('password')} />
            <Button onPress={()=>{login()}}>Entrar</Button>
        
            <TouchableOpacity onPress={()=>{cadastro()}} style={styles.textAnchor}>
                <Text><Icon name="log-in" size={20} color="#000"/>Fazer Cadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{console.log('Senha')}} style={styles.textAnchor}>
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
