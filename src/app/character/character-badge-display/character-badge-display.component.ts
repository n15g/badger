import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ICharacter} from "../character";
import {BadgeType, IServerGroup} from "coh-content-db";
import {ServerGroupPipe} from "../../server-group/server-group.pipe";
import * as _ from 'lodash';
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import {CharacterDbService} from "../character-db.service";
import {CharacterBadgesPipe, ICharacterBadge} from "../character-badges.pipe";
import {CollectedOnlyPipe} from "../collected-only.pipe";

@Component({
    selector: 'character-badge-display',
    templateUrl: './character-badge-display.component.html',
    styleUrls: ['./character-badge-display.component.scss']
})
export class CharacterBadgeDisplayComponent implements OnInit, OnDestroy {

    missingImageIcon = faQuestionCircle;

    @Input() public character: ICharacter;
    serverGroup: IServerGroup;

    collectedBadges: ICharacterBadge[] = [];

    villain: boolean = false;

    types: string[] = _.values(BadgeType);

    constructor(private serverGroupPipe: ServerGroupPipe,
                private characterBadgesPipe: CharacterBadgesPipe,
                private collectedOnlyPipe: CollectedOnlyPipe,
                private characterDb: CharacterDbService,
                private changeDetector: ChangeDetectorRef) {
        characterDb.watch().subscribe(() => this.update());
    }

    update() {
        this.collectedBadges = this.collectedOnlyPipe.transform(
            this.characterBadgesPipe.transform(this.serverGroup.badges, this.character)
        );
        this.changeDetector.detectChanges();
    }

    ngOnInit(): void {
        this.serverGroup = this.serverGroupPipe.transform(this.character.serverGroupKey);
        this.update();
    }

    ngOnDestroy(): void {
        this.changeDetector.detach();
    }

}
