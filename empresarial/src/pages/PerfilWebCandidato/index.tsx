import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Container } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../../components/ListItem';
import api from '../../services/api';

const PerfilWebCandidato: React.FC = () => {

  const route = useRoute();
  const [informacoes, setInformacoes] = useState([]);
  const [usuario, setUsuario] = useState(route.params.usuario);

  useEffect(async () => {
    await api.get("empresariais/candidatos/web/" + usuario.id)
      .then(res => {
        const informacoes = res.data;

        setInformacoes(informacoes);
      });
  }, []);

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  return (
    <Container>
      <FlatList
        style={styles.list}
        data={informacoes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  list: {
    minHeight: '85%',
    maxHeight: '85%'
  }
});

export default PerfilWebCandidato;
