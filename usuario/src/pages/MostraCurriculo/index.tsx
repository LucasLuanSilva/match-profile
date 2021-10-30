import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, useE } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {ExpandableListView} from 'react-native-expandable-listview';
import Button from '../../components/Button';

const MostraCurriculo: React.FC =()=> {
    const navigation = useNavigation();
    const route = useRoute();
    const dados = route.params.id;

    function handleItemClick({index}) {    
    };
    
    function editaCurriculo(){
      navigation.navigate('EditaCurriculo', {dados})
    }

    // const [curriculoId, setCurriculoId] = useState(0);    

    useEffect(()=>{
      console.log(dados)
    }, []);

    const CONTENT = [
        {
          id: '1', // required, id of item
          categoryName: 'Informações Gerais', // label of item expandable item
          subCategory: [
            // required, array containing inner objects
            {
              id: '3', // required, of inner object
              name: 'Sub Cat 1', // required, label of inner object
            },
            {
              id: '4',
              name: 'Sub Cat 3',
            },
          ],
        },
        {
          id: '2',
          categoryName: 'Endereço',
          subCategory: [{id: '22', name: 'Sub Cat 22'}],
        },
        {
            id: '3',
            categoryName: 'Contatos',
            subCategory: [{id: '22', name: 'Sub Cat 22'}],
        },
        {
            id: '4',
            categoryName: 'Escolaridade',
            subCategory: [{id: '22', name: 'Sub Cat 22'}],
        },
        {
            id: '3',
            categoryName: 'Cursos / Competências',
            subCategory: [{id: '22', name: 'Sub Cat 22'}],
        },
        {
            id: '3',
            categoryName: 'Experiências',
            subCategory: [{id: '22', name: 'Sub Cat 22'}],
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
