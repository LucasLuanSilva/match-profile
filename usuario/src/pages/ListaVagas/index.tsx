import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../../components/ListItem';
import api from '../../services/api';

const ListaVagas: React.FC =()=> {
    const navigation = useNavigation();
    const [vagas, setVagas] = useState([]);

    useEffect(async()=>{
        await listaVagas()
    }, []);

    const listaVagas = async () => {
        await api.get('vagas').then(
            (response) => {
                setVagas(response.data);
            }
        )
        .catch(
            (error) => {
                Alert.alert(error.response.data.message);
                console.log(error)
            }
        );
    }


    const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

    return(
        <View>
            <FlatList
              style={styles.list}
              data={vagas}
              horizontal={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ListItem
                  title={item.titulo}
                  subtitle={item.descricao}
                  onPress={()=>{navigation.navigate('MostraVaga', {item})}}
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
export default ListaVagas;
