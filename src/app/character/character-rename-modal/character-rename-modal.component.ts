import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {Subject} from "rxjs";

@Component({
    selector: 'character-rename-modal',
    templateUrl: './character-rename-modal.component.html',
    styleUrls: ['./character-rename-modal.component.scss']
})
export class CharacterRenameModalComponent {

    public onSubmit: Subject<string> = new Subject<string>();

    public name: string;

    constructor(public bsModalRef: BsModalRef) {
    }

    public submit() {
        this.onSubmit.next(this.name);
        this.bsModalRef.hide();
    }
}
