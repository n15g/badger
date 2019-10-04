import {Component} from '@angular/core';
import {ContentDbService} from "../../content-db/content-db.service";
import {BsModalService} from "ngx-bootstrap";
import {NewCharacterModalComponent} from "../new-character-modal/new-character-modal.component";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {CharacterDbService} from "../character-db.service";

@Component({
    selector: 'character-list-page',
    templateUrl: './character-list-page.component.html',
    styleUrls: ['./character-list-page.component.scss']
})
export class CharacterListPageComponent {

    addIcon = faPlus;

    constructor(private modalService: BsModalService,
                private contentDb: ContentDbService,
                private characterDb: CharacterDbService) {
    }

    newCharacter() {
        (this.modalService.show(NewCharacterModalComponent).content as NewCharacterModalComponent)
            .onSubmit.subscribe((char) => this.characterDb.addCharacter(char));
    }

    getCharacters() {
        return this.characterDb.getCharacters();
    }
}
