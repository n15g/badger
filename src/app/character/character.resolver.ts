import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {ICharacter} from "./character";
import {CharacterDbService} from "./character-db.service";
import {Observable} from "rxjs";
import {first} from "rxjs/operators";

@Injectable()
export class CharacterResolver implements Resolve<ICharacter> {

    constructor(private characterService: CharacterDbService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICharacter> {
        const characterKey = route.params["characterKey"];

        return this.characterService.getCharacter(characterKey).pipe(first());
    }
}
