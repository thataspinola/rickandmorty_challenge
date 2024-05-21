import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { CharacterInterface } from "../../../../core/interfaces/characters/character.interface";
import { ManageCharactersService } from "../../../../core/services/characters/manage-characters/manage-characters.service";

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent {
  @Input() dataCard: CharacterInterface;

  // Objeto de caractere padrão para evitar possíveis erros de referência nula
  constructor(private router: Router, private manageCharacterService: ManageCharactersService) {
    this.dataCard = {
      id: 0,
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      origin: {
        name: '',
        url: ''
      },
      location: {
        name: '',
        url: ''
      },
      image: '',
      episode: [],
      url: '',
      created: ''
    };
  }

  // Função chamada quando o botão "Ver Mais" é clicado
  onClick() {
    this.router.navigate(['home/characters-details', this.dataCard!.id]);
  }
}
