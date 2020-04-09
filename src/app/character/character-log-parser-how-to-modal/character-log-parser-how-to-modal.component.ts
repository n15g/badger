import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ContentDbService } from "../../content-db/content-db.service";
import { CharacterBadgesPipe } from "../character-badges.pipe";
import { CharacterDbService } from "../character-db.service";
import { CharacterLogParserModalComponent } from "../character-log-parser-modal/character-log-parser-modal.component";

@Component({
    selector: 'app-character-log-parser-how-to-modal',
    templateUrl: './character-log-parser-how-to-modal.component.html',
    styleUrls: ['./character-log-parser-how-to-modal.component.scss']
})
export class CharacterLogParserHowToModalComponent {

    constructor(
        public bsModalRef: BsModalRef,
        private modalService: BsModalService) {
    }

    back() {
        this.modalService.show(CharacterLogParserModalComponent);
    }


    close() {
        this.bsModalRef.hide();
    }
}
