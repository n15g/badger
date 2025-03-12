import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {ICharacter} from "../character";
import * as pako from "pako";
import {Base64} from 'js-base64';

@Component({
    selector: 'character-export-modal',
    templateUrl: './character-export-modal.component.html',
    styleUrls: ['./character-export-modal.component.scss']
})
export class CharacterExportModalComponent implements OnInit {

    character: ICharacter;

    exportString: string;

    constructor(
        public bsModalRef: BsModalRef
    ) {
    }

    ngOnInit() {
        this.exportString =
            `BADGER|${this.character.serverGroupKey}|${encodeURIComponent(this.character.server)}|${encodeURIComponent(this.character.name)}|||` +
            Base64.encode(
                pako.gzip(JSON.stringify(this.character), {to: "string"})
            );
    }
}
