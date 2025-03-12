import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Subject} from 'rxjs';
import {ICharacter} from '../character';
import {IServer, IServerGroup} from 'coh-content-db';
import {IArchetype} from 'coh-content-db/dist/types/archetype';
import {oc} from 'ts-optchain';
import {ContentDbService} from '../../content-db/content-db.service';

@Component({
    selector: 'character-rename-modal',
    templateUrl: './character-rename-modal.component.html',
    styleUrls: ['./character-rename-modal.component.scss']
})
export class CharacterRenameModalComponent implements OnInit {

    public onSubmit: Subject<ICharacter> = new Subject<ICharacter>();

    public character: ICharacter;

    public servers: IServer[];
    public archetypes: IArchetype[];

    private _serverGroup: IServerGroup;

    get serverGroup(): IServerGroup {
        return this._serverGroup;
    }

    set serverGroup(value: IServerGroup) {
        this._serverGroup = value;
        this.servers = oc(this._serverGroup).servers([]);
        this.archetypes = oc(this._serverGroup).archetypes([]);
    }

    private _archetype: IArchetype;

    get archetype(): IArchetype {
        return this._archetype;
    }

    set archetype(value: IArchetype) {
        this._archetype = value;
        this.character.archetypeKey = value.key;
    }

    constructor(public bsModalRef: BsModalRef,
                public contentDb: ContentDbService) {
    }

    ngOnInit(): void {
        this.serverGroup = this.contentDb.getServerGroup(this.character.serverGroupKey);
        this.archetype = this.serverGroup.getArchetype(this.character.archetypeKey);
    }

    public submit() {
        this.onSubmit.next(this.character);
        this.bsModalRef.hide();
    }
}
