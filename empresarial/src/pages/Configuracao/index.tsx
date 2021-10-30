import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Button from '../../components/Button';
import { ExpandableListView } from 'react-native-expandable-listview';
import formataCPF from '../../functions/FormataCPF';
import AsyncStorage from "@react-native-community/async-storage";
import formataTelefone from '../../functions/FormataTelefone';

const Configuracao: React.FC = () => {

  const navigation = useNavigation();
  const [load, setLoad] = useState(true);

  const [usuario, setUsuario] = useState({
    id: '',
    cpf: '',
    nome: '',
    sobrenome: '',
    email: '',
    rg: '',
    senha: '',
    confirmarSenha: '',
    estado_civil: '0',
    cep: '',
    cidades_codigo_municipio: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: {
      codigo_municipio: '',
      nome: '',
      uf: ''
    }
  });

  const [telefones, setTelefones] = useState([]);

  const getUsuario = async () => {
    await api.get("empresariais/usuarios", { params: { logado: true } })
      .then(async res => {
        const usuario = res.data;

        await AsyncStorage.multiSet([
          ['id', usuario[0].id],
          ['nome', usuario[0].nome],
          ['sobrenome', usuario[0].sobrenome],
          ['email', usuario[0].email],
        ]);

        setUsuario(usuario[0])
      });
  };

  const carregaTelefones = async () => {
    await api.get('empresariais/telefones/' + usuario.id).then((response) => {
      let telefonesFormatados = [];
      for (var i in response.data) {
        const telefone = {
          id: i,
          name: response.data[i].contato
            + '\n'
            + formataTelefone(response.data[i].ddd, response.data[i].numero)
        }

        telefonesFormatados.push(telefone);

        telefonesFormatados.push({
          id: i,
          customInnerItem: (
            <View style={{
              height: 1
            }} />
          )
        });
      }

      setTelefones(telefonesFormatados);
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  };

  useEffect(async () => {
    await getUsuario();

    await carregaTelefones();
    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

  const editarUsuario = () => {
    navigation.navigate('Cadastro', { usuario })
  }

  const CONTENT = [
    {
      id: '1',
      categoryName: 'Informações Gerais',
      subCategory: [
        {
          id: '1',
          customInnerItem: (
            <View style={{
              flexDirection: 'column',
              marginLeft: 15
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold'
              }}>{usuario.nome + ' ' + usuario.sobrenome}</Text>
            </View>
          )
        },
        {
          id: '2',
          name: usuario.email,
        },
        {
          id: '3',
          name: formataCPF(usuario.cpf),
        },
        {
          id: '4',
          name: usuario.rg,
        },
        {
          id: '5',
          customInnerItem: (
            <View style={{
              height: 6
            }} />
          )
        },
      ],
    },
    {
      id: '2',
      categoryName: 'Endereço',
      subCategory: [
        {
          id: '1',
          name: usuario.cep.substring(0, 5) + '-' + usuario.cep.substring(5),
        },
        {
          id: '2',
          name: usuario.cidade.nome + '-' + usuario.cidade.uf,
        },
        {
          id: '3',
          name: usuario.logradouro + ', ' + usuario.numero + ', ' + usuario.bairro,
        },
        {
          id: '4',
          name: usuario.complemento,
        }
      ],
    },
    {
      id: '3',
      categoryName: 'Contatos',
      subCategory: telefones
    }
  ];

  return (
    <Container>

      <ExpandableListView
        data={CONTENT}
        itemLabelStyle={styles.labelExpandable}
        ExpandableListViewStyles={{ backgroundColor: 'white' }}
        renderItemSeparator={true}
        itemContainerStyle={styles.labelExpandable}
        chevronColor="white"
        itemImageIndicatorStyle={{}}
        animated={true}
      />

      <View style={styles.rodape}>
        <Button onPress={() => { editarUsuario() }}>
          Editar Informações
        </Button>

        <Text style={styles.versao}>Match Profile - v1.0.0</Text>
      </View>

    </Container>
  );
}

const styles = StyleSheet.create({
  dados: {
    minHeight: '85%',
    maxHeight: '85%'
  },
  versao: {
    marginTop: 8,
    justifyContent: 'center',
    textAlign: 'center'
  },
  rodape: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    margin: '5%'
  },
  labelExpandable: {
    backgroundColor: '#3B55E6',
    color: 'white',
    padding: 5
  },
});

export default Configuracao;
