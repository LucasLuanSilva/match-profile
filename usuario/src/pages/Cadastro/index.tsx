import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { Picker } from '@react-native-picker/picker'

const Cadastro: React.FC =()=> {
    const navigation = useNavigation();

    const [credencial, setCredencial] = useState({
        empresas_id:'d6cf0ba6-f803-428c-bed4-66f36c768ad5',
        cpf: "71526318083",
        nome: "Carlos",
        sobrenome: "Silva",
        email: "gxg@email.com",
        rg: "101010",
        senha: "1234",
    })
    const [access, setAccess] = useState(true)
    const [cidade, setCidade] = useState([
      {
        codigo_municipio: "3550308",
        nome: "São Paulo",
        uf: "SP"
      },
      {
        codigo_municipio: "3550308",
        nome: "Maracá",
        uf: "SP"
      },
      {
        codigo_municipio: "3550308",
        nome: "São Joaão do miriti",
        uf: "SP"
      },
    ]);
    const [cidadeSelecionada, setCidadeSelecionada] = useState([]);

    const field = (field) => {
        return (value) => {
            setCredencial({...credencial, [field]: value })
            // let isEnable = (credencial.empresas_id != '' && credencial.password != '')
            // setAccess(!isEnable)
        }

    }

    const register = async() => {
      await api.post('usuarios', credencial).then(
        (response) => {
          Alert.alert("Cadastro efetuado com sucesso");
          navigation.navigate('Login');
        }
      )
      .catch(
        (error) => {
          Alert.alert(error.response.data.error);
        }
      );
    }


    return(
        <View>
          <ScrollView>
            <View style={styles.title}>
                <Text style={styles.titletext}>Cadastro</Text>
            </View>
            <Text style={styles.label}>Nome</Text>
            <TextInput placeholder="Nome"
                        style={styles.input}
                        value={credencial.nome}
                        onChangeText={field('nome')} />
            <Text style={styles.label}>Sobrenome</Text>
            <TextInput placeholder="Sobrenome"
                        style={styles.input}
                        value={credencial.sobrenome}
                        onChangeText={field('sobrenome')} />
            <Text style={styles.label}>E-mail</Text>
            <TextInput placeholder="E-mail"
                        style={styles.input}
                        value={credencial.email}
                        onChangeText={field('email')} />
            <View style={styles.rowView} >
              <View>
                <Text>CPF</Text>
                <TextInput placeholder="CPF"
                            style={styles.halfInput}
                            value={credencial.cpf}
                            onChangeText={field('cpf')} />
              </View>
              <View>
                <Text>RG</Text>
                <TextInput placeholder="RG"
                            style={styles.halfInput}
                            value={credencial.rg}
                            onChangeText={field('rg')} />
              </View>
            </View>
            <Text style={styles.label}>Senha</Text>
            <TextInput placeholder="Senha"
                        style={styles.input}
                        secureTextEntry={true}
                        value={credencial.senha}
                        onChangeText={field('senha')} />
            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput placeholder="Senha"
                        style={styles.input}
                        secureTextEntry={true}
                        value={credencial.senha}
                        onChangeText={field('senha')} />
            <Button onPress={()=>{navigation.navigate('Cadastro2', {credencial})}}>
                Próximo
            </Button>
          </ScrollView>
        </View>

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
    label:{
      fontSize:14,
      marginLeft:60
    },
    input:{
        width:'70%',
        height:50,
        borderRadius:10,
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        borderWidth: 1,
        alignSelf:'center',
        flexDirection:'row',
        shadowColor:'#fff',
        shadowOffset:{
          width:2,
          height:2
        },
        shadowOpacity:0.9,
        shadowRadius:2
    },
    halfInput:{
      width:'70%',
      height:50,
      borderRadius:10,
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:10,
      borderWidth: 1,
      alignSelf:'center',
      flexDirection:'row',
    },
    rowView:{
      flexDirection:'row',
      justifyContent:'center',
    },
    selectPicker:{
      width:'70%',
      height:60,
      alignSelf:'center',
      borderRadius:10,
      marginBottom:10,
      borderWidth: 1,
      color:'#fff',
      fontWeight:'bold',
      backgroundColor:'#D3D3D3'
    }



});
export default Cadastro;
