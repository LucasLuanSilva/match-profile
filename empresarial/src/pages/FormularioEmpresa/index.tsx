import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { customStyles } from './styles';
import StepIndicator from 'react-native-step-indicator';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';
import Estado from '../../functions/Estado';
import TextInputMask from 'react-native-text-input-mask';
import { getInfoCep } from '../../functions/ConsultaCep';
import dayjs from 'dayjs';

const FormularioEmpresa: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [empresa, setEmpresa] = useState({
    cnpj: '',
    razao_social: '',
    nome_fantasia: '',
    cep: '',
    cidades_codigo_municipio: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    site: '',
    cpf: '',
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const [currentPosition, setPosition] = useState(0);

  const field = (field) => {
    return (value) => {
      setEmpresa({ ...empresa, [field]: value });
    }
  };

  const fieldMask = (formatted, extracted, field) => {
    setEmpresa({ ...empresa, [field]: extracted });
  };

  const nextPosition = () => {
    setPosition(currentPosition + 1);
  }

  const backPosition = () => {
    setPosition(currentPosition - 1);
  }

  const [cidades, setCidades] = useState([]);

  const [estados] = useState(Estado.getEstados());

  const [estadoSelecionado, setEstadoSelecionado] = useState();

  const setEstado = async (siglaEstado: any) => {
    setEstadoSelecionado(siglaEstado);

    await api.get('cidades/' + siglaEstado).then((response) => {
      setCidades(response.data);

      setEmpresa({ ...empresa, ['cidades_codigo_municipio']: response.data[0].codigo_municipio });
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  }

  const consultaCep = async (cepBusca: string) => {
    if (cepBusca.length < 8)
      return;

    const {
      cep,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
      ibge
    } = await getInfoCep(cepBusca);

    if (cep != undefined) {
      await setEstado(uf);

      setEmpresa({
        ...empresa,
        ['cidades_codigo_municipio']: ibge,
        ['logradouro']: logradouro,
        ['bairro']: bairro
      });
    }
  };

  const criarEmpresa = async () => {
    if (empresa.senha != empresa.confirmarSenha) {
      return Alert.alert("As senha estão diferentes !");
    }

    await api.post('empresas', empresa).then((response) => {
      Alert.alert("Empresa criada com sucesso !\n\nO trial termina dia " + dayjs(response.data.data_termino_contrato).format('DD/MM/YYYY'));

      navigation.navigate('Login');
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  }

  useEffect(async () => {
    setEstado('SP');
  }, []);

  const Page1 = () => {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          keyboardVerticalOffset={40}
          enabled
          behavior="position"
          style={{ marginHorizontal: "8%" }}
        >
          <Text style={styles.label}>Nome</Text>
          <TextInput placeholder="Informe seu nome"
            style={styles.input}
            value={empresa.nome}
            onChangeText={field('nome')}
          />

          <Text style={styles.label}>Sobrenome</Text>
          <TextInput placeholder="Informe seu sobrenome"
            style={styles.input}
            value={empresa.sobrenome}
            onChangeText={field('sobrenome')}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput placeholder="Informe seu E-mail"
            style={styles.input}
            value={empresa.email}
            onChangeText={field('email')}
          />

          <Text style={styles.label}>CPF</Text>
          <TextInputMask placeholder="Informe seu CPF"
            style={styles.input}
            value={empresa.cpf}
            onChangeText={(formatted, extracted) => {
              fieldMask(formatted, extracted, 'cpf');
            }}
            mask={"[000].[000].[000]-[00]"}
            keyboardType='numeric'
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput placeholder="Informe sua Senha"
            style={styles.input}
            secureTextEntry={true}
            value={empresa.senha}
            onChangeText={field('senha')}
          />

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput placeholder="Confirme sua Senha"
            style={styles.input}
            secureTextEntry={true}
            value={empresa.confirmarSenha}
            onChangeText={field('confirmarSenha')}
          />

          <View style={styles.containerButton}>
            <Button onPress={() => { nextPosition() }}>
              Próximo
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  const Page2 = () => {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          keyboardVerticalOffset={40}
          enabled
          behavior="position"
          style={{ marginHorizontal: "8%" }}
        >
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
              selectedValue={empresa.cidades_codigo_municipio}
              onValueChange={(itemValue) =>
                setEmpresa({ ...empresa, ['cidades_codigo_municipio']: itemValue })
              }>
              {
                cidades.map(cid => {
                  return <Picker.Item key={cid.codigo_municipio} label={cid.nome} value={cid.codigo_municipio} />
                })
              }
            </Picker>
          </View>

          <Text style={styles.label}>CEP</Text>
          <TextInputMask placeholder="CEP"
            style={styles.input}
            value={empresa.cep}
            onChangeText={(formatted, extracted) => {
              fieldMask(formatted, extracted, 'cep');
            }}
            mask={"[00000]-[000]"}
            keyboardType='numeric'
            onEndEditing={() => consultaCep(empresa.cep)}
          />

          <Text style={styles.label}>Logradouro</Text>
          <TextInput placeholder="Logradouro"
            style={styles.input}
            value={empresa.logradouro}
            onChangeText={field('logradouro')}
          />

          <Text style={styles.label}>Número / Apto</Text>
          <TextInput placeholder="Numero"
            style={styles.input}
            value={empresa.numero}
            onChangeText={field('numero')}
          />

          <Text style={styles.label}>Complemento</Text>
          <TextInput placeholder="Complemento"
            style={styles.input}
            value={empresa.complemento}
            onChangeText={field('complemento')}
          />

          <Text style={styles.label}>Bairro</Text>
          <TextInput placeholder="Bairro"
            style={styles.input}
            value={empresa.bairro}
            onChangeText={field('bairro')}
          />

          <View style={styles.containerButton}>
            <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
              Voltar
            </Button>
            <Button style={{ width: '49%' }} onPress={() => { nextPosition() }}>
              Próximo
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  const Page3 = () => {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={40}
        enabled
        behavior="position"
        style={{ marginHorizontal: "8%" }}
      >
        <Text style={styles.label}>Razão Social</Text>
        <TextInput placeholder="Razão Social"
          style={styles.input}
          value={empresa.razao_social}
          onChangeText={field('razao_social')}
        />

        <Text style={styles.label}>Nome Fantasia</Text>
        <TextInput placeholder="Nome Fantasia"
          style={styles.input}
          value={empresa.nome_fantasia}
          onChangeText={field('nome_fantasia')}
        />

        <Text style={styles.label}>CNPJ</Text>
        <TextInputMask placeholder="CNPJ"
          style={styles.input}
          value={empresa.cnpj}
          onChangeText={(formatted, extracted) => {
            fieldMask(formatted, extracted, 'cnpj');
          }}
          mask={"[00].[000].[000]/[0000]-[00]"}
          keyboardType='numeric'
        />

        <Text style={styles.label}>Site</Text>
        <TextInput placeholder="Site"
          style={styles.input}
          value={empresa.site}
          onChangeText={field('site')}
        />

        <View style={styles.containerButton}>
          <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
            Voltar
          </Button>
          <Button style={{ width: '49%' }} onPress={async () => { await criarEmpresa() }}>
            Finalizar
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }

  const CurrentPage = () => {
    if (currentPosition == 1) {
      return Page2();
    } else if (currentPosition == 2) {
      return Page3();
    }

    return Page1();
  }

  return (
    <View>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          stepCount={3}
        />
      </View>

      {CurrentPage()}

    </View>
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
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  stepIndicator: {
    marginVertical: 20
  },
  containerButton: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectPicker: {
    height: 45,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  listaTelefone: {
    maxHeight: '58%',
    minHeight: '58%',
  },
  modal: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  }
});

export default FormularioEmpresa;
