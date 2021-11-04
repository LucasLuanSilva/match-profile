import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Text, TouchableOpacity } from 'react-native';
import { customStyles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
import ListItem from '../../components/ListItem';
import api from '../../services/api';
import Button from '../../components/Button';
import { Picker } from '@react-native-picker/picker'
import Modal from "react-native-modal";

const Teste: React.FC = () => {

  const navigation = useNavigation();
  const [load, setLoad] = useState(true)
  const route = useRoute();
  const dados = useState(route.params.item);

  const [questoes, setQuestoes] = useState([
    { pergunta: '', 
      respostas: [
        {id: 0, 
        resposta: "",
        nivel:0
    }] 
  }]);

  const [perguntas, setPerguntas] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  const [currentPosition, setPosition] = useState(0);

  const [currentAnswer, setAnswer] = useState(0);

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  const getTeste = async () => {
    await api.get("questoes", {
      params: {
        testes_id: dados[0].testes_id,
        testes_versao:dados[0].testes_versao
      }
    }).then(res => {
        const questoes = res.data;
        setQuestoes(questoes)
      }).catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(async () => {
    await getTeste()
    let p = []
    for(var i in questoes){
      p.push(questoes[i].pergunta)
    }
    setPerguntas(p);
    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

  const nextPosition = () => {
    if(currentPosition < questoes.length -1){
      for(let i = 0; i < 4; i++){
        if(questoes[currentPosition].respostas[i].nivel == 0){
          Alert.alert("Favor preencher todas as respostas")
          return
        }
        for(let j = 0; j < 4; j++){
          if((questoes[currentPosition].respostas[i].nivel == questoes[currentPosition].respostas[j].nivel)&&( i != j)){
            Alert.alert("Favor não inserir valores iguais")
            return
          }
        }
      }
      setPosition(currentPosition + 1);
    }else{
      
      let Dominante = 0;
      let Influente = 0;
      let Estavel = 0;
      let Cauteloso = 0;
    for(let i = 0; i < questoes.length; i++){
        Dominante += questoes[i].respostas[0].nivel
        Influente += questoes[i].respostas[1].nivel
        Estavel += questoes[i].respostas[2].nivel
        Cauteloso += questoes[i].respostas[3].nivel
      }
      console.log(Dominante)
      console.log(Influente)
      console.log(Estavel)
      console.log(Cauteloso)
      let valores = []
      valores.push(Dominante)
      valores.push(Influente)
      valores.push(Estavel)
      valores.push(Cauteloso)
      let maior = Math.max(...valores);
      Alert.alert(maior)
      navigation.navigate("MostraPerfil")
    }
  }

  const backPosition = () => {
    if(currentPosition<0)
      setPosition(currentPosition - 1);
  }

  const escolheAlternativa = (index) =>{
    toggleModal()
    setAnswer(index)
  }

  const escolheNota = (value) =>{
  
    questoes[currentPosition].respostas[currentAnswer].nivel = value;
    toggleModal()
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
            <ListItem
              title={item.resposta}
              subtitle={item.nivel}
              onPress={() =>{escolheAlternativa(index)}}
            />
        )}
        ItemSeparatorComponent={() => Separator()}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.botao1} onPress={() =>{escolheNota(1)}} >
            <Text>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao2} onPress={() =>{escolheNota(2)}} >
            <Text>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao3} onPress={() =>{escolheNota(3)}} >
            <Text>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao4} onPress={() =>{escolheNota(4)}} >
            <Text>4</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.containerButton}>
        <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
          Voltar
        </Button>
        <Button style={{ width: '49%' }} onPress={() => { nextPosition() }}>
          Proxima
        </Button>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom:10
  },
  labelPergunta: {
    fontSize: 20,
    fontWeight:'bold',
    marginBottom:20
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
    maxWidth:"20%",
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
    maxWidth:"90%"
  },
  modal:{
    backgroundColor:'white',
    height:400,
    borderRadius:30,
    padding:10
  },
  botao1:{
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 0.5,
  },
  botao2:{
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 0.5,
  },
  botao3:{
    backgroundColor: '#90EE90',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 0.5,
  },
  botao4:{
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 0.5,
  },
  container:{
    marginHorizontal: '10%',
    flex: 1
  }
});

export default Teste;
