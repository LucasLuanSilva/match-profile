import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../../components/ListItem';
import api from '../../services/api';
import FloatButton from '../../components/FloatButton';

const Vaga: React.FC = () => {

  const navigation = useNavigation();
  const [load, setLoad] = useState(true);

  const [vagas, setVagas] = useState([]);

  const listaVagas = async () => {
    await api.get("empresariais/vagas")
      .then(res => {
        const vagas = res.data;

        setVagas(vagas)
      });
  };

  useEffect(async () => {
    await listaVagas();

    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

  const deleteVaga = async (id) => {
    await api.delete('empresariais/vagas/' + id).then((response) => {
      Alert.alert("Vaga excluida com sucesso !");
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });

    setLoad(!load);
  };

  const editarVaga = (item) => {
    navigation.navigate('FormularioVaga', { vaga: item, visualizar: true })
  }

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  return (
    <Container>

      <FlatList
        style={styles.list}
        data={vagas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            title={item.titulo}
            handleRight={() => deleteVaga(item.id)}
            onPress={() => editarVaga(item)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <FloatButton icon={'plus'} onPress={() => navigation.navigate('FormularioVaga', { visualizar: false })} />
    </Container>
  );
}

const styles = StyleSheet.create({
  list: {
    minHeight: '85%',
    maxHeight: '85%'
  }
});

export default Vaga;
