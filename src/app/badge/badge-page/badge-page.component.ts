import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {BadgePartialType, IBadge, IServerGroup} from 'coh-content-db';
import { ICharacter } from '../../character/character';
import { CharacterDbService } from '../../character/character-db.service';
import {BadgeNamePipe} from '../badge-name.pipe';

@Component({
    selector: 'badge-page',
    templateUrl: './badge-page.component.html',
    styleUrls: ['./badge-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BadgePageComponent implements OnInit {

    public serverGroup: IServerGroup;
    public badge: IBadge;

    public partialTypes: typeof BadgePartialType = BadgePartialType;

    public characters: ICharacter[] = [];

    constructor(private route: ActivatedRoute,
                private title: Title,
                private badgeName: BadgeNamePipe,
                private characterDb: CharacterDbService) {
    }

    public ngOnInit() {
        this.route.data.subscribe(data => {
            this.serverGroup = data.serverGroup;
            this.badge = data.badge;
            this.title.setTitle(`${this.badgeName.transform(this.badge)} | ${this.serverGroup.name} | Badger`);
        });
        this.characterDb.getCharacters().subscribe((characters) =>
            this.characters = characters.filter(character =>
                character.badges[this.badge.key] === undefined || character.badges[this.badge.key].owned !== true));
    }
}
