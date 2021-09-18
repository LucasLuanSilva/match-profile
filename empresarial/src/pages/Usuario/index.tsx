import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import Icon from 'react-native-vector-icons/Feather';
import ListItem from '../../components/ListItem';
import AsyncStorage from "@react-native-community/async-storage";
import api  from '../../services/api';

const Usuario: React.FC = () => {

  const navigation = useNavigation();
  const { signIn } = useAuth();
  const [usuario, setUsuario] = useState({ id: '', nome: '' })
  const [usuarios, setUsuarios] = useState({ usuarios:[], error: '' })

  const field = (field) => {
    return (value) => {
      setCredencial({ ...credencial, [field]: value })
      let isEnable = (credencial.email != '' && credencial.senha != '')
      setAccess(!isEnable)
    }
  }
  const token = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      // if (token[1]) {
      //   return token[1]
      // }
    }
    // console.log(token);
  

  useEffect(async() => {
  
    const token = await AsyncStorage.getItem('token');
  
    api.get("/usuarios/empresariais" , { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        const persons = res.data;
  
        setUsuarios(persons)
      })
  }, []);

  const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

  const tarefas = [
    { id: '1', tarefa: 'Comprar Doritos' },
    { id: '2', tarefa: 'Estudar React Native' },
    { id: '3', tarefa: 'Estudar JavaScript' },
    { id: '4', tarefa: 'Se inscrever no canal' },
    { id: '5', tarefa: 'Se inscrever no canal' },
    { id: '6', tarefa: 'Se inscrever no canal' },
    { id: '7', tarefa: 'Se inscrever no canal' },
    { id: '8', tarefa: 'Se inscrever no canal' },
    { id: '9', tarefa: 'Se inscrever no canal' },
    { id: '10', tarefa: 'Se inscrever no canal' },
    { id: '11', tarefa: 'Se inscrever no canal' },
    { id: '12', tarefa: 'Se inscrever no canal' },
    { id: '13', tarefa: 'Se inscrever no canal' },
    { id: '14', tarefa: 'Se inscrever no canal' },
    { id: '15', tarefa: 'Se inscrever no canal' },
    { id: '16', tarefa: 'Se inscrever no canal' },
  ];

  return (
    <Container>

      <FlatList
        style={styles.list}
        data={usuarios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            data={item}
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
