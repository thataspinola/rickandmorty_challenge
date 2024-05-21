import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, forkJoin } from 'rxjs';

import { EpisodeInterface } from '../../../../core/interfaces/episodes/episodes.interface';
import { CharacterInterface } from '../../../../core/interfaces/characters/character.interface';
import { ManageCharactersService } from '../../../../core/services/characters/manage-characters/manage-characters.service';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss'],
})
export class CharactersDetailsComponent {
  id: number | undefined;
  character: CharacterInterface | undefined;
  error: boolean = false;
  favorite: boolean = false;
  favoriteList: Array<CharacterInterface> = [];
  firstEpisode: EpisodeInterface | undefined;
  finalEpisode: EpisodeInterface | undefined;

  constructor(
    private route: ActivatedRoute,
    private manageCharactersService: ManageCharactersService,
    private router: Router
  ) {
    // Recuperar personagens favoritos do armazenamento local
    const storedFavorites = localStorage.getItem('favoriteList');
    this.favoriteList = storedFavorites ? JSON.parse(storedFavorites) : [];

    // Subscribe para rotear parâmetros para obter o ID do personagem e buscar detalhes do personagem
    this.route.params.subscribe((params) => {
      this.id = +params['id'];

      // Buscar detalhes do personagem e inicializar
      firstValueFrom(this.manageCharactersService.getOnlyCharacter(this.id))
        .then((data: CharacterInterface) => {
          this.character = data;
          this.initializeCharacter();
          this.loadEpisodes();
        })
        .catch((error) => {
          this.error = true;
        });
    });
  }

  // Carregar episódios relacionados ao personagem
  loadEpisodes() {
    if (this.character && this.character.episode.length > 0) {
      const firstEpisodeUrl = this.character.episode[0];
      const lastEpisodeUrl = this.character.episode[this.character.episode.length - 1];

      forkJoin([
        this.manageCharactersService.getEpisodeByUrl(firstEpisodeUrl),
        this.manageCharactersService.getEpisodeByUrl(lastEpisodeUrl)
      ])
      .subscribe(
        ([firstEpisode, finalEpisode]: [EpisodeInterface, EpisodeInterface]) => {
          this.firstEpisode = firstEpisode;
          this.finalEpisode = finalEpisode;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  // Inicialize o status favorito do personagem
  initializeCharacter() {
    this.favorite = this.favoriteList.some((char) => char.id === this.character?.id);
  }

  // Alternar o status favorito do personagem
  onFavorite(): void {
    this.favorite = !this.favorite;

    if (this.favorite === false) {
      this.removeFromFavorites();
    } else if(this.favorite === true) {
      this.addToFavorites();
    }
  }

  // Adicione o personagem à lista de favoritos
  addToFavorites(): void {
    const isCharacterAlreadyFavorited = this.favoriteList.find(
      (char) => char.id === this.character?.id
    );

    if (!isCharacterAlreadyFavorited) {
      this.favoriteList.push(this.character!);
      localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
    }
  }

  // Remova o personagem da lista de favoritos
  removeFromFavorites(): void {
    const updatedList = this.favoriteList.filter((char) => char.id !== this.character?.id);
    localStorage.setItem('favoriteList', JSON.stringify(updatedList));
  }

  // Navegue de volta para a lista de personagens
  onClick() {
    this.router.navigate(['home/list-characters']);
  }
}
