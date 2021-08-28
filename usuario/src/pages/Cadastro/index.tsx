import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { Container } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';

const Cadastro: React.FC =()=> {
    const navigation = useNavigation();
    return(
        <View>
            <View style={styles.title}>
                <Text style={styles.titletext}>Cadastro</Text>
                <Text style={styles.subtitletext}>Por favor entre com sua conta</Text>
            </View>
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="senha" icon="lock" placeholder="Senha" />
            {/* <Button/> */}
        </View>
            
    )
}

const styles = StyleSheet.create({
    title:{
        marginTop:100,
        marginLeft:'15%',
        marginBottom:20,
        alignItems:'flex-start'
    },
    titletext:{
        fontWeight:'bold',
        fontSize:20
    },
    subtitletext:{
        fontSize:16
    }
    


});
export default Cadastro;
