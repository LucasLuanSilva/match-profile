import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { customStyles } from './styles';
import StepIndicator from 'react-native-step-indicator';
import api from '../../services/api';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../../components/ListItem';

const FormularioTesteRespondido: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [testePreenchido] = useState(route.params.testePreenchido);

  const [questoes, setQuestoes] = useState([{ pergunta: '', respostas: [] }]);

  const [currentPosition, setPosition] = useState(-1);

  const nextPosition = () => {
    if (currentPosition >= (questoes.length - 1)) {
      setPosition(0);
    } else {
      setPosition(currentPosition + 1);
    }
  }

  const backPosition = () => {
    setPosition(currentPosition - 1);
  }

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  useEffect(async () => {
    console.log(testePreenchido.id);
    await api.get("empresariais/respostas_preenchidas", {
      params: {
        testes_atribuidos_id: testePreenchido.id,
        testes_id: testePreenchido.teste.id,
        testes_versao: testePreenchido.teste.versao
      }
    })
      .then(res => {
        const questoes = res.data;
        console.log(questoes[0].respostas)

        setQuestoes(questoes)
      });
  }, []);

  const Page1 = () => {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          style={{ marginHorizontal: "8%", paddingTop: '10%' }}
        >
          <Text style={styles.label}>Título</Text>
          <TextInput placeholder="Informe um título"
            style={styles.input}
            value={testePreenchido.teste.titulo}
            editable={false}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput placeholder="Informe uma descrição"
            multiline={true}
            numberOfLines={4}
            style={styles.inputDescricao}
            value={testePreenchido.teste.descricao}
            editable={false}
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
      <KeyboardAvoidingView
        style={{ marginHorizontal: "8%" }}
      >
        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            stepCount={questoes.length}
          />
        </View>

        <Text style={styles.label}>Pergunta</Text>
        <TextInput placeholder="Informe uma pergunta"
          style={styles.input}
          value={questoes[currentPosition].pergunta}
          editable={false}
        />

        <Text style={styles.label}>Respostas</Text>
        <FlatList
          style={styles.listaRespostas}
          data={questoes[currentPosition].respostas}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            testePreenchido.teste.tipo == 1 ?
              <ListItem
                title={item.resposta}
                subtitle={item.nivel}
              />
              :
              <ListItem
                title={item.resposta}
                subtitle={item.selecionada ? 'Selecionada' : ''}
              />
          )}
          ItemSeparatorComponent={() => Separator()}
        />

        <View style={styles.containerButton}>
          <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
            Voltar
          </Button>
          <Button style={{ width: '49%' }} onPress={() => { nextPosition() }}>
            Proxima
          </Button>
        </View>

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
    backgroundColor: 'white',
    color: 'black'
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
    backgroundColor: 'white',
    color: 'black'
  },
  stepIndicator: {
    marginVertical: 20
  },
  containerButton: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listaRespostas: {
    maxHeight: '56%',
    minHeight: '56%',
  }
});

export default FormularioTesteRespondido;
