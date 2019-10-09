import {Injectable} from '@angular/core';
import {CollectedBadgesEntry, ICharacter} from "./character";
import * as _ from 'lodash';
import {LocalStorageService} from "ngx-store";
import {IBadge, IBadgePartial} from "coh-content-db";
import {oc} from "ts-optchain";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

const KEY = "characters";

@Injectable({
    providedIn: 'root'
})
export class CharacterDbService {
    private readonly store: BehaviorSubject<CharacterStore>;

    constructor(private localStorageService: LocalStorageService) {
        this.store = new BehaviorSubject<CharacterStore>(this._loadStore());

        this.localStorageService.observe(KEY, false)
            .subscribe(() => this.store.next(this._loadStore()));
    }

    public getCharacters(): Observable<ICharacter[]> {
        return this.store.pipe(map((store) => _.values(store.content).filter(x => x != undefined)));
    }

    public getCharacter(key: string): Observable<ICharacter> | null {
        return this.store.pipe(map(() => this._getCharacter(key)));
    }

    public saveCharacter(character: ICharacter): ICharacter {
        const store = this.store.value;

        store.content[character.key] = character;
        this.saveStore(store);

        return character;
    }

    public deleteCharacter(character: ICharacter): void {
        const store = this.store.value;

        delete store.content[character.key];
        this.saveStore(store);
    }

    public collectBadge(character: ICharacter, badge: IBadge, owned: boolean): ICharacter {
        const storedCharacter = this._getCharacter(character.key);

        if (!storedCharacter) return;

        const badges = oc(storedCharacter).badges({});
        const newEntry = this.getBadgeEntry(character, badge.key);
        newEntry.owned = owned;

        badges[badge.key] = newEntry;
        storedCharacter.badges = badges;

        return this.saveCharacter(storedCharacter);
    }

    public collectPartial(character: ICharacter, partial: IBadgePartial, owned: boolean, count?: number): ICharacter {
        const storedCharacter = this._getCharacter(character.key);

        if (!storedCharacter) return;

        const badges = oc(storedCharacter).badges({});
        const newBadgeEntry = this.getBadgeEntry(character, partial.parent.key);
        if (!newBadgeEntry.partials) newBadgeEntry.partials = {};

        const newPartialEntry = newBadgeEntry.partials[partial.key] || {owned: owned};
        newPartialEntry.owned = owned;
        newPartialEntry.craftCount = count;
        newBadgeEntry.partials[partial.key] = newPartialEntry;

        badges[partial.parent.key] = newBadgeEntry;
        storedCharacter.badges = badges;

        return this.saveCharacter(storedCharacter);
    }

    private _loadStore(): CharacterStore {
        let store = this.localStorageService.get(KEY) as CharacterStore;
        if (!store) {
            return {content: {}};
        }
        return store;
    }

    private _getCharacter(key: string): ICharacter | undefined {
        return oc(this.store.value).content[key]();
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
