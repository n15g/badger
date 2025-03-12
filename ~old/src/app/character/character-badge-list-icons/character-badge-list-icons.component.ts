import {Component, Input} from '@angular/core';
import {IBadge} from 'coh-content-db';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import {ICharacter} from '../character';
import {CharacterDbService} from '../character-db.service';

@Component({
    selector: 'character-badge-list-icons',
    templateUrl: './character-badge-list-icons.component.html',
    styleUrls: ['./character-badge-list-icons.component.scss']
})
export class CharacterBadgeListIconsComponent {
    @Input() public character: ICharacter;
    @Input() public badges: IBadge[];
    @Input() public villain: boolean = false;

    missingImageIcon = faQuestionCircle;

    constructor(private characterDb: CharacterDbService) {
    }

    isCollected(badge: IBadge): boolean {
        return this.characterDb.hasBadge(this.character, badge);
    }
}
