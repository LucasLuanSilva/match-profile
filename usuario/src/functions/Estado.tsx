interface IEstado {
  sigla: string,
  nome: string
}

class Estado {
  static getEstados() {
    const estados: IEstado[] = [
      {
        sigla: 'AC',
        nome: 'Acre'
      },
      {
        sigla: 'AL',
        nome: 'Alagoas'
      },
      {
        sigla: 'AP',
        nome: 'Amapá'
      },
      {
        sigla: 'AM',
        nome: 'Amazonas'
      },
      {
        sigla: 'BA',
        nome: 'Bahia'
      },
      {
        sigla: 'CE',
        nome: 'Ceará'
      },
      {
        sigla: 'ES',
        nome: 'Espírito Santo'
      },
      {
        sigla: 'GO',
        nome: 'Goiás'
      },
      {
        sigla: 'MA',
        nome: 'Maranhão'
      },
      {
        sigla: 'MT',
        nome: 'Mato Grosso'
      },
      {
        sigla: 'MS',
        nome: 'Mato Grosso do Sul'
      },
      {
        sigla: 'MG',
        nome: 'Minas Gerais'
      },
      {
        sigla: 'PA',
        nome: 'Pará'
      },
      {
        sigla: 'PB',
        nome: 'Paraíba'
      },
      {
        sigla: 'PR',
        nome: 'Paraná'
      },
      {
        sigla: 'PE',
        nome: 'Pernambuco'
      },
      {
        sigla: 'PI',
        nome: 'Pernambuco'
      },
      {
        sigla: 'RJ',
        nome: 'Rio de Janeiro'
      },
      {
        sigla: 'RN',
        nome: 'Rio Grande do Norte'
      },
      {
        sigla: 'RS',
        nome: 'Rio Grande do Sul'
      },
      {
        sigla: 'RO',
        nome: 'Rondônia'
      },
      {
        sigla: 'RR',
        nome: 'Roraima'
      },
      {
        sigla: 'SC',
        nome: 'Santa Catarina'
      },
      {
        sigla: 'SP',
        nome: 'São Paulo'
      },
      {
        sigla: 'SE',
        nome: 'Sergipe'
      },
      {
        sigla: 'TO',
        nome: 'Tocantins'
      },
      {
        sigla: 'DF',
        nome: 'Distrito Federal'
      },
    ];

    return estados;
  }
}

export default Estado;
