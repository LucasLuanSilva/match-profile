import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';
import api from '../../services/api';

const MostraPerfil: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
//   const dados = useState(route.params.item);

  useEffect(() => {
    // setVaga(dados[0]);
  }, []);

  const [vaga, setVaga] = useState({
    id: '',
    titulo: '',
    descricao: ''
  });

  return (
    <View>
      <View style={styles.buttonHome}>
        <View style={styles.buttonHomeBlue}>
          <Text style={styles.titletext}>{vaga.titulo}</Text>
          <Text style={styles.subtitletext}>{vaga.descricao}</Text>
        </View>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>Envie o currículo do seu perfil !</Text>
        <Text style={styles.text}>Boa Sorte!!!</Text>
      </View>
      <View style={styles.containerButton}>
        <Button onPress={async () => { candidatarVaga() }}>
          Enviar
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonHome: {
    marginTop: 20,
    justifyContent: 'center'
  },
  buttonHomeBlue: {
    height: 280,
    width: "80%",
    backgroundColor: '#3B55E6',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center'
  },
  titletext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 50

  },
  subtitletext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 50
  },
  containerButton: {
    marginTop: 100,
    marginHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,

  },
  containerText: {
    marginHorizontal: '10%',
    alignItems: 'center',
  }

});
export default MostraPerfil;
