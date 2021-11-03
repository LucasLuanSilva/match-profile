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
    }).catch((error) => {
      Alert.alert(error.response.data.message);
      navigation.goBack();
    });

    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

  return (
    <Container>
      <Text style={styles.title}>{usuario.nome + ' ' + usuario.sobrenome}</Text>

      <View style={styles.containerView}>

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
          navigation.navigate('TesteCandidato', { testesAtribuidos });
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
