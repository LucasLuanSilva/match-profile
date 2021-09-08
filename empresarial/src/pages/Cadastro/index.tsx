import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { Picker } from '@react-native-picker/picker'

const Cadastro: React.FC = () => {
  const navigation = useNavigation();

  const [credencial, setCredencial] = useState({
    empresas_id: 'd6cf0ba6-f803-428c-bed4-66f36c768ad5',
    cpf: "57872931001",
    nome: "Carlos",
    sobrenome: "Silva",
    email: "teste@email.com",
    rg: "101010",
    senha: "1234",
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

  const field = (field) => {
    return (value) => {
      setCredencial({ ...credencial, [field]: value })
      // let isEnable = (credencial.empresas_id != '' && credencial.password != '')
      // setAccess(!isEnable)
    }

  }

  const register = async () => {
    console.log(api);
    await api.post('usuarios/empresariais', credencial).then(
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


  return (
    <View>
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.titletext}>Cadastro</Text>
        </View>
        <TextInput placeholder="Empresa"
          style={styles.input}
          value={credencial.empresas_id}
          onChangeText={field('empresas_id')} />
        <TextInput placeholder="E-mail"
          style={styles.input}
          value={credencial.email}
          onChangeText={field('email')} />
        <TextInput placeholder="CPF"
          style={styles.input}
          value={credencial.cpf}
          onChangeText={field('cpf')} />
        <TextInput placeholder="RG"
          style={styles.input}
          value={credencial.rg}
          onChangeText={field('rg')} />
        <TextInput placeholder="Nome"
          style={styles.input}
          value={credencial.nome}
          onChangeText={field('nome')} />
        <TextInput placeholder="Sobrenome"
          style={styles.input}
          value={credencial.sobrenome}
          onChangeText={field('sobrenome')} />
        <TextInput placeholder="Logradouro"
          style={styles.input}
          value={credencial.logradouro}
          onChangeText={field('logradouro')} />
        <TextInput placeholder="Numero"
          style={styles.input}
          value={credencial.numero}
          onChangeText={field('numero')} />
        <TextInput placeholder="Complemento"
          style={styles.input}
          value={credencial.complemento}
          onChangeText={field('complemento')} />
        <TextInput placeholder="Bairro"
          style={styles.input}
          value={credencial.bairro}
          onChangeText={field('bairro')} />
        <TextInput placeholder="CEP"
          style={styles.input}
          value={credencial.cep}
          onChangeText={field('cep')} />
        <Picker
          selectedValue={cidadeSelecionada}
          style={styles.selectPicker}
          onValueChange={(itemValue) =>
            setCidadeSelecionada(itemValue)
          }>
          {
            cidade.map(cid => {
              return <Picker.Item key={cid.codigo_municipio} label={cid.nome} value={cid.codigo_municipio} />
            })
          }
        </Picker>
        <TextInput placeholder="Senha"
          style={styles.input}
          secureTextEntry={true}
          value={credencial.senha}
          onChangeText={field('senha')} />
        <Button onPress={() => { register() }}>
          Cadastrar
        </Button>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 100,
    marginLeft: '15%',
    marginBottom: 20,
    alignItems: 'flex-start'
  },
  titletext: {
    fontWeight: 'bold',
    fontSize: 20
  },
  subtitletext: {
    fontSize: 16
  },
  input: {
    width: '70%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  selectPicker: {
    width: '70%',
    height: 60,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#D3D3D3'
  }



});
export default Cadastro;
