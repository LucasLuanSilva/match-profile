import axios from "axios";
import { Alert } from "react-native";

interface ICep {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string
}

const getInfoCep = async (cep: string) => {
  let infoCep: ICep;
  await axios.get('https://viacep.com.br/ws/' + cep + '/json/').then((response) => {
    const {
      cep,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
      ibge
    } = response.data;

    infoCep = {
      cep,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
      ibge
    }
  }).catch((error) => {
    Alert.alert(error.response.data.error);
  });

  return infoCep;
}

export { getInfoCep };
