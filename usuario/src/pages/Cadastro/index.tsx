import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Container } from './styles';
import { customStyles } from './styles';
import StepIndicator from 'react-native-step-indicator';
import api from '../../services/api';
import { Picker } from '@react-native-picker/picker'
import ListItem from '../../components/ListItem'
import Estado from '../../functions/Estado';
import Modal from "react-native-modal";
import TextInputMask from 'react-native-text-input-mask';

const Cadastro: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const edita = typeof route.params != 'undefined';

  const [credencial, setCredencial] = useState(
    edita && typeof route.params.usuario != 'undefined'
      ?
      route.params.usuario
      :
      {
        id: "",
        cpf: "",
        nome: "",
        sobrenome: "",
        email: "",
        rg: "",
        senha: "",
        cep: "",
        cidades_codigo_municipio: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        confirmaSenha: "",
        estado_civil: 0
      }
  );

  const field = (field) => {
    return (value) => {
      setCredencial({ ...credencial, [field]: value })
    }
  }

  const listaTelefones = async () => {
    await api.get('telefones').then(
      (response) => {
        setTelefones(response.data);
      }
    ).catch(
      (error) => {
        Alert.alert(error.response.data.error);
        console.log(error)
      }
    );
  }

  useEffect(async () => {
    if (credencial.id != '') {
      await listaTelefones();
    }

    setEstado('SP');
  }, []);

  const setEstado = async (siglaEstado: any) => {
    setEstadoSelecionado(siglaEstado);

    await api.get('cidades/' + siglaEstado).then((response) => {
      setCidades(response.data);
      setCredencial({ ...credencial, ['cidades_codigo_municipio']: response.data[0].codigo_municipio });
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  }

  const [cidades, setCidades] = useState([]);

  const [estados] = useState(Estado.getEstados());

  const [estadoSelecionado, setEstadoSelecionado] = useState([]);

  const [currentPosition, setPosition] = useState(0);

  const changePosition = () => {
    setPosition(currentPosition + 1);
  }

  const [isModalVisibleTel, setModalVisibleTel] = useState(false);

  const toggleModalTel = () => {
    setModalVisibleTel(!isModalVisibleTel);
  };

  const register = async () => {
    if (credencial.senha != credencial.confirmaSenha) {
      Alert.alert("Senha não confere")
      return
    }

    if (credencial.id == "") {
      console.log({ ...credencial, telefones })
      await api.post('usuarios', { ...credencial, telefones }).then(
        (response) => {
          Alert.alert("Cadastro efetuado com sucesso!");
          navigation.goBack();
        }
      ).catch(
        (error) => {
          Alert.alert(error.response.data.message);
        }
      );
    } else {
      await api.put('usuarios', credencial).then(
        (response) => {
          Alert.alert("Operação realizada com sucesso!");
          navigation.goBack();
        }
      ).catch(
        (error) => {
          Alert.alert(error.response.data.message);
        }
      );
    }
  }
  const [telefones, setTelefones] = useState([]);

  const [telefone, setTelefone] = useState({
    id: '',
    ddd: '',
    numero: '',
    tipo: 0,
    contato: ''
  });

  const deletarTelefone = async (index, id) => {
    var copiaTelefones = JSON.parse(JSON.stringify(telefones));
    copiaTelefones.splice(index, 1);
    setTelefones(copiaTelefones);

    if (credencial.id != '') {
      await api.delete('telefones/' + id).then(
        (response) => {
          Alert.alert("Telefone excluído com sucesso!");
        }
      ).catch(
        (error) => {
          Alert.alert(error.response.data.error);
          console.log(error)
        }
      );
    }
  }

  const backPosition = () => {
    setPosition(currentPosition - 1);
  }

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  const formataTelefone = (ddd: String, numero: String) => {
    let telefone = '(' + ddd + ') ';

    if (numero.length > 8) {
      telefone += numero.substring(0, 5) + '-' + numero.substring(5);
    } else {
      telefone += numero.substring(0, 4) + '-' + numero.substring(4);
    }

    return telefone;
  }

  const incluirTelefone = async () => {
    const { numero } = telefone;
    let fone = numero.replace(/[^a-z0-9]/gi, '')
    telefone.ddd = fone.substr(0, 2);
    telefone.numero = fone.substr(2);

    if (telefone.numero.length < 8) {
      return alert("Informe um número valido !");
    }

    if (credencial.id == "") {
      if (telefone.id == '') {
        telefone.id = String(telefones.length);
        setTelefones([...telefones, JSON.parse(JSON.stringify(telefone))]);

        toggleModalTel();
      } else {
        const idx = telefones.findIndex(tel => tel.id == telefone.id);
        telefones[idx] = JSON.parse(JSON.stringify(telefone));

        toggleModalTel();
      }

      telefone.id = '';
      telefone.ddd = '';
      telefone.numero = '';
      telefone.tipo = 0;
      telefone.contato = '';
    } else {
      if (telefone.id == '') {
        await api.post('telefones', telefone).then(
          (response) => {
            telefone.id = response.data.id;

            listaTelefones()
            Alert.alert("Telefone salvo com sucesso!");
            toggleModalTel();
            telefone.id = ''
            telefone.ddd = ''
            telefone.numero = ''
            telefone.tipo = 0
            telefone.contato = ''
          }
        ).catch(
          (error) => {
            Alert.alert(error.response.data.error);
          }
        );
      } else {
        await api.put('telefones', telefone).then(
          (response) => {
            Alert.alert("Telefone salvo com sucesso!");
            toggleModalTel();
            telefone.id = ''
            telefone.ddd = ''
            telefone.numero = ''
            telefone.tipo = 0
            telefone.contato = ''
            listaTelefones()
          }
        ).catch(
          (error) => {
            Alert.alert(error.response.data.error);
            console.log(error)
          }
        );
      }
    }
  }

  const editarTelefone = (tel) => {
    tel.numero = tel.ddd + tel.numero
    setTelefone(JSON.parse(JSON.stringify(tel)));
    toggleModalTel();
  }

  const CurrentPage = () => {
    if (currentPosition == 1) {
      return Page2()
    } else if (currentPosition == 2) {
      return Page3()
    }
    return Page1()
  }

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
            value={credencial.confirmaSenha}
            onChangeText={field('confirmaSenha')} />

          <View style={styles.containerButton}>
            <Button onPress={async () => { changePosition() }}>
              Próximo
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
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
          <View style={styles.containerButton}>
            <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
              Voltar
            </Button>
            <Button style={{ width: '49%' }} onPress={async () => { changePosition() }}>
              Próximo
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
  const Page3 = () => {
    return (
      <Container>

        <Modal isVisible={isModalVisibleTel}>
          <View style={styles.modal}>
            <Text style={styles.label}>Tipo</Text>
            <View style={styles.selectPicker}>
              <Picker
                selectedValue={telefone.tipo}
                onValueChange={(itemValue, itemIndex) =>
                  setTelefone({ ...telefone, ['tipo']: itemValue })
                }
              >
                <Picker.Item key={0} value={0} label="Residencial" />
                <Picker.Item key={1} value={1} label="Pessoal" />
                <Picker.Item key={2} value={2} label="Contato" />
              </Picker>
            </View>
            <Text style={styles.label}>Número</Text>
            <TextInputMask placeholder="Número"
              style={styles.input}
              value={telefone.numero}
              onChangeText={(formatted, extracted) => {
                setTelefone({ ...telefone, ['numero']: formatted });
              }}
              mask={"([00])[000000000]"}
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
              <Button style={{ width: '49%', backgroundColor: 'red' }} onPress={() => { toggleModalTel() }}>
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
            key="estado_civil"
            selectedValue={credencial.estado_civil}
            onValueChange={(itemValue) =>
              setCredencial({ ...credencial, ['estado_civil']: itemValue })
            }
          >
            <Picker.Item key={0} label="Solteiro" value={0} />
            <Picker.Item key={1} label="Casado" value={1} />
            <Picker.Item key={2} label="Separado" value={2} />
            <Picker.Item key={3} label="Divorciado " value={3} />
            <Picker.Item key={4} label="Viúvo " value={4} />
          </Picker>
        </View>

        <Text style={styles.label}>Telefones</Text>
        <FlatList
          style={styles.listaTelefone}
          data={telefones}
          // keyExtractor={item => item.id}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item, index }) => (
            <ListItem
              title={formataTelefone(item.ddd, item.numero)}
              subtitle={item.contato}
              handleRight={() => deletarTelefone(index, item.id)}
              onPress={() => editarTelefone(item)}
            />
          )}
          ItemSeparatorComponent={() => Separator()}
        />
        <View style={styles.containerButton}>
          <Button style={{ backgroundColor: 'green' }} onPress={async () => { toggleModalTel() }}>
            Incluir Telefone
          </Button>
        </View>
        <View style={styles.containerButton}>
          <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
            Voltar
          </Button>
          <Button style={{ width: '49%' }} onPress={async () => { register() }}>
            Finalizar
          </Button>
        </View>
      </Container>
    )
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
  title: {
    marginTop: 100,
    marginLeft: '15%',
    marginBottom: 20,
    alignItems: 'flex-start'
  },
  label: {
    fontSize: 14
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
  selectPicker: {
    height: 45,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  containerButton: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
export default Cadastro;

