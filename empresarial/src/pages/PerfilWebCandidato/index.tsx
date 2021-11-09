import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Container } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../../components/ListItem';

const PerfilWebCandidato: React.FC = () => {

  const [informacoes, setInformacoes] = useState([
    {
      id: 0,
      message: 'Gosta de jogos eletrônicos'
    }
  ]);

  useEffect(async () => {

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
            title={item.message}
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
