import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {Subject} from "rxjs";
import {ICharacter, newCharacter} from "../character";
import {ContentDbService} from "../../content-db/content-db.service";
import {IServer, IServerGroup} from "coh-content-db";
import {oc} from "ts-optchain";
import {IArchetype} from "coh-content-db/dist/types/archetype";

@Component({
    selector: 'new-character-modal',
    templateUrl: './new-character-modal.component.html',
    styleUrls: ['./new-character-modal.component.scss']
})
export class NewCharacterModalComponent implements OnInit {
    name: string;
    server: string;
    archetype: IArchetype;
    public onSubmit: Subject<ICharacter> = new Subject<ICharacter>();

    public servers: IServer[];
    public archetypes: IArchetype[];

    constructor(public bsModalRef: BsModalRef,
                public contentDb: ContentDbService) {
    }

    private _serverGroup: IServerGroup;

    get serverGroup(): IServerGroup {
        return this._serverGroup;
    }

    set serverGroup(value: IServerGroup) {
        this._serverGroup = value;
        this.servers = oc(this._serverGroup).servers([]);
        this.archetypes = oc(this._serverGroup).archetypes([]);
        this.archetype = this.archetypes[0];
    }

    ngOnInit(): void {
        this.serverGroup = this.contentDb.getServerGroups()[0];
    }

    done() {
        let char = newCharacter(this.name, this._serverGroup.key, this.server, oc(this.archetype).key());
        this.onSubmit.next(char);

        this.bsModalRef.hide();
    }
}
