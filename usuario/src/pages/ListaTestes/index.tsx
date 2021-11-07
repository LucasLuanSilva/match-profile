import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../../components/ListItem';
import api from '../../services/api';

const ListaTestes: React.FC =()=> {
    const navigation = useNavigation();
    const [testes, setTestes] = useState([ ]);

    const [load, setLoad] = useState(true);

    useEffect(async()=>{
			await listaTestes()
			
      navigation.addListener('focus', () => setLoad(!load))
    }, [load, navigation]);

    const listaTestes = async () => {
      await api.get('testes_atribuidos').then((response) => {
        console.log(response.data)
        setTestes(response.data);
        }).catch((error) => {
          Alert.alert(error.response.data.message);
        });
      };

    const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

    return(
        <View>
          <FlatList
            style={styles.list}
            data={testes}
            horizontal={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                title={item.teste.titulo}
                subtitle={item.vaga.titulo}
                handleRight={() => alert('Tarefa foi excluida!')}
                onPress={() => navigation.navigate('Teste', {item})}
              />
            )}
            ItemSeparatorComponent={() => <Separator />}
          />
        </View>

    )
}

const styles = StyleSheet.create({

  list: {
    marginTop: '10%'
  }

});
export default ListaTestes;
