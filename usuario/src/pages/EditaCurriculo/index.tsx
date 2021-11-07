import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import Button from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import TextInputMask from 'react-native-text-input-mask';
import { Container, customStyles } from './styles';
import { Picker } from '@react-native-picker/picker'
import StepIndicator from 'react-native-step-indicator';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import Input from '../../components/Input';
import dayjs from 'dayjs';
import api from '../../services/api';
import ListItem from '../../components/ListItem'
import formataEscolaridade from '../../functions/FormataEscolaridade';
import formataCompetencia from '../../functions/FormataCompetencia';



const EditaC: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dados = route.params.dados;
  console.log(dados);

  useEffect(async () => {
    await listaTelefones();
    await listaGraduacao();
    await listaCurso();
    await listaExperiencia();
    await listaCompetencia();
  }, []);

  const [currentPosition, setPosition] = useState(0);

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


  const [isModalVisibleTel, setModalVisibleTel] = useState(false);

  const toggleModalTel = () => {
    setModalVisibleTel(!isModalVisibleTel);
  };


  const [telefones, setTelefones] = useState([]);

  const [telefone, setTelefone] = useState({
    id: '',
    ddd: '',
    numero: '',
    tipo: 0,
    contato: ''
  });

  const deletarTelefone = async (index, id) => {
    var copiaTelefones = JSON.parse(JSON.stringify(telefones));
    copiaTelefones.splice(index, 1);

    setTelefones(copiaTelefones);
    await api.delete('telefones/' + id).then(
      (response) => {
        Alert.alert("Telefone excluído com sucesso!");
      }
    ).catch(
      (error) => {
        Alert.alert(error.response.data.error);
        console.log(error)
      }
    );
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

  const incluirTelefone = async () => {
    const { numero } = telefone;
    let fone = numero.replace(/[^a-z0-9]/gi, '')
    telefone.ddd = fone.substr(0, 2);
    telefone.numero = fone.substr(2);

    if (telefone.numero.length < 8) {
      return Alert.alert("Informe um número valido !");
    }

    if (telefone.id == '') {
      await api.post('telefones', telefone).then(
        (response) => {
          telefone.id = response.data.id;

          listaTelefones()
          Alert.alert("Telefone salvo com sucesso!");
          toggleModalTel();
          telefone.id = ''
          telefone.ddd = ''
          telefone.numero = ''
          telefone.tipo = 0
          telefone.contato = ''
        }
      ).catch(
        (error) => {
          Alert.alert(error.response.data.error);
        }
      );
    } else {
      await api.put('telefones', telefone).then(
        (response) => {
          Alert.alert("Telefone salvo com sucesso!");
          toggleModalTel();
          telefone.id = ''
          telefone.ddd = ''
          telefone.numero = ''
          telefone.tipo = 0
          telefone.contato = ''
          listaTelefones()
        }
      ).catch(
        (error) => {
          Alert.alert(error.response.data.error);
          console.log(error)
        }
      );
    }
  }

  const listaTelefones = async () => {
    await api.get('telefones').then(
      (response) => {
        setTelefones(response.data);
      }
    ).catch(
      (error) => {
        Alert.alert(error.response.data.error);
        console.log(error)
      }
    );
  }

  const editarTelefone = (tel) => {
    tel.numero = tel.ddd + tel.numero
    setTelefone(tel)
    toggleModalTel();
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
                onValueChange={(value, itemIndex) =>
                  setTelefone({ ...telefone, ['tipo']: value })
                }
              >
                <Picker.Item key={0} value={0} label="Residencial" />
                <Picker.Item key={1} value={1} label="Pessoal" />
                <Picker.Item key={2} value={2} label="Contato" />
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
          data={telefones}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              title={formataTelefone(item.ddd, item.numero)}
              subtitle={item.contato}
              handleRight={() => deletarTelefone(index, item.id)}
              onPress={() => editarTelefone(item)}
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
          <Button onPress={async () => { changePosition() }}>
            Próximo
          </Button>
        </View>
      </View>
    );
  }

  const [isModalVisibleGraduacao, setModalVisibleGraduacao] = useState(false);

  const toggleModalGraduacao = () => {
    setModalVisibleGraduacao(!isModalVisibleGraduacao);
  };

  const [graduacaos, setGraduacaos] = useState([]);

  const [graduacao, setGraduacao] = useState({
    id: "",
    nivel: 0,
    nome: "",
    descricao: "",
    instituicao: "",
    ano_inicio: "",
    ano_termino: "",
    cursando: 0,
    curriculos_id: ""

  });

  const incluirGraduacao = async () => {
    if (graduacao.id == '') {
      graduacao.curriculos_id = dados
      await api.post('graduacao', graduacao).then(
        (response) => {
          graduacao.id = response.data.id;
          Alert.alert("Graduacao incluida com sucesso");
          listaGraduacao()
          toggleModalGraduacao();
          graduacao.id = ''
          graduacao.nome = ''
          graduacao.nivel = 0
          graduacao.descricao = ''
          graduacao.instituicao = ''
          graduacao.ano_inicio = ''
          graduacao.ano_termino = ''
          graduacao.cursando = 0
          graduacao.curriculos_id = ''
        }
      )
        .catch(
          (error) => {
            Alert.alert(error.response.data.message);
            console.log(error)
          }
        );
    } else {
      console.log("AQUII02")
      await api.put('graduacao', graduacao).then(
        (response) => {
          Alert.alert("Graduacao salva com sucesso!");
          toggleModalGraduacao();
          graduacao.id = ''
          graduacao.nome = ''
          graduacao.nivel = 0
          graduacao.descricao = ''
          graduacao.instituicao = ''
          graduacao.ano_inicio = ''
          graduacao.ano_termino = ''
          graduacao.cursando = 0
          graduacao.curriculos_id = ''
          listaGraduacao()
        }
      )
        .catch(
          (error) => {
            Alert.alert(error.response.data.error);
            console.log(error)
          }
        );
    }
  }

  const listaGraduacao = async () => {

    await api.get('graduacao/' + dados).then(
      (response) => {
        setGraduacaos(response.data);
      }
    )
      .catch(
        (error) => {
          Alert.alert(error.response.data.message);
          console.log(error)
        }
      );
  }

  const fieldGraduacao = (field) => {
    return (value) => {
      setGraduacao({ ...graduacao, [field]: value });
    }
  }

  const [anos, setAnos] = useState(["2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008"]);

  const deletarGraduacao = async (index, id) => {
    var copiaGraduacaos = JSON.parse(JSON.stringify(graduacaos));
    copiaGraduacaos.splice(index, 1);

    setGraduacaos(copiaGraduacaos);
    await api.delete('graduacao/' + id).then(
      (response) => {
        Alert.alert("Graduacao excluído com sucesso!");
      }
    )
      .catch(
        (error) => {
          Alert.alert(error.response.data.error);
          console.log(error)
        }
      );
  }

  const editarGraduacao = (item) => {
    setGraduacao(item)
    toggleModalGraduacao();
  }

  const Page2 = () => {
    return (
      <View>
        <Modal isVisible={isModalVisibleGraduacao}>
          <View style={styles.modal}>
            <Text style={styles.label}>Escolaridade</Text>
            <View style={styles.selectPicker}>
              <Picker
                key="nivel"
                selectedValue={graduacao.nivel}
                onValueChange={fieldGraduacao('nivel')}
              >
                <Picker.Item key={0} label="Ensino Fundamental" value={0} />
                <Picker.Item key={1} label="Ensino Médio" value={1} />
                <Picker.Item key={2} label="Ensino Superior" value={2} />
                <Picker.Item key={3} label="Pós-graduação" value={3} />
                <Picker.Item key={4} label="Mestrado" value={4} />
                <Picker.Item key={5} label="Doutorado" value={5} />
              </Picker>
            </View>
            <View style={styles.selectPicker}>
              <Picker
                key="cursando"
                selectedValue={graduacao.cursando}
                onValueChange={fieldGraduacao('cursando')}
              >
                <Picker.Item key={0} label="Incompleto" value={0} />
                <Picker.Item key={1} label="Cursando" value={1} />
                <Picker.Item key={2} label="Completo" value={2} />
              </Picker>
            </View>
            <Text style={styles.label}>Instituição</Text>
            <TextInput placeholder="Instituição"
              style={styles.input}
              value={graduacao.instituicao}
              onChangeText={fieldGraduacao('instituicao')} />

            <View style={styles.inputAnos}>
              <View>
                <Text style={styles.labelAnos}>Inicio</Text>
                <View style={styles.selectAno}>
                  <Picker
                    key="ano_inicio"
                    selectedValue={graduacao.ano_inicio}
                    onValueChange={fieldGraduacao('ano_inicio')}
                  >
                    {Object.keys(anos).map((key) => {
                      return (<Picker.Item label={anos[key]} value={anos[key]} key={key} />)
                    })}
                  </Picker>
                </View>
              </View>
              <View>
                <Text style={styles.labelAnos}>Fim</Text>
                <View style={styles.selectAno}>
                  <Picker
                    key="ano_termino"
                    selectedValue={graduacao.ano_termino}
                    onValueChange={fieldGraduacao('ano_termino')}
                  >
                    {Object.keys(anos).map((key) => {
                      return (<Picker.Item label={anos[key]} value={anos[key]} key={key} />)
                    })}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={styles.containerButton}>
              <Button style={{ width: '49%', backgroundColor: 'red' }} onPress={() => { toggleModalGraduacao() }}>
                Cancelar
              </Button>
              <Button style={{ width: '49%', backgroundColor: 'green' }} onPress={() => { incluirGraduacao() }}>
                Gravar
              </Button>
            </View>
          </View>
        </Modal>
        <Text style={styles.label}>Graduações</Text>
        <FlatList
          data={graduacaos}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              title={formataEscolaridade(item).nivelLabel}
              subtitle={item.instituicao}
              handleRight={() => deletarGraduacao(index, item.id)}
              onPress={() => editarGraduacao(item)}
            />
          )}
          ItemSeparatorComponent={() => Separator()}
        />
        <View style={styles.containerButton}>
          <Button style={{ backgroundColor: 'green' }} onPress={async () => { toggleModalGraduacao() }}>
            Incluir Graduação
          </Button>
        </View>
        <View style={styles.containerButton}>
          <Button style={{ width: '49%' }} onPress={() => { backPosition() }}>
            Voltar
          </Button>
          <Button style={{ width: '49%' }} onPress={async () => { changePosition() }}>
            Próximo
          </Button>
        </View>
      </View>
    );
  }


  const [isModalVisibleCurso, setModalVisibleCurso] = useState(false);

  const toggleModalCurso = () => {
    setModalVisibleCurso(!isModalVisibleCurso);
  };

  const [cursos, setCursos] = useState([]);

  const [curso, setCurso] = useState({
    id: "",
    nome: "",
    instituicao: "",
    data_inicio: dayjs().format('DD/MM/YYYY'),
    data_termino: dayjs().format('DD/MM/YYYY'),
    curriculos_id: ""
  });

  const incluirCurso = async () => {
    if (curso.id == '') {
      curso.curriculos_id = dados
      await api.post('cursos', curso).then(
        (response) => {
          console.log(response.data)
          curso.id = response.data.id;
          Alert.alert("Curso salvo com sucesso!");
          listaCurso()
          toggleModalCurso();
          curso.id = ''
          curso.nome = ''
          curso.instituicao = ''
          curso.data_inicio = ''
          curso.data_termino = ''
          curso.curriculos_id = ''
        }
      )
        .catch(
          (error) => {
            Alert.alert(error.response.data.message);
            console.log(error)
          }
        );
    } else {
      await api.put('cursos', curso).then(
        (response) => {
          Alert.alert("Curso salvo com sucesso!");
          toggleModalCurso();
          curso.id = ''
          curso.nome = ''
          curso.instituicao = ''
          curso.data_inicio = ''
          curso.data_termino = ''
          curso.curriculos_id = ''
          listaCurso()
        }
      )
        .catch(
          (error) => {
            Alert.alert(error.response.data.error);
            console.log(error)
          }
        );
    }
  }

  const listaCurso = async () => {

    await api.get('cursos/' + dados).then(
      (response) => {
        console.log(response)
        setCursos(response.data);
      }
    )
      .catch(
        (error) => {
          Alert.alert(error.response.data.message);
          console.log(error)
        }
      );
  }

  const cursoDataIni = (date) => {
    setCurso({ ...curso, ['data_inicio']: date });
    hideDatePicker();
  };

  const cursoDataFin = (date) => {
    setCurso({ ...curso, ['data_termino']: date });
    hideDatePicker();
  };


  const fieldCurso = (field) => {
    return (value) => {
      setCurso({ ...curso, [field]: value });
    }
  }

  const deletarCurso = async (index, id) => {
    var copiaCursos = JSON.parse(JSON.stringify(cursos));
    copiaCursos.splice(index, 1);

    setCursos(copiaCursos);
    await api.delete('cursos/' + id).then(
      (response) => {
        Alert.alert("Curso excluído com sucesso!");
      }
    )
      .catch(
        (error) => {
          Alert.alert(error.response.data.error);
          console.log(error)
        }
      );
  }

  const editarCurso = (item) => {
    setCurso(item)
    toggleModalCurso();
  }

  const Page3 = () => {
    return (
      <View>
        <Modal isVisible={isModalVisibleCurso}>
          <View style={styles.modal}>
            <Text style={styles.label}>Curso</Text>
            <TextInput placeholder="Informe seu curso"
              style={styles.input}
              value={curso.nome}
              onChangeText={fieldCurso('nome')} />
            <Text style={styles.label}>Instituição</Text>
            <TextInput placeholder="Informe a instituição"
              style={styles.input}
              value={curso.instituicao}
              onChangeText={fieldCurso('instituicao')} />
            <View style={styles.inputDates}>
              <View>
                <Text style={styles.label}>Inicio</Text>
                <View style={styles.inputeDate}>
                  <TouchableOpacity onPress={showDatePicker}>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={cursoDataIni}
                      onCancel={hideDatePicker}
                    />
                    <Input icon="calendar"
                      value={dayjs(curso.data_inicio).format('DD/MM/YYYY')} />
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
                      onConfirm={cursoDataFin}
                      onCancel={hideDatePicker}
                    />
                    <Input icon="calendar"
                      value={dayjs(curso.data_termino).format('DD/MM/YYYY')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.containerButton}>
              <Button style={{ width: '49%', backgroundColor: 'red' }} onPress={() => { toggleModalCurso() }}>
                Cancelar
              </Button>
              <Button style={{ width: '49%', backgroundColor: 'green' }} onPress={() => { incluirCurso() }}>
                Gravar
              </Button>
            </View>
          </View>
        </Modal>
        <Text style={styles.label}>Cursos</Text>
        <FlatList
          data={cursos}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              title={item.nome}
              subtitle={item.instituicao}
              handleRight={() => deletarCurso(index, item.id)}
              onPress={() => editarCurso(item)}
            />
          )}
          ItemSeparatorComponent={() => Separator()}
        />
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
            Próximo
          </Button>
        </View>
      </View>
    );
  }

  const [isModalVisibleExp, setModalVisibleExp] = useState(false);

  const toggleModalExp = () => {
    setModalVisibleExp(!isModalVisibleExp);
  };

  const [experiencias, setExperiencias] = useState([]);

  const [experiencia, setExperiencia] = useState({
    id: "",
    empresa: '',
    cargo: "",
    descricao: "",
    data_inicio: dayjs().format('DD/MM/YYYY'),
    data_termino: dayjs().format('DD/MM/YYYY'),
    curriculos_id: ""
  });

  const incluirExperiencia = async () => {
    if (experiencia.id == '') {
      experiencia.curriculos_id = dados

      await api.post('experiencias', experiencia).then(
        (response) => {
          console.log(response.data)
          experiencia.id = response.data.id;
          Alert.alert("Experiência salva com sucesso!");
          listaExperiencia()
          toggleModalExp();
          experiencia.id = ''
          experiencia.cargo = ''
          experiencia.descricao = ''
          experiencia.empresa = ''
          experiencia.data_inicio = ''
          experiencia.data_termino = ''
          experiencia.curriculos_id = ''
        }
      )
        .catch(
          (error) => {
            Alert.alert(error.response.data.message);
            console.log(error)
          }
        );
    } else {
      await api.put('experiencias', experiencia).then(
        (response) => {
          Alert.alert("Experiência salva com sucesso!");
          toggleModalExp();
          experiencia.id = ''
          experiencia.cargo = ''
          experiencia.descricao = ''
          experiencia.empresa = ''
          experiencia.data_inicio = ''
          experiencia.data_termino = ''
          experiencia.curriculos_id = ''
          listaExperiencia()
        }
      )
        .catch(
          (error) => {
            Alert.alert(error.response.data.error);
            console.log(error)
          }
        );
    }
  }

  const listaExperiencia = async () => {

    await api.get('experiencias/' + dados).then(
      (response) => {
        console.log(response)
        setExperiencias(response.data);
      }
    )
      .catch(
        (error) => {
          Alert.alert(error.response.data.message);
          console.log(error)
        }
      );
  }

  const experienciaDataIni = (date) => {
    setExperiencia({ ...experiencia, ['data_inicio']: date });
    hideDatePicker();
  };

  const experienciaDataFin = (date) => {
    setExperiencia({ ...experiencia, ['data_termino']: date });
    hideDatePicker();
  };


  const fieldExperiencia = (field) => {
    return (value) => {
      setExperiencia({ ...experiencia, [field]: value });
    }
  }

  const deletarExperiencia = async (index, id) => {
    var copiaExperiencias = JSON.parse(JSON.stringify(experiencias));
    copiaExperiencias.splice(index, 1);

    setExperiencias(copiaExperiencias);
    await api.delete('experiencias/' + id).then(
      (response) => {
        Alert.alert("Experiencia excluído com sucesso!");
      }
    )
      .catch(
        (error) => {
          Alert.alert(error.response.data.error);
          console.log(error)
        }
      );
  }

  const editarExperiencia = (item) => {
    setExperiencia(item)
    toggleModalExp();
  }
  const Page4 = () => {
    return (
      <View>
        <Modal isVisible={isModalVisibleExp}>
          <View style={styles.modal}>
            <Text style={styles.label}>Empresa</Text>
            <TextInput placeholder="Empresa"
              style={styles.input}
              value={experiencia.empresa}
              onChangeText={exp('empresa')} />
            <Text style={styles.label}>Cargo</Text>
            <TextInput placeholder="Cargo"
              style={styles.input}
              value={experiencia.cargo}
              onChangeText={exp('cargo')} />
            <Text style={styles.label}>Descrição</Text>
            <TextInput placeholder="Descrição"
              style={styles.input}
              value={experiencia.descricao}
              onChangeText={exp('descricao')} />
            <View style={styles.inputDates}>
              <View>
                <Text style={styles.label}>Inicio</Text>
                <View style={styles.inputeDate}>
                  <TouchableOpacity onPress={showDatePicker}>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={experienciaDataIni}
                      onCancel={hideDatePicker}
                    />
                    <Input icon="calendar"
                      value={dayjs(experiencia.data_inicio).format('DD/MM/YYYY')} />
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
                      onConfirm={experienciaDataFin}
                      onCancel={hideDatePicker}
                    />
                    <Input icon="calendar"
                      value={dayjs(experiencia.data_termino).format('DD/MM/YYYY')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.containerButton}>
              <Button style={{ width: '49%', backgroundColor: 'red' }} onPress={() => { toggleModalExp() }}>
                Cancelar
              </Button>
              <Button style={{ width: '49%', backgroundColor: 'green' }} onPress={() => { incluirExperiencia() }}>
                Gravar
              </Button>
            </View>
          </View>
        </Modal>
        <Text style={styles.label}>Experiencias</Text>
        <FlatList
          data={experiencias}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              title={item.cargo}
              subtitle={item.empresa}
              handleRight={() => deletarExperiencia(index, item.id)}
              onPress={() => editarExperiencia(item)}
            />
          )}
          ItemSeparatorComponent={() => Separator()}
        />
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
            Próximo
          </Button>
        </View>
      </View>
    );
  }

  const [isModalVisibleComp, setModalVisibleComp] = useState(false);

  const toggleModalComp = () => {
    setModalVisibleComp(!isModalVisibleComp);
  };

  const [competencias, setCompetencias] = useState([]);

  const [competencia, setCompetencia] = useState({
    id: "",
    nivel: 0,
    descricao: "",
    curriculos_id: ""
  });

  const incluirCompetencia = async () => {
    if (competencia.id == '') {
      competencia.curriculos_id = dados

      await api.post('competencias', competencia).then(
        (response) => {
          console.log(response.data)
          competencia.id = response.data.id;
          Alert.alert("Competência salva com sucesso!");
          listaCompetencia()
          toggleModalComp();
          competencia.id = ''
          competencia.nivel = 0
          competencia.descricao = ''
          competencia.curriculos_id = ''
        }
      )
        .catch(
          (error) => {
            Alert.alert(error.response.data.message);
            console.log(error)
          }
        );
    } else {
      await api.put('competencias', competencia).then(
        (response) => {
          Alert.alert("Competência salva com sucesso!");
          toggleModalComp();
          competencia.id = ''
          competencia.nivel = 0
          competencia.descricao = ''
          competencia.curriculos_id = ''
          listaCompetencia()
        }
      )
        .catch(
          (error) => {
            Alert.alert(error.response.data.error);
            console.log(error)
          }
        );
    }
  }

  const listaCompetencia = async () => {

    await api.get('competencias/' + dados).then(
      (response) => {
        console.log(response)
        setCompetencias(response.data);
      }
    )
      .catch(
        (error) => {
          Alert.alert(error.response.data.message);
          console.log(error)
        }
      );
  }

  const fieldCompetencia = (field) => {
    return (value) => {
      setCompetencia({ ...competencia, [field]: value });
    }
  }

  const deletarCompetencia = async (index, id) => {
    var copiaCompetencias = JSON.parse(JSON.stringify(competencias));
    copiaCompetencias.splice(index, 1);

    setCompetencias(copiaCompetencias);
    await api.delete('competencia/' + id).then(
      (response) => {
        Alert.alert("Competencia excluído com sucesso!");
      }
    )
      .catch(
        (error) => {
          Alert.alert(error.response.data.error);
          console.log(error)
        }
      );
  }

  const editarCompetencia = (item) => {
    setCompetencia(item)
    toggleModalComp();
  }

  const Page5 = () => {
    return (
      <View>
        <Modal isVisible={isModalVisibleComp}>
          <View style={styles.modal}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput placeholder="Descrição"
              style={styles.input}
              value={competencia.descricao}
              onChangeText={fieldCompetencia('descricao')} />
            <Text style={styles.label}>Nível</Text>
            <View style={styles.selectPicker}>
              <Picker
                selectedValue={competencia.nivel}
                onValueChange={(value, itemIndex) =>
                  setCompetencia({ ...competencia, ['nivel']: value })
                }
              >
                <Picker.Item key={0} value={0} label="Básico" />
                <Picker.Item key={1} value={1} label="Intermediário" />
                <Picker.Item key={2} value={2} label="Avançado" />
              </Picker>
            </View>
            <View style={styles.containerButton}>
              <Button style={{ width: '49%', backgroundColor: 'red' }} onPress={() => { toggleModalComp() }}>
                Cancelar
              </Button>
              <Button style={{ width: '49%', backgroundColor: 'green' }} onPress={() => { incluirCompetencia() }}>
                Gravar
              </Button>
            </View>
          </View>
        </Modal>
        <Text style={styles.label}>Competências</Text>
        <FlatList
          data={competencias}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              title={item.descricao}
              subtitle={formataCompetencia(item).nivelLabel}
              handleRight={() => deletarCompetencia(index, item.id)}
              onPress={() => editarCompetencia(item)}
            />
          )}
          ItemSeparatorComponent={() => Separator()}
        />
        <View style={styles.containerButton}>
          <Button style={{ backgroundColor: 'green' }} onPress={async () => { toggleModalComp() }}>
            Incluir Competência
          </Button>
        </View>

        <View style={styles.containerButton}>
          <Button onPress={() => { backPosition() }}>
            Voltar
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
    } else if (currentPosition == 4) {
      return Page5()
    }

    return Page1()
  }

  return (
    <Container>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          stepCount={5}
        />
      </View>

      {CurrentPage()}

    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 100,
    marginBottom: 20,
    alignItems: 'flex-start'
  },
  titletext: {
    fontWeight: 'bold',
    fontSize: 20
  },
  subtitletext: {
    fontSize: 16
  },
  label: {
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 45,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  stepIndicator: {
    marginVertical: 20
  },
  selectPicker: {
    width: '100%',
    height: 45,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containerButton: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modal: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  },
  inputeDate: {
    minWidth: '49%',
    borderColor: '#d3d3d3',
    justifyContent: 'space-between'
  },
  selectAno: {
    minWidth: '49%',
    height: 45,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    justifyContent: 'center',
  },
  inputDates: {
    flexDirection: 'row',
    borderColor: '#d3d3d3',
    justifyContent: 'space-between'
  },
  inputAnos: {
    flexDirection: 'row',
    borderColor: '#d3d3d3',
    justifyContent: 'space-between'
  },
  labelAnos: {
    fontSize: 14,
  }
});
export default EditaC;
