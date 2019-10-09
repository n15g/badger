import {Component, OnInit} from '@angular/core';
import {ContentDbService} from "../../content-db/content-db.service";
import {BsModalService} from "ngx-bootstrap";
import {NewCharacterModalComponent} from "../new-character-modal/new-character-modal.component";
import {CharacterDbService} from "../character-db.service";
import {faExclamationTriangle, faFileImport, faPlus} from "@fortawesome/free-solid-svg-icons";
import {CharacterImportModalComponent} from "../character-import-modal/character-import-modal.component";
import {ICharacter} from "../character";

@Component({
    selector: 'character-list-page',
    templateUrl: './character-list-page.component.html',
    styleUrls: ['./character-list-page.component.scss']
})
export class CharacterListPageComponent implements OnInit {

    addIcon = faPlus;
    importIcon = faFileImport;
    warningIcon = faExclamationTriangle;

    characters: ICharacter[] = [];

    constructor(private modalService: BsModalService,
                private contentDb: ContentDbService,
                private characterDb: CharacterDbService) {
    }

    newCharacter() {
        (this.modalService.show(NewCharacterModalComponent).content as NewCharacterModalComponent)
            .onSubmit.subscribe((char) => this.characterDb.saveCharacter(char));
    }

    importCharacter() {
        this.modalService.show(CharacterImportModalComponent);
    }

    ngOnInit(): void {
        this.characterDb.getCharacters().subscribe((characters) => this.characters = characters);
    }
}
