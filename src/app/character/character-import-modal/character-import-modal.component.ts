import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {ICharacter} from "../character";
import * as pako from "pako";
import {Base64} from 'js-base64';
import {CharacterDbService} from "../character-db.service";

@Component({
    selector: 'character-import-modal',
    templateUrl: './character-import-modal.component.html',
    styleUrls: ['./character-import-modal.component.scss']
})
export class CharacterImportModalComponent {

    character: ICharacter;

    importString: string;
    error: string;

    constructor(
        public bsModalRef: BsModalRef,
        private charDb: CharacterDbService
    ) {
    }

    doImport() {
        const prefix = "BADGER|";

        this.error = "";
        if (!this.importString.startsWith(prefix)) {
            this.error = "Unrecognized format";
        }

        const encoded = this.importString.substr(this.importString.indexOf("|||"));

        const character: ICharacter = JSON.parse(
            pako.ungzip(Base64.decode(encoded), {to: "string"})
        );

        console.debug("Importing", character);

        this.charDb.saveCharacter(character);

        this.bsModalRef.hide();
    }
}
