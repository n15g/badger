import {Injectable} from '@angular/core';
import {ICharacter} from "./character";
import * as _ from 'lodash';
import {LocalStorageService} from "ngx-store";

const KEY = "characters";

@Injectable({
    providedIn: 'root'
})
export class CharacterDbService {
    constructor(private localStorageService: LocalStorageService) {
    }

    public addCharacter(character: ICharacter): void {
        const store = this.getStore();

        store.content[character.key] = character;

        this.saveStore(store);
    }

    public getCharacters(): ICharacter[] {
        return _.values(this.getStore().content);
    }

    public getCharacter(key: string): ICharacter | null {
        return this.getStore().content[key];
    }

    private getStore(): CharacterStore {
        let store = this.localStorageService.get(KEY) as CharacterStore;
        if (!store) {
            return {content: {}};
        }
        return store;
    }

    private saveStore(store: CharacterStore): void {
        this.localStorageService.set(KEY, store);
    }
}


export interface CharacterStore {
    content: { [id: string]: ICharacter };
}
