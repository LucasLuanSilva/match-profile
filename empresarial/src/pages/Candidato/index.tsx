import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native';
import { Container } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import ListItem from '../../components/ListItem';
import api from '../../services/api';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import formataCPF from '../../functions/FormataCPF';

const Candidato: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const [load, setLoad] = useState(true);

  const [candidatos, setCandidatos] = useState([]);
  const [candidatosView, setCandidatosView] = useState([]);

  const [search, setSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('cpf');

  const listaCandidatos = async () => {
    await api.get("empresariais/candidatos")
      .then(res => {
        const candidatos = res.data;

        setCandidatos(candidatos);
        setCandidatosView(candidatos);
      });
  };

  useEffect(async () => {
    await listaCandidatos();

    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

  const buscar = (value) => {
    if (value.trim().length > 0) {
      let novoCandidatosView = [];
      for (var i in candidatos) {
        if (candidatos[i].usuario[typeSearch].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          novoCandidatosView.push(candidatos[i]);
        }
      }

      setCandidatosView(novoCandidatosView);
    } else {
      setCandidatosView(candidatos);
    }

    setSearch(value);
  }

  const selecionarCandidato = (item) => {
    navigation.navigate('PerfilCandidato', { candidato: item });
  }

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  return (
    <Container>
      <View style={styles.viewSearch}>
        <View style={styles.selectPicker}>
          <Picker
            key="typeSearch"
            selectedValue={typeSearch}
            onValueChange={(value) => { setTypeSearch(value) }}
          >
            <Picker.Item key="cpf" label="CPF" value="cpf" />
            <Picker.Item key="nome" label="Nome" value="nome" />
            <Picker.Item key="email" label="Email" value="email" />
          </Picker>
        </View>
        <TextInput placeholder="Busca"
          style={styles.search}
          value={search}
          onChangeText={(value) => { buscar(value) }}
        />
      </View>
      <Text style={styles.label}>Candidatos</Text>
      <FlatList
        style={styles.list}
        data={candidatosView}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            title={item.usuario.nome + ' ' + item.usuario.sobrenome}
            subtitle={item.usuario.email + '\n ' + formataCPF(item.usuario.cpf)}
            onPress={() => selecionarCandidato(item)}
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
  label: {
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  selectPicker: {
    height: 45,
    width: '32%',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  search: {
    width: '67%',
    height: 45,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  viewSearch: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  }
});

export default Candidato;
