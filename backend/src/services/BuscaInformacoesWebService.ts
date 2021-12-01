import { Any, getCustomRepository } from "typeorm";
import axios from 'axios';
import { response } from "express";
import UsuariosRepository from "../repositories/UsuariosRepository";

interface IRequestInformacoes {
  candidatos_id: string
}

class BuscaInformacoesWebService {
  async execute({ candidatos_id }: IRequestInformacoes) {
    const usuariosRepository = getCustomRepository(UsuariosRepository);

    const { twitter } = await usuariosRepository.findOne(candidatos_id);

    let idTwitter = '';

    if (twitter) {
      await axios({
        method: 'get',
        url: 'https://api.twitter.com/2/users/by/username/' + twitter,
        headers: {
          "Content-type": "application/json",
          'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAEdPWQEAAAAAZgsx8FmxXfi4rK66xsS3Jltv1lQ%3DoaOfYrtDp1rgXbA9gol4ylVLzbN6SON0NK2iN6YlGyq0FErvge'
        }
      }).then(async response => {
        idTwitter = response.data.data.id;
      });
    }

    let seguindo = <any>[];

    if (idTwitter) {
      await axios({
        method: 'get',
        url: 'https://api.twitter.com/2/users/' + idTwitter + '/following',
        headers: {
          "Content-type": "application/json",
          'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAEdPWQEAAAAAZgsx8FmxXfi4rK66xsS3Jltv1lQ%3DoaOfYrtDp1rgXbA9gol4ylVLzbN6SON0NK2iN6YlGyq0FErvge'
        }
      }).then(async response => {
        seguindo = response.data.data;
      });
    }

    let chavesCulturaPop = [
      'marvel',
      'homem aranha',
      'super man',
      'superman',
      'homen de ferro',
      'super homem',
      'dc',
      'dcuniverse',
      'dc universe',
      'senhordosaneis',
      'senhor dos aneis',
      'manga',
      'anime',
      'quadrinhos',
      'nerd',
      'comic',
      'lotr'
    ];

    let chavesJogos = [
      'wow',
      'worldofwarcraft',
      'world of warcraft',
      'lineage',
      'eso',
      'elderscroll',
      'elder scroll',
      'skyrim',
      'leagueoflegends',
      'league of legends',
      'senhor dos aneis',
      'archeage',
      'newworld',
      'new world',
      'csgo',
      'counter strike',
      'valorant',
      'teamtaticfights',
      'riot',
      'bethesda',
      'blizzard',
      'ubisoft',
      'eagames',
      'origin',
      'epicgames',
      'epic games',
      'steam'
    ];

    let informacoes = <any>[];

    let seguindoCulturaPop = 0;
    for (var i in chavesCulturaPop) {
      for (var j in seguindo) {
        if (seguindo[j].name.toLowerCase().indexOf(chavesCulturaPop[i]) != -1) {
          console.log(seguindo[j].name);
          console.log(chavesCulturaPop[i])
          seguindoCulturaPop++;
        }
      }
    }

    let seguindoJogos = 0;
    for (var i in chavesJogos) {
      for (var j in seguindo) {
        if (seguindo[j].name.toLowerCase().indexOf(chavesJogos[i]) != -1) {
          console.log(seguindo[j].name);
          console.log(chavesJogos[i])
          seguindoJogos++;
        }
      }
    }

    if (seguindoCulturaPop > 1) {
      informacoes.push({ id: informacoes.length, name: 'Gosta de cultura nerd.' });
    }

    if (seguindoJogos > 1) {
      informacoes.push({ id: informacoes.length, name: 'Gosta de jogos eletrônicos.' });
    }

    return informacoes;
  }
}

export default BuscaInformacoesWebService;
