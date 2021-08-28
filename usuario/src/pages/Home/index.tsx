import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC =()=> {
    const navigation = useNavigation();
    return(
        <View>
            <View style={styles.buttonHome}>
                <TouchableOpacity onPress={()=>{Alert.alert("OIIIII")}} >
                    <View style={styles.buttonHomeBlue}/>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.buttonHomeBlue}/>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonHome}>
                <TouchableOpacity>
                    <View   style={styles.buttonHomeBlue}/>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View  style={styles.buttonHomeBlue}/>
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
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginLeft:20
    },
    subtitletext:{
        fontSize:16
    }
    


});
export default Home;
