import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { customStyles } from './styles';
import StepIndicator from 'react-native-step-indicator';
import api from '../../services/api';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../../components/ListItem';
import Modal from "react-native-modal";

const FormularioVaga: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [edita] = useState(typeof route.params.vaga != 'undefined');

  const [visualizar, setVisualizar] = useState(route.params.visualizar);

  const [vaga, setVaga] = useState(
    edita ?
      route.params.vaga
      :
      {
        id: 0,
        titulo: '',
        descricao: ''
      }
  );

  const [testes, setTestes] = useState([]);

  const [testesVinculados, setTestesVinculados] = useState([]);


  const field = (field) => {
    return (value) => {
      setVaga({ ...vaga, [field]: value });
    }
  };

  const [currentPosition, setPosition] = useState(0);

  const nextPosition = () => {
    console.log(vaga.titulo)
    if (vaga.titulo.trim().length == 0) {
      return Alert.alert("Informe um título para a vaga!");
    }

    setPosition(currentPosition + 1);
  }

  const backPosition = () => {
    setPosition(currentPosition - 1);
  }

  const CurrentPage = () => {
    if (currentPosition == 1) {
      return Page2();
    }

    return Page1();
  }

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const registrarUsuario = async () => {

    await api.post('empresariais/usuarios', { ...vaga, testes }).then((response) => {
      Alert.alert("Cadastro realizado com sucesso !");

      navigation.goBack();
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  }

  const atualizarUsuario = async () => {
    await api.put('empresariais/usuarios', vaga).then((response) => {
      Alert.alert("Usuário atualizado com sucesso !");
      navigation.goBack();
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  }

  const carregaTesteVinculados = async () => {
    await api.get('empresariais/vagas_testes/' + vaga.id).then((response) => {
      setTestesVinculados(response.data);
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  };

  useEffect(async () => {
    if (edita) {
      carregaTesteVinculados();
    }

    await api.get('empresariais/testes').then((response) => {
      setTestes(response.data);
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  }, []);

  const incluirTeste = async (teste) => {
    for (var i in testesVinculados) {
      if (testesVinculados[i].id == teste.id) {
        return Alert.alert('Este teste já foi vinculado!')
      }
    }

    if (vaga.id == 0) {
      setTestesVinculados([...testesVinculados, teste]);
    } else {
      await api.post('empresariais/vagas_testes', { testes_id: teste.id, testes_versao: teste.versao, vagas_id: vaga.id }).then((response) => {
        carregaTesteVinculados();
      }).catch((error) => {
        Alert.alert(error.response.data.message);
      });
    }

    toggleModal();
  }

  const deletarTeste = async (id, index) => {
    if (vaga.id != 0) {
      await api.delete('empresariais/vagas_testes/' + id).then((response) => {
        carregaTesteVinculados();
      }).catch((error) => {
        Alert.alert(error.response.data.message);
      });
    } else {
      var copiaTestesVinculados = JSON.parse(JSON.stringify(testesVinculados));
      copiaTestesVinculados.splice(index, 1);

      setTestesVinculados(copiaTestesVinculados);
    }
  }

  const Page1 = () => {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          style={{ marginHorizontal: "8%" }}
        >
          <Text style={styles.label}>Título</Text>
          <TextInput placeholder="Informe um título"
            style={styles.input}
            value={vaga.titulo}
            onChangeText={field('titulo')}
            editable={!visualizar}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput placeholder="Informe uma descrição"
            multiline={true}
            numberOfLines={4}
            style={styles.inputArea}
            value={vaga.descricao}
            onChangeText={field('descricao')}
            editable={!visualizar}
          />

          <View style={styles.containerButton}>
            <Button onPress={() => { nextPosition() }}>
              Próximo
            </Button>
          </View>
          {
            visualizar ?
              <View style={styles.containerButton}>
                <Button onPress={() => { setVisualizar(false) }}>
                  Editar Informações
                </Button>
              </View>
              :
              undefined
          }
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  const modalTestesVinculados = () => {
    return (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => toggleModal()}
      >
        <View style={styles.modal}>
          <Text style={{ fontSize: 16, color: '#3B55E6', marginVertical: 6, fontWeight: 'bold' }}>Selecionar Testes</Text>
          <FlatList
            style={styles.listaTestesModal}
            data={testes}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <ListItem
                title={item.titulo}
                onPress={() => incluirTeste(item)}
                containerStyle={styles.containerListItem}
              />
            )}
            ItemSeparatorComponent={() => Separator()}
          />

          <View style={styles.containerButton}>
            <Button style={{ backgroundColor: 'red' }} onPress={() => { toggleModal() }}>
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>
    )
  }

  const Page2 = () => {
    return (
      <KeyboardAvoidingView
        style={{ marginHorizontal: "8%" }}
      >
        {modalTestesVinculados()}

        <Text style={styles.label}>Testes Vinculados</Text>
        <FlatList
          style={styles.listaTestes}
          data={testesVinculados}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              title={item.titulo}
              handleRight={!visualizar ? () => deletarTeste(item.id, index) : undefined}
            />
          )}
          ItemSeparatorComponent={() => Separator()}
        />

        {
          visualizar ?
            <View>
              <View style={styles.containerButton}>
                <Button onPress={() => { backPosition() }}>
                  Voltar
                </Button>
                <Button onPress={() => { setVisualizar(false) }}>
                  Editar Informações
                </Button>
              </View>
            </View>
            :
            <View>
              <View style={styles.containerButton}>
                <Button style={{ backgroundColor: 'green' }} onPress={async () => { toggleModal() }}>
                  Incluir Teste
                </Button>
              </View>

              <View style={styles.containerButton}>
                <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
                  Voltar
                </Button>
                <Button style={{ width: '49%' }} onPress={async () => {
                  vaga.id != 0 ? await atualizarUsuario() : await registrarUsuario()
                }}>
                  Finalizar
                </Button>
              </View>
            </View>
        }
      </KeyboardAvoidingView>
    );
  }

  return (
    <View>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          stepCount={2}
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
  inputArea: {
    width: '100%',
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
  listaTestes: {
    maxHeight: '70%',
    minHeight: '70%',
  },
  listaTestesModal: {
    maxHeight: '85%',
    minHeight: '85%',
  },
  modal: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  containerListItem: {
    borderBottomColor: 'black',
    borderWidth: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 0.5,
  },
});

export default FormularioVaga;
