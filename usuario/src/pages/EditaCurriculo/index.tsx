import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import TextInputMask from 'react-native-text-input-mask';
import { customStyles } from './styles';
import { Picker } from '@react-native-picker/picker'
import StepIndicator from 'react-native-step-indicator';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import Input from '../../components/Input';
import dayjs from 'dayjs';
import api from '../../services/api';
import ListItem from '../../components/ListItem'



const EditaC: React.FC =()=> {
    const navigation = useNavigation();

    const [curriculo, setCurriculo] = useState({
        graduacao:"",
        estado: "",
        curso: "",
        rg: "",
        senha: "",
        data:""
    });

    const [experiencia, setExperiencia] = useState({
      empresa:'',
      cargo: "",
      dataIni: "" ,
      dataFin:""
    });

    
    useEffect(() => {
      setExperiencia({ ...experiencia, ['dataIni']: dayjs().format('DD/MM/YYYY') });
      setExperiencia({ ...experiencia, ['dataFin']: dayjs().format('DD/MM/YYYY') });
    }, []);

    const [escolaridade, setEscolaridade] = useState(1)
    const [escolaridadeSelecionada, setEscolaridadeSelecionada] = useState([]);

    const [currentPosition, setPosition] = useState(0);

    const field = (field) => {
      return (value) => {
        setCurriculo({ ...curriculo, [field]: value });
      }
    }

    const exp = (exp) => {
      return (value) => {
        setExperiencia({ ...experiencia, [exp]: value });
      }
    }

    const changePosition = () => {
      setPosition(currentPosition + 1);
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
      console.log(date)
      setCurriculo({ ...curriculo, ['data']: date });
      hideDatePicker();
      console.log(curriculo)
    };

    const handleConfirmDataIni = (date) => {
      setExperiencia({ ...experiencia, ['dataIni']: dayjs(date).format('DD/MM/YYYY') });
      hideDatePicker();
    };

    const handleConfirmDataFin = (date) => {
      setExperiencia({ ...experiencia, ['dataFin']: dayjs(date).format('DD/MM/YYYY') });
      hideDatePicker();
    };

    const [isModalVisibleTel, setModalVisibleTel] = useState(false);

    const toggleModalTel = () => {
      setModalVisibleTel(!isModalVisibleTel);
    };

    const [isModalVisibleExp, setModalVisibleExp] = useState(false);

    const toggleModalExp = () => {
      setModalVisibleExp(!isModalVisibleExp);
    };

    const [isModalVisibleCurso, setModalVisibleCurso] = useState(false);

    const toggleModalCurso = () => {
      setModalVisibleCurso(!isModalVisibleCurso);
    };

    const [telefones, setTelefones] = useState([]);

    const [telefone, setTelefone] = useState({
      ddd: '',
      numero: '',
      tipo: 0,
      contato: ''
    });

    const deletarTelefone = (index) => {
      var copiaTelefones = JSON.parse(JSON.stringify(telefones));
      copiaTelefones.splice(index, 1);
  
      setTelefones(copiaTelefones);
    }

    const backPosition = () => {
      setPosition(currentPosition - 1);
    }

    const Separator = () => <View style={{ flex: 1, height: 1, backgroundColor: '#DDD' }}></View>

    const formataTelefone = (ddd: String, numero: String) => {
      let telefone = '(' + ddd + ') ';
  
      if (numero.length > 8) {
        telefone += numero.substring(0, 5) + '-' + numero.substring(5);
      } else {
        telefone += numero.substring(0, 4) + '-' + numero.substring(4);
      }
  
      return telefone;
    }

    const incluirTelefone = async() => {
      const { numero } = telefone;
      let fone = numero.replace(/[^a-z0-9]/gi,'')
      console.log(fone)
      telefone.ddd = fone.substr(0,2);
      telefone.numero = fone.substr(2);

      if (telefone.numero.length < 8) {
        return alert("Informe um número valido !");
      }
  
      setTelefones([...telefones, JSON.parse(JSON.stringify(telefone))]);
      console.log(telefone)
      await api.post('telefones', telefone).then(
        (response) => {
          Alert.alert("Telefone efetuado com sucesso");
          toggleModalTel();
        }
      )
      .catch(
        (error) => {
          Alert.alert(error.response.data.error);
          console.log(error)
        }
      );  
    }

    const Page1 = () => {
      return (
        <View>
            <Modal isVisible={isModalVisibleTel}>
              <View style={styles.modal}>
                  <Text style={styles.label}>Tipo</Text>
                  <View style={styles.selectPicker}>
                    <Picker
                      selectedValue={telefone.tipo}
                      onValueChange={(itemValue, itemIndex) =>
                        setTelefone({ ...telefone, ['tipo']: itemIndex })
                      }
                    >
                      <Picker.Item label="Residencial"  />
                      <Picker.Item label="Pessoal"  />
                      <Picker.Item label="Contato" />
                    </Picker>
                  </View>
                  <Text style={styles.label}>Número</Text>
                  <TextInputMask placeholder="Número"
                    style={styles.input}
                    value={telefone.numero}
                    onChangeText={(formatted, extracted) => {
                      setTelefone({ ...telefone, ['numero']: formatted });
                    }}
                    mask={"([00])[000000000]"}
                    keyboardType='numeric'
                  />

                  <Text style={styles.label}>Contato</Text>
                  <TextInput placeholder="Contato"
                    style={styles.input}
                    value={telefone.contato}
                    onChangeText={(itemValue) => {
                      setTelefone({ ...telefone, ['contato']: itemValue });
                    }}
                  />
                  <View style={styles.containerButton}>
                    <Button style={{ width: '49%', backgroundColor: 'red' }} onPress={() => { toggleModalTel() }}>
                      Cancelar
                    </Button>
                    <Button style={{ width: '49%', backgroundColor: 'green' }} onPress={() => { incluirTelefone() }}>
                      Gravar
                    </Button>
                  </View>
                </View>
            </Modal>
            <Text style={styles.label}>Telefones</Text>
            <FlatList
              style={styles.listaTelefone}
              data={telefones}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => (
                <ListItem
                  title={formataTelefone(item.ddd, item.numero)}
                  subtitle={item.contato}
                  handleRight={() => deletarTelefone(index)}
                  onPress={() => toggleModalTel()}
                />
              )}
              ItemSeparatorComponent={() => Separator()}
            />
            <View style={styles.containerButton}>
              <Button style={{ backgroundColor: 'green' }} onPress={async () => { toggleModalTel() }}>
                Incluir Telefone
              </Button>
            </View>

            <View style={styles.containerButton}>
              <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
                Voltar
              </Button>
              <Button style={{ width: '49%' }} onPress={async () => { changePosition() }}>
                Finalizar
              </Button>
            </View>
        </View>
      );
    }

    const Page2 = () => {
      return (
        <View>
          <Text style={styles.label}>Escolaridade</Text>
            <View style={styles.selectPicker}>
              <Picker
                selectedValue={escolaridadeSelecionada}
                onValueChange={(itemValue) =>
                  setEscolaridadeSelecionada(itemValue)
                }>
                <Picker.Item label="Ensino Fundamental Incompleto" value="1" />
                <Picker.Item label="Ensino Fundamental Completo" value="2" />
                <Picker.Item label="Ensino Médio Incompleto" value="3" />
                <Picker.Item label="Ensino Médio Completo" value="4" />
                <Picker.Item label="Ensino Superior Incompleto" value="5" />
                <Picker.Item label="Ensino Superior Completo" value="6" />
              </Picker>
            </View>
            <Text style={styles.label}>Graduação</Text>
            <TextInput placeholder="Informe a graduação"
                        style={styles.input}
                        value={curriculo.graduacao}
                        onChangeText={field('graduacao')} />
            <View style={styles.containerButton}>
              <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
                Voltar
              </Button>
              <Button style={{ width: '49%' }} onPress={async () => { changePosition() }}>
                Finalizar
              </Button>
            </View>
        </View>
      );
    }

    const Page3 = () => {
      return (
        <View>
          <Modal style={styles.modal} isVisible={isModalVisibleCurso}>
            <View  style={styles.modal} >
              <Text style={styles.label}>Curso</Text>
              <TextInput placeholder="Informe seu curso"
                          style={styles.input}
                          value={curriculo.curso}
                          onChangeText={field('curso')} />
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={showDatePicker}>
                  <Text>Inicio</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={styles.viewButton}>
                <Button onPress={()=>{toggleModalCurso()}}>
                    Salvar
                </Button>
              </View>
            </View>
          </Modal>
          <Text style={{fontWeight:'bold', fontSize:16, marginHorizontal:10}}>Cursos</Text>
          <View style={styles.containerButton}>
            <Button style={{ backgroundColor: 'green' }} onPress={async () => { toggleModalCurso() }}>
              Incluir Curso
            </Button>
          </View>
          <View style={styles.containerButton}>
            <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
              Voltar
            </Button>
            <Button style={{ width: '49%' }} onPress={async () => { changePosition() }}>
              Finalizar
            </Button>
          </View>
        </View>
      );
    }

    const Page4 = () => {
      return (
        <View>
          <Modal  style={styles.modal} isVisible={isModalVisibleExp}>
          <View style={styles.modal}>
                  <Text style={styles.label}>Empresa</Text>
                  <TextInput placeholder="Empresa"
                        style={styles.input}
                        value={experiencia.empresa}
                        onChangeText={exp('empresa')} />
                  <TextInput placeholder="Cargo"
                        style={styles.input}
                        value={experiencia.cargo}
                        onChangeText={exp('cargo')} />
                  <View style={styles.inputDates}>
                    <View>
                      <Text style={styles.label}>Inicio</Text>
                      <View style={styles.inputeDate}>
                        <TouchableOpacity onPress={showDatePicker}>
                          <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirmDataIni}
                            onCancel={hideDatePicker}
                          />
                          <Input icon="calendar"
                            value={experiencia.dataIni}/>
                        </TouchableOpacity>
                      </View>    
                    </View>
                    <View>
                      <Text style={styles.label}>Fim</Text>
                      <View style={styles.inputeDate}>
                        <TouchableOpacity onPress={showDatePicker}>
                          <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirmDataFin}
                            onCancel={hideDatePicker}
                          />
                          <Input icon="calendar"
                            value={experiencia.dataFin}/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={styles.containerButton}>
                    <Button style={{ width: '49%', backgroundColor: 'red' }} onPress={() => { toggleModalExp() }}>
                      Cancelar
                    </Button>
                    <Button style={{ width: '49%', backgroundColor: 'green' }} onPress={() => { console.log("Experiencia") }}>
                      Gravar
                    </Button>
                  </View>
                </View>
          </Modal>
            <View style={styles.containerButton}>
              <Button style={{ backgroundColor: 'green' }} onPress={async () => { toggleModalExp() }}>
                Incluir Experiência
              </Button>
            </View>

            <View style={styles.containerButton}>
              <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
                Voltar
              </Button>
              <Button style={{ width: '49%' }} onPress={async () => { changePosition() }}>
                Finalizar
              </Button>
            </View>
        </View>
      );
    }



    const CurrentPage = () => {
      if (currentPosition == 1) {
        return Page2()
      } else if (currentPosition == 2) {
        return Page3()
      } else if (currentPosition == 3) {
        return Page4()
      }


      return Page1()
    }

    return(
        <View>
            <View style={styles.stepIndicator}>
              <StepIndicator
                  customStyles={customStyles}
                  currentPosition={currentPosition}
                  stepCount={4}
              />
            </View>
            {CurrentPage()}
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
    },
    label:{
      fontSize:14,
      marginLeft:"8%"
    },
    input:{
        width:'84%',
        height:50,
        marginHorizontal:10,
        borderRadius:10,
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        borderWidth: 1,
        borderColor:'#d3d3d3',
        alignSelf:'center',
        flexDirection:'row'
    },
    stepIndicator:{
      marginBottom:80,
      marginTop:100
    },
    viewButton:{
      marginHorizontal:'10%',
      marginTop:20
    },
    rowView:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginHorizontal:10
    },
    selectPicker: {
      width:'84%',
      height: 45,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#d3d3d3',
      justifyContent: 'center',
      alignSelf:'center',
    },
    containerButton: {
      marginTop: 10,
      marginHorizontal:'10%',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    listaTelefone: {
      marginHorizontal:"10%"
    },
    modal:{
      backgroundColor:'white',
      height:400,
      borderRadius:30,
      padding:10
    },
    inputeDate: {
      minWidth:"50%"
    },
    inputDates:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    }



});
export default EditaC;
