import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';
import { customStyles } from './styles';
import StepIndicator from 'react-native-step-indicator';

const Cadastro: React.FC =()=> {
    const navigation = useNavigation();

    const [credencial, setCredencial] = useState({
        empresas_id:'d6cf0ba6-f803-428c-bed4-66f36c768ad5',
        cpf: "",
        nome: "",
        sobrenome: "",
        email: "",
        rg: "",
        senha: "",
    })
    const [access, setAccess] = useState(true)
    const [currentPosition, setPosition] = useState(0);
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


    const changePosition = () =>{
      // setPosition(1)
      navigation.navigate('Cadastro2', {credencial})
    }


    return(
        <View>
          {/* <Container> */}
            <ScrollView>
              <View style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={currentPosition}
                    stepCount={2}
                />
              </View>
              <Text style={styles.label}>Nome</Text>
              <TextInput placeholder="Informe seu nome"
                          style={styles.input}
                          value={credencial.nome}
                          onChangeText={field('nome')} />
              <Text style={styles.label}>Sobrenome</Text>
              <TextInput placeholder="Informe seu sobrenome"
                          style={styles.input}
                          value={credencial.sobrenome}
                          onChangeText={field('sobrenome')} />
              <Text style={styles.label}>E-mail</Text>
              <TextInput placeholder="Informe seu E-mail"
                          style={styles.input}
                          value={credencial.email}
                          onChangeText={field('email')} />
              <Text style={styles.label}>CPF</Text>
              <TextInput placeholder="Informe seu CPF"
                          style={styles.input}
                          value={credencial.cpf}
                          onChangeText={field('cpf')} />
              <Text style={styles.label}>RG</Text>
              <TextInput placeholder="Informe seu RG"
                          style={styles.input}
                          value={credencial.rg}
                          onChangeText={field('rg')} />
              <Text style={styles.label}>Senha</Text>
              <TextInput placeholder="Informe sua Senha"
                          style={styles.input}
                          secureTextEntry={true}
                          value={credencial.senha}
                          onChangeText={field('senha')} />
              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput placeholder="Confirme sua Senha"
                          style={styles.input}
                          secureTextEntry={true}
                          value={credencial.senha}
                          onChangeText={field('senha')} />
              <View style={styles.viewButton}>
                <Button onPress={()=>{changePosition()}}>
                    Próximo
                </Button>
              </View>
            </ScrollView>
          {/* </Container> */}
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
      marginLeft:"8%"
    },
    input:{
        width:'84%',
        height:50,
        marginHorizontal:10,
        borderRadius:10,
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        borderWidth: 1,
        borderColor:'#d3d3d3',
        alignSelf:'center',
        flexDirection:'row'
    },
    stepIndicator:{
      marginVertical:20
    },
    viewButton:{
      marginHorizontal:'10%',
      marginTop:20
    },
    rowView:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginHorizontal:10
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
