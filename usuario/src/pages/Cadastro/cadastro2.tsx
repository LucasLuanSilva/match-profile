import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation, useRoute  } from '@react-navigation/native';
import api from '../../services/api';
import { Picker } from '@react-native-picker/picker'

const Cadastro2: React.FC =()=> {
    const navigation = useNavigation();
    const route = useRoute();
    const dados = route.params.credencial;

    const [credencial, setCredencial] = useState({

      empresas_id:dados.empresa_id,
      cpf: dados.cpf,
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      email: dados.email,
      rg: dados.rg,
      senha: dados.senha,

      cep: "20230000",
      cidades_codigo_municipio: "3550308",
      logradouro: "Teste rua",
      numero: "111",
      complemento: "2C ",
      bairro: "Santa Gertrudes"
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
    const [estado, setEstado] = useState([
      {
        codigo_estado: "1",
        nome: "São Paulo",
        sigla: "SP"
      },
      {
        codigo_estado: "2",
        nome: "Rio de Janeiro",
        uf: "RJ"
      },
      {
        codigo_estado: "3",
        nome: "Minas Gerais",
        uf: "MG"
      },
    ]);
    const [estadoSelecionado, setEstadoSelecionado] = useState([]);

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
            <Text style={styles.label}>Estado</Text>
            <Picker
              selectedValue={estadoSelecionado}
              style={styles.selectPicker}
              onValueChange={(itemValue)=>
              setEstadoSelecionado(itemValue)
            }>
              {
                estado.map(est =>{
                  return <Picker.Item key={est.codigo_estado} label={est.nome} value={est.codigo_estado}/>
                })
              }
            </Picker>
            <Text style={styles.label}>Cidade</Text>
            <Picker
              selectedValue={cidadeSelecionada}
              style={styles.selectPicker}
              onValueChange={(itemValue)=>
              setCidadeSelecionada(itemValue)
            }>
              {
                cidade.map(cid =>{
                  return <Picker.Item key={cid.codigo_municipio} label={cid.nome} value={cid.codigo_municipio}/>
                })
              }
            </Picker>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput placeholder="Logradouro"
                        style={styles.input}
                        value={credencial.logradouro}
                        onChangeText={field('logradouro')} />
            <View style={styles.rowView} >
              <View>
                <Text style={styles.label}>Numero</Text>
                <TextInput placeholder="Numero"
                            style={styles.halfInput}
                            value={credencial.numero}
                            onChangeText={field('numero')} />
              </View>
              <View>
                <Text style={styles.label}>CEP</Text>
                <TextInput placeholder="CEP"
                            style={styles.halfInput}
                            value={credencial.cep}
                            onChangeText={field('cep')} />
              </View>
            </View>
            <TextInput placeholder="Complemento"
                        style={styles.input}
                        value={credencial.complemento}
                        onChangeText={field('complemento')} />
            <TextInput placeholder="Bairro"
                        style={styles.input}
                        value={credencial.bairro}
                        onChangeText={field('bairro')} />
            <Button onPress={()=>{register()}}>
                Cadastrar
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
      fontSize:14
    },
    input:{
        width:'70%',
        height:40,
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
      width:'35%',
      height:60,
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
export default Cadastro2;
