import { Component, OnInit } from '@angular/core';
import { faExclamationTriangle, faFileImport, faFileUpload, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BsModalService } from "ngx-bootstrap";
import { ContentDbService } from "../../content-db/content-db.service";
import { ICharacter } from "../character";
import { CharacterDbService } from "../character-db.service";
import { CharacterImportModalComponent } from "../character-import-modal/character-import-modal.component";
import { CharacterLogParserModalComponent } from "../character-log-parser-modal/character-log-parser-modal.component";
import { NewCharacterModalComponent } from "../new-character-modal/new-character-modal.component";

@Component({
    selector: 'character-list-page',
    templateUrl: './character-list-page.component.html',
    styleUrls: ['./character-list-page.component.scss']
})
export class CharacterListPageComponent implements OnInit {

    addIcon = faPlus;
    importIcon = faFileImport;
    logParserIcon = faFileUpload;
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

    logParser() {
        this.modalService.show(CharacterLogParserModalComponent);
    }

    ngOnInit(): void {
        this.characterDb.getCharacters().subscribe((characters) => this.characters = characters);
    }
}
