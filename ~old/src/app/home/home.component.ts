import {Component, OnInit} from "@angular/core";
import {ContentDbService} from "../content-db/content-db.service";
import {IServerGroup} from "coh-content-db";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faNpm} from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    public serverGroups: IServerGroup[];

    public thanksIcon = faHeart;
    public githubIcon = faGithub;
    public npmIcon = faNpm;

    constructor(private contentDb: ContentDbService) {
    }

    public ngOnInit(): void {
        this.serverGroups = this.contentDb.getServerGroups();
    }
}
