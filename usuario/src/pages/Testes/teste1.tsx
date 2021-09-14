import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import Button from '../../components/Button';
import StepIndicator from 'react-native-step-indicator';
import { useNavigation } from '@react-navigation/native';

const labels = ["Questão 1","Questão 2","Questão 3","Questão 4","Questão 5"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

const Teste1: React.FC =()=> {

    const [currentPosition, setPosition] = useState(0);
    const changePosition = () =>{
      setPosition(1)
      navigation.navigate('Teste2')
    }
    const navigation = useNavigation();
    return(
        <View>
          <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
          />
          <Text>Teste 1</Text>
          <Button onPress={()=>{changePosition()}}>Próxima</Button>
        </View>

    )
}

const styles = StyleSheet.create({




});
export default Teste1;
