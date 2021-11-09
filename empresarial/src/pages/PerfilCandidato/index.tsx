import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Container } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';
import api from '../../services/api';

const PerfilCandidato: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const [load, setLoad] = useState(true);

  const [candidato, setCandidato] = useState({
    id: '',
    data: ''
  });
  const [usuario, setUsuario] = useState({});
  const [telefones, setTelefones] = useState([]);
  const [graduacoes, setGraduacoes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [experiencias, setExperiencias] = useState([]);
  const [competencias, setCompetencias] = useState([]);
  const [testesAtribuidos, setTestesAtribuidos] = useState([]);
  const [perfilDISC, setPerfilDISC] = useState('');

  useEffect(async () => {
    const { id, data } = route.params.candidato;

    setCandidato({
      id: id,
      data: data
    });

    await api.get('empresariais/candidatos/' + id).then((response) => {
      const {
        usuario,
        telefones,
        graduacoes,
        cursos,
        experiencias,
        competencias,
        testesAtribuidos
      } = response.data;

      setUsuario(usuario);
      setTelefones(telefones);
      setGraduacoes(graduacoes);
      setCursos(cursos);
      setExperiencias(experiencias);
      setCompetencias(competencias);
      setTestesAtribuidos(testesAtribuidos);
      calculaResultadoDISC(testesAtribuidos);
    }).catch((error) => {
      Alert.alert(error.response.data.message);
      navigation.goBack();
    });



    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

  const calculaResultadoDISC = async (testesAtribuidos) => {
    let perfil = "Teste DISC não respondido";

    let idxDISC = testesAtribuidos.findIndex(({ teste }) => teste.tipo == 1);

    if (idxDISC != -1 && testesAtribuidos[idxDISC].respondido == 1) {
      let questoes = [];

      await api.get("empresariais/respostas_preenchidas", {
        params: {
          testes_atribuidos_id: testesAtribuidos[idxDISC].id,
          testes_id: testesAtribuidos[idxDISC].testes_id,
          testes_versao: testesAtribuidos[idxDISC].testes_versao
        }
      }).then(res => {
        questoes = res.data;
      }).catch((error) => {
        Alert.alert(error.response.data.message);
      });

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

      valores.push(Dominante);
      valores.push(Influente);
      valores.push(Estavel);
      valores.push(Cauteloso);

      let valor = valores.indexOf(Math.max(...valores));
      switch (valor) {
        case 0:
          perfil = "Perfil dominante.";
          break;
        case 1:
          perfil = "Perfil influente.";
          break;
        case 2:
          perfil = "Perfil estável.";
          break;
        case 3:
          perfil = "Perfil cauteloso.";
          break;
        default:
          perfil = "Perfil indefinido.";
          break;
      }
    }

    setPerfilDISC(perfil);
  }

  return (
    <Container>
      <Text style={styles.title}>{usuario.nome + ' ' + usuario.sobrenome}</Text>

      <View style={styles.containerView}>
        <Text style={styles.labelPerfil}>{perfilDISC}</Text>
      </View>
      <View style={styles.containerButton}>
        <Button onPress={() => {
          navigation.navigate('CurriculoCandidato', {
            usuario,
            telefones,
            graduacoes,
            cursos,
            experiencias,
            competencias
          });
        }}>
          Currículo
        </Button>
      </View>
      <View style={styles.containerButton}>
        <Button onPress={() => {
          navigation.navigate('TesteCandidato', { testes: testesAtribuidos });
        }}>
          Testes
        </Button>
      </View>
      <View style={styles.containerButton}>
        <Button onPress={() => { }}>
          Perfil Web
        </Button>
      </View>

    </Container>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  labelPerfil: {
    fontSize: 20,
    color: 'black'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B55E6'
  },
  containerButton: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerView: {
    marginVertical: '5%',
    padding: '5%',
    minHeight: '30%',
    maxHeight: '30%',
    backgroundColor: 'white',
    borderRadius: 10
  }
});

export default PerfilCandidato;
