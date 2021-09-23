import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../../components/ListItem';
import api from '../../services/api';
import FloatButton from '../../components/FloatButton';

const Usuario: React.FC = () => {

  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState({ usuarios: Array, error: String });

  useEffect(async () => {
    api.get("/usuarios/empresariais")
      .then(res => {
        const usuarios = res.data;

        setUsuarios(usuarios)
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

      <FloatButton icon={'plus'} />
    </Container>
  );
}

const styles = StyleSheet.create({
  list: {
    maxHeight: '85%'
  }
});

export default Usuario;
