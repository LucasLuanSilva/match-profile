import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native';
import { Container } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ExpandableListView } from 'react-native-expandable-listview';
import formataCPF from '../../functions/FormataCPF';
import formataTelefone from '../../functions/FormataTelefone';

const CurriculoCandidato: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const [load, setLoad] = useState(true);

  const [usuario, setUsuario] = useState(route.params.usuario);
  const [telefones, setTelefones] = useState(route.params.telefones);
  const [graduacoes, setGraduacoes] = useState(route.params.graduacoes);
  const [cursos, setCursos] = useState(route.params.cursos);
  const [experiencias, setExperiencias] = useState(route.params.experiencias);
  const [competencias, setCompetencias] = useState(route.params.competencias);

  useEffect(async () => {
    let telefonesAux = [];
    if (telefones.length > 0) {
      for (var i in telefones) {
        telefonesAux.push({
          id: telefones[i].id,
          name: formataTelefone(telefones[i].ddd, telefones[i].numero) + ' ' + telefones[i].contato
        });
      }
    } else {
      telefonesAux.push({ id: 0, name: '' });
    }
    setTelefones(telefonesAux);

    let graduacoesAux = [];
    if (graduacoes.length > 0) {

    } else {
      graduacoesAux.push({ id: 0, name: '' });
    }
    setGraduacoes(graduacoesAux);

    let cursosAux = [];
    if (cursos.length > 0) {

    } else {
      cursosAux.push({ id: 0, name: '' });
    }
    setCursos(cursosAux);

    let experienciasAux = [];
    if (experiencias.length > 0) {

    } else {
      experienciasAux.push({ id: 0, name: '' });
    }
    setExperiencias(experienciasAux);

    let competenciasAux = [];
    if (competencias.length > 0) {

    } else {
      competenciasAux.push({ id: 0, name: '' });
    }
    setCompetencias(competenciasAux);

    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

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
      subCategory: graduacoes
    },
    {
      id: '5',
      categoryName: 'Cursos',
      subCategory: cursos
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

    </Container>
  );
}

const styles = StyleSheet.create({
  labelExpandable: {
    backgroundColor: '#3B55E6',
    color: 'white',
    padding: 5
  },
});

export default CurriculoCandidato;
