import {Component, Input, OnInit} from '@angular/core';
import {ICharacter} from "../character";
import {BadgeType, IServerGroup} from "coh-content-db";
import {ServerGroupPipe} from "../../server-group/server-group.pipe";
import * as _ from 'lodash';
import {CharacterDbService} from "../character-db.service";
import {CharacterBadgesPipe, ICharacterBadge} from "../character-badges.pipe";
import {CollectedOnlyPipe} from "../collected-only.pipe";

@Component({
    selector: 'character-badge-display',
    templateUrl: './character-badge-display.component.html',
    styleUrls: ['./character-badge-display.component.scss']
})
export class CharacterBadgeDisplayComponent implements OnInit {

    @Input() public character: ICharacter;
    serverGroup: IServerGroup;

    collectedBadges: ICharacterBadge[] = [];

    villain: boolean = false;

    types: string[] = _.values(BadgeType);

    constructor(private serverGroupPipe: ServerGroupPipe,
                private characterBadgesPipe: CharacterBadgesPipe,
                private collectedOnlyPipe: CollectedOnlyPipe,
                private characterDb: CharacterDbService) {
    }

    ngOnInit(): void {
        this.characterDb.getCharacter(this.character.key).subscribe((character) => {
            this.character = character;
            return this.update();
        });

        this.serverGroup = this.serverGroupPipe.transform(this.character.serverGroupKey);
        this.update();
    }

    update() {
        this.collectedBadges = this.collectedOnlyPipe.transform(
            this.characterBadgesPipe.transform(this.character)
        );
    }
}
