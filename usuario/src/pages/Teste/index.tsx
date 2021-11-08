import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Text, TouchableOpacity } from 'react-native';
import { customStyles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
import ListItem from '../../components/ListItem';
import api from '../../services/api';
import Button from '../../components/Button';
import Modal from "react-native-modal";

const Teste: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const testeAtribuido = useState(route.params.item);

  const [questoes, setQuestoes] = useState([
    {
      pergunta: '',
      respostas: [
        {
          id: 0,
          resposta: "",
          nivel: 0,
          testes_atribuidos_id: "",
          questoes_id: "",
          respostas_id: "",
        }]
    }]);

  const [isModalVisible, setModalVisible] = useState(false);

  const [currentPosition, setPosition] = useState(0);

  const [currentAnswer, setAnswer] = useState(0);

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  const getQuestoes = async () => {
    await api.get("questoes", {
      params: {
        testes_id: testeAtribuido[0].testes_id,
        testes_versao: testeAtribuido[0].testes_versao
      }
    }).then(res => {
      const questoes = res.data;
      for (var i in questoes) {
        let resp = questoes[i].respostas
        for (var j in resp) {
          questoes[i].respostas[j].respostas_id = resp[j].id
        }
      }

      setQuestoes(questoes)
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  };

  const getRespostasPreenchidas = async () => {
    await api.get("respostas_preenchidas", {
      params: {
        testes_atribuidos_id: testeAtribuido[0].id,
        testes_id: testeAtribuido[0].testes_id,
        testes_versao: testeAtribuido[0].testes_versao
      }
    }).then(res => {
      const questoes = res.data;
      console.log("questoes")

      setQuestoes(questoes)
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  }

  const toggleModal = () => {
    if (testeAtribuido[0].respondido == 1)
      return;

    setModalVisible(!isModalVisible);
  };

  useEffect(async () => {
    if (testeAtribuido[0].respondido == 1) {
      console.log('uno')
      await getRespostasPreenchidas();
    } else {
      await getQuestoes();
    }
  }, []);

  const nextPosition = async () => {
    if (currentPosition < questoes.length - 1) {
      if (testeAtribuido[0].teste.tipo == 1) {
        for (let i = 0; i < 4; i++) {
          if (questoes[currentPosition].respostas[i].nivel == 0) {
            Alert.alert("Favor preencher todas as respostas")
            return
          }
          for (let j = 0; j < 4; j++) {
            if ((questoes[currentPosition].respostas[i].nivel == questoes[currentPosition].respostas[j].nivel) && (i != j)) {
              Alert.alert("Favor não inserir valores iguais")
              return
            }
          }
        }
      } else {
        if (questoes[currentPosition].respostas.findIndex(({ selecionada }) => selecionada == true) == -1) {
          return Alert.alert("Selecione uma resposta");
        }
      }

      setPosition(currentPosition + 1);
    } else {
      gravarRespostas();
    }
  }

  const gravarRespostas = async () => {
    if (testeAtribuido[0].respondido == 1) {
      if (testeAtribuido[0].teste.tipo == 1) {
        const resultadoDISC = calculaResultadoDISC();

        Alert.alert("Seu perfil é " + resultadoDISC + " !");
      } else {
        Alert.alert("Teste já respondido !");
      }

      return;
    }

    let respostas = [];

    if (testeAtribuido[0].teste.tipo == 1) {
      for (var i in questoes) {
        respostas = respostas.concat(questoes[i].respostas);
      }
    } else {
      for (var i in questoes) {
        for (var j in questoes[i].respostas) {
          if (questoes[i].respostas[j].selecionada) {
            respostas.push(questoes[i].respostas[j]);
          }
        }
      }
    }

    await api.post('respostas_preenchidas', { testes_atribuidos_id: testeAtribuido[0].id, respostas }).then(
      (response) => {
        navigation.goBack();

        Alert.alert(response.data);
      }
    ).catch(
      (error) => {
        Alert.alert(error.response.data.message);
        return
      }
    );
  }

  const calculaResultadoDISC = () => {
    let Dominante = 0;
    let Influente = 0;
    let Estavel = 0;
    let Cauteloso = 0;

    for (var i in questoes) {
      for (var j in questoes[i].respostas) {
        let index = questoes[i].respostas[j].perfil;

        switch (index) {
          case 0:
            Dominante += questoes[i].respostas[j].nivel;
            break;
          case 1:
            Influente += questoes[i].respostas[j].nivel;
            break;
          case 2:
            Estavel += questoes[i].respostas[j].nivel;
            break;
          case 3:
            Cauteloso += questoes[i].respostas[j].nivel;
            break;
        }
      }
    }

    let valores = [];
    let perfil = "";
    valores.push(Dominante);
    valores.push(Influente);
    valores.push(Estavel);
    valores.push(Cauteloso);

    let valor = valores.indexOf(Math.max(...valores));
    switch (valor) {
      case 0:
        perfil = "Dominante";
        break;
      case 1:
        perfil = "Influente";
        break;
      case 2:
        perfil = "Estavel";
        break;
      case 3:
        perfil = "Cauteloso";
        break;
      default:
        perfil = "Indefinido";
        break;
    }

    return perfil;
  }

  const backPosition = () => {
    setPosition(currentPosition - 1);
  }

  const escolheAlternativa = (index) => {
    toggleModal()
    setAnswer(index)
  }

  const escolheNota = (value) => {
    questoes[currentPosition].respostas[currentAnswer].nivel = value;

    toggleModal();
  }

  const marcarResposta = (resposta) => {
    if (testeAtribuido[0].respondido == 1)
      return;

    if (typeof resposta.selecionada == 'undefined' || !resposta.selecionada) {
      resposta.selecionada = true;
    } else {
      resposta.selecionada = false;
    }

    setQuestoes([...questoes])
  }

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          stepCount={questoes.length}
        />
      </View>
      <Text style={styles.labelPergunta}>{questoes[currentPosition].pergunta}</Text>
      <Text style={styles.label}>Respostas</Text>
      <FlatList
        style={styles.listaRespostas}
        data={questoes[currentPosition].respostas}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          testeAtribuido[0].teste.tipo == 1 ?
            <ListItem
              title={item.resposta}
              subtitle={item.nivel}
              onPress={() => {
                escolheAlternativa(index);
              }}
            />
            :
            <ListItem
              title={item.resposta}
              subtitle={typeof item.selecionada != 'undefined' && item.selecionada ? 'Selecionada' : ''}
              onPress={() => {
                marcarResposta(item);
              }}
            />
        )}
        ItemSeparatorComponent={() => Separator()}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.botao1} onPress={() => { escolheNota(1) }} >
            <Text>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao2} onPress={() => { escolheNota(2) }} >
            <Text>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao3} onPress={() => { escolheNota(3) }} >
            <Text>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao4} onPress={() => { escolheNota(4) }} >
            <Text>4</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {
        (currentPosition == questoes.length - 1) ?
          <View style={styles.containerButton}>
            <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
              Voltar
            </Button>
            <Button style={{ width: '49%' }} onPress={() => { nextPosition() }}>
              Finalizar
            </Button>
          </View>
          :
          currentPosition == 0 ?
            <View style={styles.containerButton}>
              <Button onPress={() => { nextPosition() }}>
                Proxima
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

    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 10
  },
  labelPergunta: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
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
    maxWidth: "20%",
    height: 45,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  listaRespostas: {
    maxHeight: '60%',
    minHeight: '60%',
    maxWidth: "100%"
  },
  modal: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  },
  botao1: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 0.5,
  },
  botao2: {
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 0.5,
  },
  botao3: {
    backgroundColor: '#90EE90',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 0.5,
  },
  botao4: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 0.5,
  },
  container: {
    marginHorizontal: '8%'
  }
});

export default Teste;
