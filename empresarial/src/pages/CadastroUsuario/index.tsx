import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';
import { customStyles } from './styles';
import StepIndicator from 'react-native-step-indicator';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';
import Estado from '../../functions/Estado';
import TextInputMask from 'react-native-text-input-mask';

const CadastroUsuario: React.FC = () => {
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState({
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
  });

  const [currentPosition, setPosition] = useState(0);

  const field = (field) => {
    return (value) => {
      setUsuario({ ...usuario, [field]: value });
    }
  };

  const fieldMask = (formatted, extracted, field) => {
    setUsuario({ ...usuario, [field]: extracted });
  };

  const nextPosition = () => {
    setPosition(currentPosition + 1);
  }

  const backPosition = () => {
    setPosition(currentPosition - 1);
  }

  const [cidades, setCidades] = useState([]);

  const [cidadeSelecionada, setCidadeSelecionada] = useState([]);

  const [estados] = useState(Estado.getEstados());

  const [estadoSelecionado, setEstadoSelecionado] = useState();

  const setEstado = async (siglaEstado: any) => {
    setEstadoSelecionado(siglaEstado);

    await api.get('cidades/' + siglaEstado).then((response) => {
      setCidades(response.data);

      setCidadeSelecionada(response.data[0]);
    }).catch((error) => {
      Alert.alert(error.response.data.error);
    });
  }

  const register = async () => {
    console.log(usuario);
    // await api.post('usuarios', usuario).then((response) => {
    //   Alert.alert("Cadastro efetuado com sucesso");
    //   navigation.navigate('Login');
    // }).catch((error) => {
    //   Alert.alert(error.response.data.error);
    // });
  }

  useEffect(() => {
    setEstado('SP');
  }, []);

  const Page1 = () => {
    return (
      <View>
        <Text style={styles.label}>Nome</Text>
        <TextInput placeholder="Informe seu nome"
          style={styles.input}
          value={usuario.nome}
          onChangeText={field('nome')}
        />

        <Text style={styles.label}>Sobrenome</Text>
        <TextInput placeholder="Informe seu sobrenome"
          style={styles.input}
          value={usuario.sobrenome}
          onChangeText={field('sobrenome')}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput placeholder="Informe seu E-mail"
          style={styles.input}
          value={usuario.email}
          onChangeText={field('email')}
        />

        <Text style={styles.label}>CPF</Text>
        <TextInput placeholder="Informe seu CPF"
          style={styles.input}
          value={usuario.cpf}
          onChangeText={field('cpf')}
        />

        <Text style={styles.label}>RG</Text>
        <TextInput placeholder="Informe seu RG"
          style={styles.input}
          value={usuario.rg}
          onChangeText={field('rg')}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput placeholder="Informe sua Senha"
          style={styles.input}
          secureTextEntry={true}
          value={usuario.senha}
          onChangeText={field('senha')}
        />

        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput placeholder="Confirme sua Senha"
          style={styles.input}
          secureTextEntry={true}
          value={usuario.confirmarSenha}
          onChangeText={field('confirmarSenha')}
        />

        <View style={styles.containerButton}>
          <Button onPress={() => { nextPosition() }}>
            Próximo
          </Button>
        </View>
      </View>
    );
  }

  const Page2 = () => {
    return (
      <View>
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
            selectedValue={cidadeSelecionada}
            onValueChange={(itemValue) =>
              setCidadeSelecionada(itemValue)
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
          value={usuario.cep}
          onChangeText={(formatted, extracted) => {
            fieldMask(formatted, extracted, 'cep');
          }}
          mask={"[00000]-[000]"}
        />

        <Text style={styles.label}>Logradouro</Text>
        <TextInput placeholder="Logradouro"
          style={styles.input}
          value={usuario.logradouro}
          onChangeText={field('logradouro')}
        />

        <Text style={styles.label}>Número / Apto</Text>
        <TextInput placeholder="Numero"
          style={styles.input}
          value={usuario.numero}
          onChangeText={field('numero')}
        />

        <Text style={styles.label}>Complemento</Text>
        <TextInput placeholder="Complemento"
          style={styles.input}
          value={usuario.complemento}
          onChangeText={field('complemento')}
        />

        <Text style={styles.label}>Bairro</Text>
        <TextInput placeholder="Bairro"
          style={styles.input}
          value={usuario.bairro}
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
      </View>
    );
  }

  const Page3 = () => {
    return (
      <View>
        <View style={styles.containerButton}>
          <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
            Voltar
          </Button>
          <Button style={{ width: '49%' }} onPress={async () => { await register() }}>
            Finalizar
          </Button>
        </View>
      </View>
    );
  }

  const CurrentPage = () => {
    if (currentPosition == 1) {
      return <Page2 />
    } else if (currentPosition == 2) {
      return <Page3 />
    }

    return <Page1 />
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

      <CurrentPage />

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
    justifyContent: 'center'
  }
});

export default CadastroUsuario;
