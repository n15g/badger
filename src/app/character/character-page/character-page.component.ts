import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ContentDbService} from "../../content-db/content-db.service";
import {ICharacter} from "../character";
import {IServerGroup} from "coh-content-db";
import {IArchetype} from "coh-content-db/dist/types/archetype";
import {BsModalService, TabsetComponent} from "ngx-bootstrap";
import {SessionStorage} from "ngx-store";
import {CharacterExportModalComponent} from "../character-export-modal/character-export-modal.component";
import {faFileExport} from "@fortawesome/free-solid-svg-icons/faFileExport";
import {CharacterDbService} from "../character-db.service";

@Component({
    selector: 'character-page',
    templateUrl: './character-page.component.html',
    styleUrls: ['./character-page.component.scss']
})
export class CharacterPageComponent implements OnInit {

    exportIcon = faFileExport;

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
                private charDb: CharacterDbService) {
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
}
