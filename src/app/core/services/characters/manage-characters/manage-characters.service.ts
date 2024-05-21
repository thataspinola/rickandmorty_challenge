import { Injectable } from '@angular/core';
import { CharacterInterface } from '../../../interfaces/characters/character.interface';
import { ListCharactersService } from '../list-characters/list-characters.service';
import { Observable } from 'rxjs';
import { EpisodeInterface } from '../../../interfaces/episodes/episodes.interface';

@Injectable({
  providedIn: 'root'
})
export class ManageCharactersService {
  constructor(private listCharactersServices: ListCharactersService) { }

  private _listCharacters: Array<CharacterInterface> = [];

  public get getlistCharacters(): Array<CharacterInterface> {
    return this._listCharacters;
  }

  public setListCharacters(value: Array<CharacterInterface>) {
    this._listCharacters = value;
  }

  public getOnlyCharacter(id: number): Observable<CharacterInterface> {
    return this.listCharactersServices.getOnlyCharacter(id);
  }

  public  getEpisodeByUrl(url: string): Observable<EpisodeInterface>{
    return this.listCharactersServices.getEpisodies(url);
  }
}
