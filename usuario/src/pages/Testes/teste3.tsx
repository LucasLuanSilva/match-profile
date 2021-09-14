import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

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


const Teste3: React.FC =()=> {
    const navigation = useNavigation();
    const [currentPosition, setPosition] = useState(2);
    const changePosition = () =>{
      setPosition(3)
      navigation.navigate('Teste4')
    }
    return(
        <View>
          <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
          />
          <Text>Teste 3</Text>
          <Button onPress={()=>{changePosition()}}>Próxima</Button>
        </View>

    )
}

const styles = StyleSheet.create({




});
export default Teste3;
