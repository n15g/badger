import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ContentDbService} from "../../content-db/content-db.service";
import {ICharacter} from "../character";
import {IServerGroup} from "coh-content-db";
import {IArchetype} from "coh-content-db/dist/types/archetype";
import {TabsetComponent} from "ngx-bootstrap";
import {SessionStorage} from "ngx-store";

@Component({
    selector: 'character-page',
    templateUrl: './character-page.component.html',
    styleUrls: ['./character-page.component.scss']
})
export class CharacterPageComponent implements OnInit {

    public character: ICharacter;
    public serverGroup: IServerGroup;
    public archetype: IArchetype;

    @SessionStorage("character.tab")
    public activeTab: string = "Display";

    @ViewChild(TabsetComponent, {static: false}) tabs: TabsetComponent;

    constructor(private route: ActivatedRoute,
                private title: Title,
                private contentDb: ContentDbService) {
    }

    public ngOnInit() {
        this.route.data.subscribe(data => {
            this.character = data["character"];
            this.serverGroup = this.contentDb.getServerGroup(this.character.serverGroupKey);
            this.archetype = this.serverGroup.getArchetype(this.character.archetypeKey);
            this.title.setTitle(`${this.character.name} | Badger`);
        });

    }
}
