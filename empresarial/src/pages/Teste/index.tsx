import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../../components/ListItem';
import api from '../../services/api';
import FloatButton from '../../components/FloatButton';

const Teste: React.FC = () => {

  const navigation = useNavigation();
  const [testes, setTestes] = useState([]);
  const [load, setLoad] = useState(true)

  const listaTestes = async () => {
    await api.get("empresariais/testes")
      .then(res => {
        const testes = res.data;

        setTestes(testes)
      });
  };

  useEffect(async () => {
    await listaTestes();

    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

  const visualizarTeste = (item) => {
    navigation.navigate('FormularioTeste', { teste: item, visualizar: true })
  }

  const excluirTeste = async (item) => {
    if (item.tipo == 1)
      return;

    await api.delete('empresariais/testes/' + item.id + '/' + item.versao).then((response) => {
      Alert.alert("Exclusão realizada com sucesso !");

      listaTestes();
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  }

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  return (
    <Container>
      <FlatList
        style={styles.list}
        data={testes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          item.tipo == 1 ?
            <ListItem
              title={item.titulo}
              onPress={() => visualizarTeste(item)}
              handleLeft={() => { navigation.navigate('EnviarTeste', { teste: item }) }}
              containerStyle={styles.buttonTesteDISC}
              titleStyle={styles.labelTesteDISC}
            />
            :
            <ListItem
              title={item.titulo}
              handleRight={() => { excluirTeste(item) }}
              handleLeft={() => { navigation.navigate('EnviarTeste', { teste: item }) }}
              onPress={() => visualizarTeste(item)}
            />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <FloatButton icon={'plus'} onPress={() => navigation.navigate('FormularioTeste', { visualizar: false })} />
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
