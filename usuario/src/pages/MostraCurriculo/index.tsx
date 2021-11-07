import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ExpandableListView } from 'react-native-expandable-listview';
import Button from '../../components/Button';
import api from '../../services/api';
import dayjs from 'dayjs';
import formataEscolaridade from '../../functions/FormataEscolaridade';
import formataCPF from '../../functions/FormataCPF';
import formataTelefone from '../../functions/FormataTelefone';
import formataCompetencia from '../../functions/FormataCompetencia';

const MostraCurriculo: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  var [dados, setDados] = useState('');

  const [load, setLoad] = useState(true);

  useEffect(async () => {
    await api.post('curriculos').then(
      (response) => {
        dados = response.data.id;
        setDados(response.data.id);
      }
    ).catch(
      (error) => {
        Alert.alert(error.response.data.message);
      }
    );

    await getUsuario()
    await carregaTelefones()
    await listaGraduacao()
    await listaExperiencia()
    await listaCurso()
    await listaCompetencia()
    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

  function editaCurriculo() {
    navigation.navigate('EditaCurriculo', { dados })
  }

  const [cursos, setCursos] = useState([]);

  const [telefones, setTelefones] = useState([]);

  const [experiencias, setExperiencias] = useState([]);

  const [graduacaos, setGraduacaos] = useState([]);

  const [competencias, setCompetencias] = useState([]);

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

  const getUsuario = async () => {
    await api.get('usuarios').then(
      (response) => {
        setUsuario(response.data);
      }
    )
      .catch(
        (error) => {
          Alert.alert(error.response.data.message);
        }
      );
  }

  const listaCurso = async () => {

    await api.get('cursos/' + dados).then(
      (response) => {
        let cursos = []
        for (var i in response.data) {
          const curso = {
            id: i,
            name: response.data[i].nome
              + '\n'
              + response.data[i].instituicao
          }

          cursos.push(curso);

          cursos.push({
            id: i,
            customInnerItem: (
              <View style={{
                height: 1
              }} />
            )
          });
        }

        if (cursos.length > 0) {
          setCursos(cursos);
        } else {
          setCursos([
            {
              id: '1',
              name: ''
            }
          ]);
        }
      }
    ).catch(
      (error) => {
        Alert.alert(error.response.data.message);
      }
    );
  }

  const listaCompetencia = async () => {
    await api.get('competencias/' + dados).then(
      (response) => {
        console.log(response.data)
        let comps = [];
        for (var i in response.data) {
          const comp = {
            id: i,
            name: response.data[i].descricao
              + '\n' + formataCompetencia(response.data[i]).nivelLabel
          }
          comps.push(comp);
          comps.push({
            id: i,
            customInnerItem: (
              <View style={{
                height: 1
              }} />
            )
          });
        }

        if (comps.length > 0) {
          setCompetencias(comps);
        } else {
          setCompetencias([
            {
              id: '1',
              name: ''
            }
          ]);
        }
      }
    ).catch(
      (error) => {
        Alert.alert(error.response.data.message);
      }
    );
  }

  const carregaTelefones = async () => {
    await api.get('telefones').then((response) => {
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

      if (telefonesFormatados.length > 0) {
        setTelefones(telefonesFormatados);
      } else {
        setTelefones([
          {
            id: '1',
            name: ''
          }
        ]);
      }
    }).catch((error) => {
      Alert.alert(error.response.data.message);
    });
  };

  const listaExperiencia = async () => {

    await api.get('experiencias/' + dados).then(
      (response) => {
        let exps = []
        for (var i in response.data) {
          const exp = {
            id: i,
            name: response.data[i].cargo
              + '\n'
              + response.data[i].empresa
          }

          exps.push(exp);

          exps.push({
            id: i,
            customInnerItem: (
              <View style={{
                height: 1
              }} />
            )
          });
        }

        if (exps.length > 0) {
          setExperiencias(exps);
        } else {
          setExperiencias([
            {
              id: '1',
              name: ''
            }
          ]);
        }
      }
    )
      .catch(
        (error) => {
          Alert.alert(error.response.data.message);
        }
      );
  }

  const listaGraduacao = async () => {
    await api.get('graduacao/' + dados).then(
      (response) => {
        let grads = []
        for (var i in response.data) {
          const escolaridade = formataEscolaridade(response.data[i]);
          const exp = {
            id: i,
            name: escolaridade.nivelLabel + ', ' + escolaridade.cursandoLabel
              + '\n'
              + escolaridade.instituicao
          }

          grads.push(exp);

          grads.push({
            id: i,
            customInnerItem: (
              <View style={{
                height: 1
              }} />
            )
          });
        }

        if (grads.length > 0) {
          setGraduacaos(grads);
        } else {
          setGraduacaos([
            {
              id: '1',
              name: ''
            }
          ]);
        }
      }
    ).catch(
      (error) => {
        Alert.alert(error.response.data.message);
      }
    );
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
    },
    {
      id: '4',
      categoryName: 'Escolaridade',
      subCategory: graduacaos
    },
    {
      id: '5',
      categoryName: 'Cursos',
      subCategory: cursos,
    },
    {
      id: '6',
      categoryName: 'Competências',
      subCategory: competencias
    },
    {
      id: '7',
      categoryName: 'Experiências',
      subCategory: experiencias
    }
  ];

  return (
    <View>
      <Text></Text>
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
      <View style={styles.containerButton}>
        <Button onPress={() => { editaCurriculo() }}>
          Editar Informações
        </Button>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  subtitletext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 50
  },
  containerButton: {
    marginTop: 10,
    marginHorizontal: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  labelExpandable: {
    backgroundColor: '#3B55E6',
    color: 'white',
    padding: 5
  },
  innerContainer: {
    fontSize: 20
  }
});
export default MostraCurriculo;
