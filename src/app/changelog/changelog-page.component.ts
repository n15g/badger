import {Component} from '@angular/core';
import {Changelog} from "../_changelog";
import {ContentDbService} from "../content-db/content-db.service";
import {IServerGroup} from "coh-content-db";

@Component({
    selector: 'changelog-page',
    templateUrl: './changelog-page.component.html',
    styleUrls: ['./changelog-page.component.scss']
})
export class ChangelogPageComponent {

    appChangelog: { [id: string]: string } = Changelog;
    serverGroups: IServerGroup[];

    constructor(private contentDb: ContentDbService) {
        this.serverGroups = contentDb.getServerGroups();
    }
}
