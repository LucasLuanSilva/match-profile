import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListTests from '../../components/ListTests';
import api from '../../services/api';

const ListaTestes: React.FC =()=> {
    const navigation = useNavigation();
    const [testes, setTestes] = useState([{
          nome:"Tray",
          descricao:"Tray DISC"
        },
        {
          nome:"Tray",
          descricao:"Teste de conhecimento"
        },
        {
          nome:"Tauste",
          descricao:"Empacotador"
        },
        {
          nome:"Maxxi",
          descricao:"Recepcionista"
        },
        {
          nome:"Mrv",
          descricao:"Engenheiro Civil"
        },
        {
          nome:"Paschoalotto",
          descricao:"Gerente de Marketing"
        },
        {
          nome:"Asilo São Miguel",
          descricao:"Cuidador"
        },
        {
          nome:"Confiança",
          descricao:"Promotor"
        },
    ]);

    const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

    return(
        <View>
          {/* <ScrollView> */}
            <FlatList
              style={styles.list}
              data={testes}
              horizontal={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ListTests
                  title={item.nome}
                  subtitle={item.descricao}
                  handleRight={() => alert('Tarefa foi excluida!')}
                  onPress={() => alert('Abriu informações!')}
                />
              )}
              ItemSeparatorComponent={() => <Separator />}
            />
          {/* </ScrollView> */}
        </View>

    )
}

const styles = StyleSheet.create({

  list: {
    marginTop: '10%'
  }

});
export default ListaTestes;
