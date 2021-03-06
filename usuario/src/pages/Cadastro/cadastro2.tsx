import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation, useRoute  } from '@react-navigation/native';
import api from '../../services/api';
import { Picker } from '@react-native-picker/picker'
import { customStyles } from './styles';
import StepIndicator from 'react-native-step-indicator';
import Estado from '../../functions/Estado';


const Cadastro2: React.FC =()=> {
    const navigation = useNavigation();
    const route = useRoute();
    const dados = route.params.credencial;

    useEffect(() => {
      setEstado('SP');
    }, []);

    const [credencial, setCredencial] = useState({

      empresas_id:dados.empresa_id,
      cpf: dados.cpf,
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      email: dados.email,
      rg: dados.rg,
      senha: dados.senha,

      cep: "",
      cidades_codigo_municipio: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: ""
    })
    
    const setEstado = async (siglaEstado: any) => {
      setEstadoSelecionado(siglaEstado);
  
      await api.get('cidades/' + siglaEstado).then((response) => {
        setCidades(response.data);
        setCredencial({ ...credencial, ['cidades_codigo_municipio']: response.data[0].codigo_municipio });
      }).catch((error) => {
        console.log(error)
        Alert.alert(error.response.data.error);
      });
    }
  
    const [cidades, setCidades] = useState([]);

    const [estados] = useState(Estado.getEstados());

    const [estadoSelecionado, setEstadoSelecionado] = useState([]);

    const [currentPosition, setPosition] = useState(1);

    const field = (field) => {
        return (value) => {
            setCredencial({...credencial, [field]: value })
        }

    }

    const register = async() => {
      console.log(credencial)
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
            <View style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={currentPosition}
                    stepCount={2}
                />
              </View>
            <Text style={styles.label}>Estado</Text>
            <View style={styles.selectPicker}>
              <Picker
                selectedValue={estadoSelecionado}
                onValueChange={(itemValue) =>
                  setEstado(itemValue)
                }>
                {
                  estados.map(estado => {
                    return <Picker.Item key={estado.sigla} label={estado.nome} value={estado.sigla} />
                  })
                }
              </Picker>
            </View>
            <Text style={styles.label}>Cidade</Text>
            <View style={styles.selectPicker}>
              <Picker
                key="codigo_municipio"
                selectedValue={credencial.cidades_codigo_municipio}
                onValueChange={(itemValue) =>
                  setCredencial({ ...credencial, ['cidades_codigo_municipio']: itemValue })
                }>
                {
                  cidades.map(cid => {
                    return <Picker.Item key={cid.codigo_municipio} label={cid.nome} value={cid.codigo_municipio} />
                  })
                }
              </Picker>
            </View>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput placeholder="Logradouro"
                        style={styles.input}
                        value={credencial.logradouro}
                        onChangeText={field('logradouro')} />
            <Text style={styles.label}>Numero</Text>
            <TextInput placeholder="Numero"
                        style={styles.input}
                        value={credencial.numero}
                        onChangeText={field('numero')} />
            <Text style={styles.label}>CEP</Text>
            <TextInput placeholder="CEP"
                        style={styles.input}
                        value={credencial.cep}
                        onChangeText={field('cep')} />
            <Text style={styles.label}>Complemento</Text>
            <TextInput placeholder="Complemento"
                        style={styles.input}
                        value={credencial.complemento}
                        onChangeText={field('complemento')} />
            <Text style={styles.label}>Bairro</Text>
            <TextInput placeholder="Bairro"
                        style={styles.input}
                        value={credencial.bairro}
                        onChangeText={field('bairro')} />
            <View style={styles.viewButton}>
              <Button onPress={()=>{register()}}>
                  Cadastrar
              </Button>
            </View>
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
      marginLeft:"8%"
    },
    input:{
      width:'84%',
      height:50,
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
    selectPicker:{
      width:'84%',
      height:50,
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
