import {Injectable} from '@angular/core';
import {CollectedBadgesEntry, ICharacter} from "./character";
import * as _ from 'lodash';
import {LocalStorageService, NgxStorageEvent} from "ngx-store";
import {IBadge} from "coh-content-db";
import {oc} from "ts-optchain";
import {Observable} from "rxjs";

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

    public saveCharacter(character: ICharacter): ICharacter {
        const store = this.getStore();

        store.content[character.key] = character;
        this.saveStore(store);

        return character;
    }

    public collectBadge(character: ICharacter, badge: IBadge, owned: boolean): ICharacter {
        const storedCharacter = this.getCharacter(character.key);

        if (!storedCharacter) return;

        const badges = oc(storedCharacter).badges({});
        const newEntry = this.getBadgeEntry(character, badge.key);
        newEntry.owned = owned;

        badges[badge.key] = newEntry;
        storedCharacter.badges = badges;

        return this.saveCharacter(storedCharacter);
    }

    public watch(): Observable<NgxStorageEvent> {
        return this.localStorageService.observe(KEY, false);
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

    private getBadgeEntry(character: ICharacter, badgeKey: string): CollectedBadgesEntry {
        return oc(character).badges[badgeKey]({owned: false});
    }
}


export interface CharacterStore {
    content: { [id: string]: ICharacter };
}
