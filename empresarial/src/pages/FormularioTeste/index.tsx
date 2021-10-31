import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { customStyles } from './styles';
import StepIndicator from 'react-native-step-indicator';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../../components/ListItem';
import Modal from "react-native-modal";

const FormularioTeste: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [edita] = useState(typeof route.params.teste != 'undefined');

  const [visualizar, setVisualizar] = useState(route.params.visualizar)

  const [teste, setTeste] = useState(
    edita ?
      route.params.teste
      :
      {
        titulo: '',
        descricao: ''
      }
  );

  const [questoes, setQuestoes] = useState([{ pergunta: '', respostas: [] }]);
  const [indiceResposta, setIndiceResposta] = useState(-1);

  const [resposta, setResposta] = useState({
    ['id']: 0,
    resposta: '',
    correta: 0
  });

  const [currentPosition, setPosition] = useState(-1);

  const fieldTeste = (field) => {
    return (value) => {
      setTeste({ ...teste, [field]: value });
    }
  };

  const fieldQuestao = (field) => {
    return (value) => {
      questoes[currentPosition][field] = value;
      setQuestoes([...questoes]);
    }
  };

  const fieldResposta = (field) => {
    return (value) => {
      setResposta({ ...resposta, [field]: value });
    }
  };

  const nextPosition = () => {
    if (visualizar == false) {
      if (teste.titulo.trim().length == 0) {
        return Alert.alert('Informe um título valido!');
      }

      if ((currentPosition + 1) > (questoes.length - 1)) {
        if (questoes[currentPosition].pergunta.trim().length == 0) {
          return Alert.alert('Informe uma pergunta valida!');
        }

        if (questoes[currentPosition].respostas.length == 0) {
          return Alert.alert('Informe ao menos uma resposta!');
        }

        questoes.push({ pergunta: '', respostas: [] });
      }
    }

    setPosition(currentPosition + 1);
  }

  const backPosition = () => {
    setPosition(currentPosition - 1);
  }

  const registrarTeste = async () => {
    for (var i in questoes) {
      if (questoes[i].pergunta.trim().length == 0) {
        return Alert.alert('Informe uma pergunta valida!');
      }

      if (questoes[i].respostas.length == 0) {
        return Alert.alert('Informe ao menos uma resposta!');
      }
    }

    await api.post('empresariais/testes', { ...teste, questoes, situacao: 1 }).then((response) => {
      Alert.alert("Operação realizada com sucesso !");
      navigation.goBack();
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  }

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const deletarResposta = async (index) => {
    if (visualizar)
      return;

    var copiaRespostas = JSON.parse(JSON.stringify(questoes[currentPosition].respostas));
    copiaRespostas.splice(index, 1);

    for (var i in copiaRespostas) {
      copiaRespostas[i].id = i;
    }

    questoes[currentPosition].respostas = copiaRespostas;

    setQuestoes([...questoes]);
  }

  const editarResposta = (indice) => {
    if (visualizar)
      return;

    setIndiceResposta(indice);

    setResposta(JSON.parse(JSON.stringify(questoes[currentPosition].respostas[indice])));

    toggleModal();
  }

  const cancelarResposta = () => {
    setResposta({
      ...resposta,
      ['id']: 0,
      ['resposta']: '',
      ['correta']: 0
    });

    toggleModal();
  }

  const incluirResposta = () => {
    if (resposta.resposta.trim().length == 0) {
      return Alert.alert('Informe uma resposta!');
    }

    if (indiceResposta == -1) {
      resposta.id = questoes[currentPosition].respostas.length;

      questoes[currentPosition].respostas.push(JSON.parse(JSON.stringify(resposta)));
    } else {
      questoes[currentPosition].respostas[indiceResposta] = JSON.parse(JSON.stringify(resposta));
    }

    setIndiceResposta(-1);

    setResposta({
      ...resposta,
      ['id']: 0,
      ['resposta']: '',
      ['correta']: 0
    });

    toggleModal();
  }

  const removerQuestao = () => {
    var copiaQuestoes = JSON.parse(JSON.stringify(questoes));
    copiaQuestoes.splice(currentPosition, 1);

    backPosition();

    setQuestoes(copiaQuestoes);
  }

  useEffect(async () => {
    if (visualizar) {
      await api.get("empresariais/questoes", {
        params: {
          testes_id: teste.id,
          testes_versao: teste.versao
        }
      })
        .then(res => {
          const questoes = res.data;

          setQuestoes(questoes)
        });
    }
  }, [])

  useEffect(async () => {
    if (visualizar) {
      styles.listaRespostas = {
        maxHeight: '56%',
        minHeight: '56%'
      }
    } else {
      styles.listaRespostas = {
        maxHeight: '46%',
        minHeight: '46%'
      }
    }

    setQuestoes([...questoes]);
  }, [visualizar])

  const Page1 = () => {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          style={{ marginHorizontal: "8%", paddingTop: '10%' }}
        >
          <Text style={styles.label}>Título</Text>
          <TextInput placeholder="Informe um título"
            style={styles.input}
            value={teste.titulo}
            onChangeText={fieldTeste('titulo')}
            editable={!visualizar}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput placeholder="Informe uma descrição"
            multiline={true}
            numberOfLines={4}
            style={styles.inputDescricao}
            value={teste.descricao}
            onChangeText={fieldTeste('descricao')}
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
                <Button onPress={async () => { setVisualizar(false) }}>
                  Editar Informações
                </Button>
              </View>
              :
              null
          }

        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  const Page2 = () => {
    return (
      <KeyboardAvoidingView
        style={{ marginHorizontal: "8%" }}
      >
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => toggleModal()}
        >
          <View style={styles.modal}>

            <Text style={styles.label}>Resposta</Text>
            <TextInput placeholder="Resposta"
              style={styles.input}
              value={resposta.resposta}
              onChangeText={fieldResposta('resposta')}
            />

            <Text style={styles.label}>Correta</Text>
            <View style={styles.selectPicker}>
              <Picker
                key="correta"
                selectedValue={resposta.correta}
                onValueChange={fieldResposta('correta')}
              >
                <Picker.Item key={0} label="Não / Sem Correta" value={0} />
                <Picker.Item key={1} label="Sim" value={1} />
              </Picker>
            </View>

            <View style={styles.containerButton}>
              <Button style={{ width: '49%', backgroundColor: 'red' }} onPress={() => { cancelarResposta() }}>
                Cancelar
              </Button>
              <Button style={{ width: '49%', backgroundColor: 'green' }} onPress={() => { incluirResposta() }}>
                Gravar
              </Button>
            </View>

          </View>
        </Modal>

        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            stepCount={questoes.length}
          />
        </View>

        <Text style={styles.label}>Informe abaixo a pergunta</Text>
        <TextInput placeholder="Informe uma pergunta"
          style={styles.input}
          value={questoes[currentPosition].pergunta}
          onChangeText={fieldQuestao('pergunta')}
          editable={!visualizar}
        />

        <Text style={styles.label}>Respostas</Text>
        <FlatList
          style={styles.listaRespostas}
          data={questoes[currentPosition].respostas}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              title={item.resposta}
              subtitle={item.correta == 1 ? 'Correta' : undefined}
              handleRight={() => deletarResposta(index)}
              onPress={() => editarResposta(index)}
            />
          )}
          ItemSeparatorComponent={() => Separator()}
        />

        {
          visualizar ?
            null
            :
            <View style={styles.containerButton}>
              <Button style={{ backgroundColor: 'green' }} onPress={async () => { toggleModal() }}>
                Incluir Resposta
              </Button>
            </View>
        }

        {
          (visualizar == true && (questoes.length - 1) == currentPosition) ?
            <View style={styles.containerButton}>
              <Button onPress={() => { backPosition() }}>
                Voltar
              </Button>
            </View>
            :
            <View style={styles.containerButton}>
              <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
                Voltar
              </Button>
              <Button style={{ width: '49%' }} onPress={() => { nextPosition() }}>
                Proxima
              </Button>
            </View>
        }

        {
          visualizar ?
            null
            :
            currentPosition > 0 ?
              <View style={styles.containerButton}>
                <Button style={{ width: '49%', backgroundColor: 'red' }} onPress={async () => { removerQuestao() }}>
                  Remover Questão
                </Button>
                <Button style={{ width: '49%' }} onPress={async () => { await registrarTeste() }}>
                  Finalizar
                </Button>
              </View>
              :
              <View style={styles.containerButton}>
                <Button onPress={async () => { await registrarTeste() }}>
                  Finalizar
                </Button>
              </View>
        }

        {
          visualizar ?
            <View style={styles.containerButton}>
              <Button onPress={async () => { setVisualizar(false) }}>
                Editar Informações
              </Button>
            </View>
            :
            null
        }

      </KeyboardAvoidingView>
    );
  }

  const CurrentPage = () => {
    if (currentPosition > -1) {
      return Page2();
    }

    return Page1();
  }

  return (
    <View>

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
  inputDescricao: {
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
    justifyContent: 'space-between',
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
  listaRespostas: {
    maxHeight: '46%',
    minHeight: '46%',
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

export default FormularioTeste;
