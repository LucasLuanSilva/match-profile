import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../../components/ListItem';
import AsyncStorage from "@react-native-community/async-storage";
import api from '../../services/api';

const Usuario: React.FC = () => {

  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState({ usuarios: Array, error: String });

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');

    api.get("/usuarios/empresariais", { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        const persons = res.data;

        setUsuarios(persons)
      });
  }, []);

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
            handleRight={() => alert('Tarefa foi excluida!')}
            onPress={() => alert('Abriu informações!')}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

    </Container>
  );
}

const styles = StyleSheet.create({
  list: {
    maxHeight: '85%'
  }
});

export default Usuario;
