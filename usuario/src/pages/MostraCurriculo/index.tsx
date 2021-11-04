import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, useE } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {ExpandableListView} from 'react-native-expandable-listview';
import Button from '../../components/Button';
import api from '../../services/api';
import dayjs from 'dayjs';

const MostraCurriculo: React.FC =()=> {
    const navigation = useNavigation();
    const route = useRoute();
    const dados = route.params.id;

    function handleItemClick({index}){ 
			
    };
    
    function editaCurriculo(){
      navigation.navigate('EditaCurriculo', {dados})
    }

    const [load, setLoad] = useState(true);

    useEffect(async()=>{
			await getUsuario()
			await	carregaTelefones()
			await listaGraduacao()
			await	listaExperiencia()
			await	listaCurso()
			await listaCompetencia()
      navigation.addListener('focus', () => setLoad(!load))
    }, [load, navigation]);
  

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
            console.log(error)
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
		setCursos(cursos);
		}
	)
	.catch(
		(error) => {
		Alert.alert(error.response.data.message);
		console.log(error)
		}
	);
	}

	const listaCompetencia = async () => {
		await api.get('competencias/' + dados).then(
			(response) => {
				let comps = [];
				for (var i in response.data) {
					const comp = {
						id: i,
						descricao: response.data[i].descricao
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
			setCompetencias(comps);
			}
		)
	.catch(
		(error) => {
		Alert.alert(error.response.data.message);
		console.log(error)
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
						+'('+ response.data[i].ddd +')'+ response.data[i].numero
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
						setExperiencias(exps);
					}
				)
				.catch(
					(error) => {
						Alert.alert(error.response.data.message);
						console.log(error)
					}
				);
			}

			const listaGraduacao = async () => {
      
				await api.get('graduacao/' + dados).then(
					(response) => {
						let grads = []
						for (var i in response.data) {
							const exp = {
								id: i,
								name: response.data[i].nivel
									+ '\n'
									+ response.data[i].instituicao
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
						setGraduacaos(grads);
					}
				)
				.catch(
					(error) => {
						Alert.alert(error.response.data.message);
						console.log(error)
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
							name: usuario.cpf,
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
            categoryName: 'Cursos / Competências',
            subCategory: cursos,
        },
        {
            id: '6',
            categoryName: 'Experiências',
            subCategory: experiencias
        },
        
    ];

    return(
        <View>
            <Text></Text>
            <ExpandableListView
                data={CONTENT} // required
                itemLabelStyle={styles.labelExpandable}
                ExpandableListViewStyles={{}} // styles to expandable listview
                renderInnerItemSeparator={true} // true or false, render separator between inner items
                renderItemSeparator={true} // true or false, render separator between Items
                itemContainerStyle={styles.labelExpandable} // add your styles to all item container of your list
                itemImageIndicatorStyle={{}} // add your styles to the image indicator of your list
                animated={true}
                onItemClick={handleItemClick}
            />
            <View style={styles.containerButton}>
                <Button style={{ width: '98%' }} onPress={() => { editaCurriculo() }}>
                    Editar Informações
                </Button>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    subtitletext:{
        fontSize:16,
        fontWeight:'bold',
        color:'#fff',
        marginLeft:10,
        marginTop:20,
        marginBottom:50
    },
    containerButton: {
        marginTop: 10,
        marginHorizontal:'10%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    labelExpandable: {
        backgroundColor: '#3B55E6',
        color:'white'
    },
    innerContainer:{
        fontSize:20
    }
});
export default MostraCurriculo;
