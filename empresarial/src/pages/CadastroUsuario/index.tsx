import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';
import { customStyles } from './styles';
import StepIndicator from 'react-native-step-indicator';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';
import Estado from '../../functions/Estado';
import TextInputMask from 'react-native-text-input-mask';
import { getInfoCep } from '../../functions/ConsultaCep';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ListItem from '../../components/ListItem';
import Modal from "react-native-modal";

const CadastroUsuario: React.FC = () => {
  const navigation = useNavigation();

  interface ITelefone {
    ddd: string,
    numero: string,
    tipo: string,
    contato: string
  }

  const [usuario, setUsuario] = useState({
    cpf: '',
    nome: '',
    sobrenome: '',
    email: '',
    rg: '',
    senha: '',
    confirmarSenha: '',
    estado_civil: 0,
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

  const [estados] = useState(Estado.getEstados());

  const [estadoSelecionado, setEstadoSelecionado] = useState();

  const [telefones, setTelefones] = useState([]);

  const [telefone, setTelefone] = useState({
    id: 0,
    ddd: '',
    numero: '',
    tipo: 0,
    contato: ''
  });

  const setEstado = async (siglaEstado: any) => {
    setEstadoSelecionado(siglaEstado);

    await api.get('cidades/' + siglaEstado).then((response) => {
      setCidades(response.data);

      setUsuario({ ...usuario, ['cidades_codigo_municipio']: response.data[0].codigo_municipio });
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

      setUsuario({
        ...usuario,
        ['cidades_codigo_municipio']: ibge,
        ['logradouro']: logradouro,
        ['bairro']: bairro
      });
    }
  };

  const registrarUsuario = async () => {
    if (usuario.senha != usuario.confirmarSenha) {
      return Alert.alert("As senha estão diferentes !");
    }

    await api.post('empresariais/usuarios', { ...usuario, telefones }).then((response) => {
      Alert.alert("Cadastro realizado com sucesso !");
      navigation.navigate('Usuario');
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  }

  useEffect(() => {
    setEstado('SP');
  }, []);

  const Page1 = () => {
    return (
      <KeyboardAvoidingView behavior="position" enabled>
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
        <TextInputMask placeholder="Informe seu CPF"
          style={styles.input}
          value={usuario.cpf}
          onChangeText={(formatted, extracted) => {
            fieldMask(formatted, extracted, 'cpf');
          }}
          mask={"[000].[000].[000]-[00]"}
          keyboardType='numeric'
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
      </KeyboardAvoidingView>
    );
  }

  const Page2 = () => {
    return (
      <KeyboardAvoidingView behavior="position" enabled>
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
            selectedValue={usuario.cidades_codigo_municipio}
            onValueChange={(itemValue) =>
              setUsuario({ ...usuario, ['cidades_codigo_municipio']: itemValue })
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
          keyboardType='numeric'
          onEndEditing={() => consultaCep(usuario.cep)}
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
      </KeyboardAvoidingView>
    );
  }

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const incluirTelefone = () => {
    const { id, ddd, numero } = telefone;

    if (ddd.replace(/[^\d]+/g, '').length != 2) {
      return Alert.alert("Informe um número valido !");
    }

    if (
      numero.replace(/[^\d]+/g, '').length != 8 &&
      numero.replace(/[^\d]+/g, '').length != 9
    ) {
      return Alert.alert("Informe um número valido !");
    }

    if (telefone.id == 0) {
      telefone.id = telefones.length;

      setTelefones([...telefones, JSON.parse(JSON.stringify(telefone))]);
    } else {
      const idx = telefones.findIndex(tel => tel.id == id);
      telefones[idx] = JSON.parse(JSON.stringify(telefone));
    }

    setTelefone({
      ...telefone,
      ['id']: 0,
      ['ddd']: '',
      ['numero']: '',
      ['tipo']: 0,
      ['contato']: ''
    });

    toggleModal();
  }

  const deletarTelefone = (index) => {
    var copiaTelefones = JSON.parse(JSON.stringify(telefones));
    copiaTelefones.splice(index, 1);

    setTelefones(copiaTelefones);
  }

  const editarTelefone = (item) => {
    setTelefone(JSON.parse(JSON.stringify(item)));

    toggleModal();
  }

  const cancelarTelefone = () => {
    setTelefone({
      ...telefone,
      ['id']: 0,
      ['ddd']: '',
      ['numero']: '',
      ['tipo']: 0,
      ['contato']: ''
    });

    toggleModal();
  }

  const formataTelefone = (ddd: String, numero: String) => {
    let telefone = '(' + ddd + ') ';

    if (numero.length > 8) {
      telefone += numero.substring(0, 5) + '-' + numero.substring(5);
    } else {
      telefone += numero.substring(0, 4) + '-' + numero.substring(4);
    }

    return telefone;
  }

  const Page3 = () => {
    return (
      <KeyboardAvoidingView behavior="position" enabled>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => toggleModal()}
        >
          <View style={styles.modal}>
            <Text style={styles.label}>Tipo</Text>
            <View style={styles.selectPicker}>
              <Picker
                selectedValue={telefone.tipo}
                onValueChange={(itemValue) =>
                  setTelefone({ ...telefone, ['tipo']: itemValue })
                }
              >
                <Picker.Item label="Residencial" value="0" />
                <Picker.Item label="Pessoal" value="1" />
                <Picker.Item label="Contato" value="2" />
              </Picker>
            </View>

            <Text style={styles.label}>DDD</Text>
            <TextInputMask placeholder="DDD"
              style={styles.input}
              value={telefone.ddd}
              onChangeText={(formatted, extracted) => {
                setTelefone({ ...telefone, ['ddd']: extracted });
              }}
              mask={"[00]"}
              keyboardType='numeric'
            />

            <Text style={styles.label}>Número</Text>
            <TextInputMask placeholder="Número"
              style={styles.input}
              value={telefone.numero}
              onChangeText={(formatted, extracted) => {
                setTelefone({ ...telefone, ['numero']: extracted });
              }}
              mask={"[000000000]"}
              keyboardType='numeric'
            />

            <Text style={styles.label}>Contato</Text>
            <TextInput placeholder="Contato"
              style={styles.input}
              value={telefone.contato}
              onChangeText={(itemValue) => {
                setTelefone({ ...telefone, ['contato']: itemValue });
              }}
            />

            <View style={styles.containerButton}>
              <Button style={{ width: '49%', backgroundColor: 'red' }} onPress={() => { cancelarTelefone() }}>
                Cancelar
              </Button>
              <Button style={{ width: '49%', backgroundColor: 'green' }} onPress={() => { incluirTelefone() }}>
                Gravar
              </Button>
            </View>
          </View>
        </Modal>
        <Text style={styles.label}>Estado Civil</Text>
        <View style={styles.selectPicker}>
          <Picker
            selectedValue={usuario.estado_civil}
            onValueChange={(itemValue) =>
              setUsuario({ ...usuario, ['estado_civil']: itemValue })
            }
          >
            <Picker.Item label="Solteiro" value="0" />
            <Picker.Item label="Casado" value="1" />
            <Picker.Item label="Separado" value="2" />
            <Picker.Item label="Divorciado " value="3" />
            <Picker.Item label="Viúvo " value="4" />
          </Picker>
        </View>
        <Text style={styles.label}>Telefones</Text>
        <FlatList
          style={styles.listaTelefone}
          data={telefones}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              title={formataTelefone(item.ddd, item.numero)}
              subtitle={item.contato}
              handleRight={() => deletarTelefone(index)}
              onPress={() => editarTelefone(item)}
            />
          )}
          ItemSeparatorComponent={() => Separator()}
        />
        <View style={styles.containerButton}>
          <Button style={{ backgroundColor: 'green' }} onPress={async () => { toggleModal() }}>
            Incluir Telefone
          </Button>
        </View>

        <View style={styles.containerButton}>
          <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
            Voltar
          </Button>
          <Button style={{ width: '49%' }} onPress={async () => { await registrarUsuario() }}>
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
    <Container>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          stepCount={3}
        />
      </View>

      {CurrentPage()}

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

export default CadastroUsuario;
