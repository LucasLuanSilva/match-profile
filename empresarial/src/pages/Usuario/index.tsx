import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../../components/ListItem';
import api from '../../services/api';
import FloatButton from '../../components/FloatButton';

const Usuario: React.FC = () => {

  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState({ usuarios: Array, error: String });
  const [load, setLoad] = useState(true)

  const listaUsuarios = async () => {
    await api.get("empresariais/usuarios")
      .then(res => {
        const usuarios = res.data;

        setUsuarios(usuarios)
      });
  };

  useEffect(async () => {
    await listaUsuarios();

    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

  const deleteUsuario = async (id) => {
    await api.delete('empresariais/usuarios/' + id).then((response) => {
      Alert.alert("Usuário excluido com sucesso !");
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });

    setLoad(!load);
  };

  const editarUsuario = (item) => {
    navigation.navigate('Cadastro', { usuario: item })
  }

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  return (
    <Container>

      <FlatList
        style={styles.list}
        data={usuarios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            title={item.nome}
            subtitle={item.email}
            handleRight={() => deleteUsuario(item.id)}
            onPress={() => editarUsuario(item)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <FloatButton icon={'plus'} onPress={() => navigation.navigate('Cadastro')} />
    </Container>
  );
}

const styles = StyleSheet.create({
  list: {
    minHeight: '85%',
    maxHeight: '85%'
  }
});

export default Usuario;
