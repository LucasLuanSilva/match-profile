import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import Icon from 'react-native-vector-icons/Feather';
import ListItem from '../../components/ListItem';

const Usuario: React.FC = () => {

  const navigation = useNavigation();
  const { signIn } = useAuth();
  const [credencial, setCredencial] = useState({ email: '', senha: '' })
  const [access, setAccess] = useState(true)

  const field = (field) => {
    return (value) => {
      setCredencial({ ...credencial, [field]: value })
      let isEnable = (credencial.email != '' && credencial.senha != '')
      setAccess(!isEnable)
    }
  }

  const login = async () => {
    try {
      await signIn({
        email: credencial.email,
        senha: credencial.senha,
      });

      setCredencial({ ...credencial, email: '', senha: '' });

      navigation.navigate("DrawerNavigation");
    } catch (error) {
      Alert.alert(error.response.data.message);
      setCredencial({ ...credencial, senha: '' })
    }
  }

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
        data={tarefas}
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
