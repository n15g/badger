import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";
import {MainNavComponent} from "./main-nav/main-nav.component";
import {TestComponent} from "./test/test.component";
import {MarkdownModule} from "ngx-markdown";
import {BadgeListComponent} from "./badge/badge-list/badge-list.component";
import {BadgeImagesComponent} from "./badge/badge-images/badge-images.component";
import {BadgeNameStackedComponent} from "./badge/badge-name-stacked/badge-name-stacked.component";
import {BadgePageComponent} from "./badge/badge-page/badge-page.component";
import {BadgeResolver} from "./badge/badge.resolver";
import {BadgeNameInlineComponent} from "./badge/badge-name-inline/badge-name-inline.component";
import {BadgeNamesPipe} from "./badge/badge-names.pipe";
import {GameMapComponent} from "./game-map/game-map/game-map.component";
import {BadgeLocationComponent} from "./badge/badge-location/badge-location.component";
import {BadgeTypePipe} from "./badge/badge-type.pipe";
import {BadgeDescriptionComponent} from "./badge/badge-description/badge-description.component";
import {ServerGroupPageComponent} from "./server-group/server-group-page/server-group-page.component";
import {ServerGroupSortPipe} from "./server-group/server-group-sort.pipe";
import {ServerGroupStatusComponent} from "./server-group/server-group-status/server-group-status.component";
import {ServerGroupStatusesComponent} from "./server-group/server-group-statuses/server-group-statuses.component";
import {ServerGroupResolver} from "./server-group/server-group.resolver";

@NgModule({
    declarations: [
        AppComponent,
        BadgeImagesComponent,
        BadgeListComponent,
        BadgeLocationComponent,
        BadgeNameInlineComponent,
        BadgeNamesPipe,
        BadgeNameStackedComponent,
        BadgePageComponent,
        ServerGroupPageComponent,
        ServerGroupSortPipe,
        ServerGroupStatusComponent,
        ServerGroupStatusesComponent,
        BadgeTypePipe,
        GameMapComponent,
        HomeComponent,
        MainNavComponent,
        TestComponent,
        BadgeDescriptionComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MarkdownModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        BadgeResolver,
        ServerGroupResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
