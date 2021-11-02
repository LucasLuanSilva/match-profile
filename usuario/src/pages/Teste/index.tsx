import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Container } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import ListItem from '../../components/ListItem';
import api from '../../services/api';
import Button from '../../components/Button';

const Teste: React.FC = () => {

  const navigation = useNavigation();
  const [testes, setTestes] = useState([]);
  const [load, setLoad] = useState(true)
  const route = useRoute();
  const dados = useState(route.params.item);

  const getTeste = async () => {
    await api.get("testes/" + dados.id)
      .then(res => {
        const testes = res.data;

        setTestes(testes)
      });
  };

  useEffect(async () => {
    console.log(dados[0].id)

    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

  

  return (
    <Container>    
      
    </Container>
  );
}

const styles = StyleSheet.create({
  list: {
    minHeight: '85%',
    maxHeight: '85%'
  },
  buttonTesteDISC: {
    backgroundColor: '#3B55E6',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 0.5,
  },
  labelTesteDISC: {
    color: 'white',
    fontSize: 20
  }
});

export default Teste;
