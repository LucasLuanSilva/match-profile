const formataTelefone = (ddd: String, numero: String) => {
  let telefone = '(' + ddd + ') ';

  if (numero.length > 8) {
    telefone += numero.substring(0, 5) + '-' + numero.substring(5);
  } else {
    telefone += numero.substring(0, 4) + '-' + numero.substring(4);
  }

  return telefone;
}

export default formataTelefone;
