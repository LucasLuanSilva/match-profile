import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';
import { customStyles } from './styles';
import StepIndicator from 'react-native-step-indicator';

const Cadastro: React.FC = () => {
  const navigation = useNavigation();

  const [credencial, setCredencial] = useState({
    cpf: '',
    nome: '',
    sobrenome: '',
    email: '',
    rg: '',
    senha: '',
    confirmarSenha: '',
    estado_civil: '',
    cep: '',
    cidades_codigo_municipio: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: ''
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
      setCredencial({ ...credencial, [field]: value })
      // let isEnable = (credencial.empresas_id != '' && credencial.password != '')
      // setAccess(!isEnable)
    }

  }

  const changePosition = () => {
    setPosition(1)
    navigation.navigate('Cadastro2', { credencial })
  }

  return (
    <Container>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          stepCount={3}
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
        value={credencial.confirmarSenha}
        onChangeText={field('confirmarSenha')} />

      <View style={styles.containerButton}>
        <Button onPress={() => { changePosition() }}>
          Próximo
        </Button>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 45,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  stepIndicator: {
    marginVertical: 20
  },
  containerButton: {
    marginTop: 10
  }
});

export default Cadastro;
