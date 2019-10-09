import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ContentDbService} from "../../content-db/content-db.service";
import {ICharacter} from "../character";
import {IServerGroup} from "coh-content-db";
import {IArchetype} from "coh-content-db/dist/types/archetype";
import {BsModalService, TabsetComponent} from "ngx-bootstrap";
import {SessionStorage} from "ngx-store";
import {CharacterExportModalComponent} from "../character-export-modal/character-export-modal.component";
import {CharacterDbService} from "../character-db.service";
import {faFileExport, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import {CharacterRenameModalComponent} from "../character-rename-modal/character-rename-modal.component";

@Component({
    selector: 'character-page',
    templateUrl: './character-page.component.html',
    styleUrls: ['./character-page.component.scss']
})
export class CharacterPageComponent implements OnInit {

    renameIcon = faPencilAlt;
    exportIcon = faFileExport;
    deleteIcon = faTrash;

    public character: ICharacter;
    public serverGroup: IServerGroup;
    public archetype: IArchetype;

    @SessionStorage("character.tab")
    public activeTab: string = "Display";

    @ViewChild(TabsetComponent, {static: false}) tabs: TabsetComponent;

    constructor(private route: ActivatedRoute,
                private title: Title,
                private modalService: BsModalService,
                private contentDb: ContentDbService,
                private charDb: CharacterDbService,
                private router: Router) {
    }

    public ngOnInit() {
        this.route.data.subscribe(data => {
            this.character = data["character"];
            this.serverGroup = this.contentDb.getServerGroup(this.character.serverGroupKey);
            this.archetype = this.serverGroup.getArchetype(this.character.archetypeKey);
            this.title.setTitle(`${this.character.name} | Badger`);

            this.charDb.getCharacter(this.character.key).subscribe((character) => this.character = character);
        });

    }

    public exportCharacter() {
        this.modalService.show(CharacterExportModalComponent, {initialState: {character: this.character}});
    }

    public rename() {
        let modal = this.modalService.show(CharacterRenameModalComponent, {initialState: {name: this.character.name}}).content as CharacterRenameModalComponent;
        modal.onSubmit.subscribe((name) => {
            this.character.name = name;
            this.charDb.saveCharacter(this.character);
        });
    }

    public async delete() {
        const confirmed = confirm(`Are you sure you want to delete ${this.character.name}?`);

        if (confirmed) {
            await this.router.navigate(["/character"]);
            this.charDb.deleteCharacter(this.character);
        }
    }
}
