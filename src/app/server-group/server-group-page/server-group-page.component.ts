import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {IServerGroup} from "coh-content-db";

@Component({
    selector: "server-group-page",
    templateUrl: "./server-group-page.component.html",
    styleUrls: ["./server-group-page.component.scss"]
})
export class ServerGroupPageComponent implements OnInit {

    public serverGroup: IServerGroup;

    constructor(private route: ActivatedRoute, private title: Title) {
    }

    public ngOnInit() {
        this.route.data.subscribe(data => {
            this.serverGroup = data["serverGroup"];
            this.title.setTitle(`${this.serverGroup.name} | Badger`);
        });
    }
}
