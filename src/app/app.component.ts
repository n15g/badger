import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, mergeMap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title) {
    }

    public ngOnInit(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter((route) => route.outlet === "primary"),
                mergeMap((route) => route.data)
            )
            .subscribe((event) => {
                let newTitle = event["title"];
                if (newTitle) {
                    console.info(`Setting page title [${newTitle}]`);
                    this.titleService.setTitle(newTitle);
                }
            });
    }

}
