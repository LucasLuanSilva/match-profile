import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC =()=> {
    const navigation = useNavigation();
    return(
        <View>
            <View style={styles.buttonHome}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Teste1')}} >
                    <View style={styles.buttonHomeBlue}>
                      <Text style={styles.subtitletext}>Testes</Text>
                      <Image style={styles.imagens}
                          source={require('../../images/testes.png')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                  <View style={styles.buttonHomeBlue}>
                      <Text style={styles.subtitletext}>Meu Currículo</Text>
                      <Image style={styles.imagens}
                          source={require('../../images/meu_curriculo.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonHome}>
                <TouchableOpacity>
                    <View style={styles.buttonHomeBlue}>
                      <Text style={styles.subtitletext}>Vagas</Text>
                      <Image style={styles.imagens}
                          source={require('../../images/vagas.png')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.buttonHomeBlue}>
                      <Text style={styles.subtitletext}>Configurações</Text>
                      <Image style={styles.imagens}
                          source={require('../../images/configuracoes.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    buttonHome:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center'
    },
    buttonHomeBlue:{
        height:300,
        width:150,
        backgroundColor:'#3B55E6',
        borderRadius:10,
        // justifyContent:'center',
        // alignItems:'center',
        alignSelf:'center',
        marginLeft:20
    },
    subtitletext:{
        fontSize:16,
        fontWeight:'bold',
        color:'#fff',
        marginLeft:10,
        marginTop:20,
        marginBottom:50

    },
    imagens:{
      alignSelf:'center'
    }



});
export default Home;
