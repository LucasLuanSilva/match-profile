import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Container } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import ListItem from '../../components/ListItem';
import api from '../../services/api';

const TesteCandidato: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const [testes, setTestes] = useState(route.params.testes);

  const visualizarTeste = (item) => {
    navigation.navigate('FormularioTesteRespondido', { testePreenchido: item })
  }

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  return (
    <Container>
      <FlatList
        style={styles.list}
        data={testes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          item.teste.tipo == 1 ?
            <ListItem
              title={item.teste.titulo}
              subtitle={item.respondido == 1 ? 'Respondido' : 'Não Respondido'}
              onPress={() => visualizarTeste(item)}
              containerStyle={styles.buttonTesteDISC}
              titleStyle={styles.labelTesteDISC}
              subtitleStyle={styles.subTitleTesteDISC}
            />
            :
            <ListItem
              title={item.teste.titulo}
              subtitle={item.respondido == 1 ? 'Respondido' : 'Não Respondido'}
              onPress={() => visualizarTeste(item)}
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
  },
  subTitleTesteDISC: {
    color: 'white',
    fontSize: 15
  }
});

export default TesteCandidato;
