import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ContentDbService} from "../../content-db/content-db.service";
import {ICharacter} from "../character";
import {IServerGroup} from "coh-content-db";
import {IArchetype} from "coh-content-db/dist/types/archetype";

@Component({
    selector: 'character-page',
    templateUrl: './character-page.component.html',
    styleUrls: ['./character-page.component.scss']
})
export class CharacterPageComponent {

    public character: ICharacter;
    public serverGroup: IServerGroup;
    public archetype: IArchetype;

    constructor(private route: ActivatedRoute,
                private title: Title,
                private contentDb: ContentDbService) {
    }

    public ngOnInit() {
        this.route.data.subscribe(data => {
            this.character = data["character"];
            this.serverGroup = this.contentDb.getServerGroup(this.character.serverGroupKey);
            this.archetype = this.serverGroup.getArchetype(this.character.archetypeKey);
            this.title.setTitle(`${this.character.name} | Badger`);
        });
    }
}
