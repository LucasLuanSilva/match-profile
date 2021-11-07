const formataEscolaridade = (escolaridade) => {
  //0 = Fundamental, 1 = Médio, 2 = Superior, 3 = Pós-graduação, 4 = Mestrado, 5 = Doutorado
  if (escolaridade.nivel == 5) {
    escolaridade.nivelLabel = 'Doutorado';
  } else if (escolaridade.nivel == 4) {
    escolaridade.nivelLabel = 'Mestrado';
  } else if (escolaridade.nivel == 3) {
    escolaridade.nivelLabel = 'Pós-graduação';
  } else if (escolaridade.nivel == 2) {
    escolaridade.nivelLabel = 'Ensino Superior';
  } else if (escolaridade.nivel == 1) {
    escolaridade.nivelLabel = 'Ensino Médio';
  } else {
    escolaridade.nivelLabel = 'Ensino Fundamental';
  }

  if (escolaridade.cursando == 2) {
    escolaridade.cursandoLabel = 'Completo';
  } else if (escolaridade.cursando == 1) {
    escolaridade.cursandoLabel = 'Cursando';
  } else {
    escolaridade.cursandoLabel = 'Incompleto';
  }

  return escolaridade;
}

export default formataEscolaridade;
