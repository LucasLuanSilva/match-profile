const formataCompetencia = (competencia) => {
  if (competencia.nivel == 2) {
    competencia.nivelLabel = 'Avançado';
  } else if (competencia.nivel == 1) {
    competencia.nivelLabel = 'Intermediário';
  } else {
    competencia.nivelLabel = 'Básico';
  }

  return competencia;
}

export default formataCompetencia;
