import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {BadgeAlignmentInlineComponent} from "./badge/badge-alignment-inline/badge-alignment-inline.component";
import {BadgeAlignmentStackedComponent} from "./badge/badge-alignment-stacked/badge-alignment-stacked.component";
import {BadgeDescriptionComponent} from "./badge/badge-description/badge-description.component";
import {BadgeImagesComponent} from "./badge/badge-images/badge-images.component";
import {BadgeListComponent} from "./badge/badge-list/badge-list.component";
import {BadgeLocationComponent} from "./badge/badge-location/badge-location.component";
import {BadgeNameInlineComponent} from "./badge/badge-name-inline/badge-name-inline.component";
import {BadgeNamesPipe} from "./badge/badge-names.pipe";
import {BadgeNameStackedComponent} from "./badge/badge-name-stacked/badge-name-stacked.component";
import {BadgePageComponent} from "./badge/badge-page/badge-page.component";
import {BadgeResolver} from "./badge/badge.resolver";
import {BadgeTypePipe} from "./badge/badge-type.pipe";
import {BadgeVidiotIconComponent} from './badge/badge-vidiot-icon/badge-vidiot-icon.component';
import {BrowserModule} from "@angular/platform-browser";
import {CoordinatePipe} from "./badge/coordinate.pipe";
import {FormsModule} from "@angular/forms";
import {GameMapComponent} from "./game-map/game-map/game-map.component";
import {HomeComponent} from "./home/home.component";
import {MainNavComponent} from "./main-nav/main-nav.component";
import {MarkdownModule} from "ngx-markdown";
import {NgModule} from "@angular/core";
import {ServerGroupPageComponent} from "./server-group/server-group-page/server-group-page.component";
import {ServerGroupResolver} from "./server-group/server-group.resolver";
import {ServerGroupSortPipe} from "./server-group/server-group-sort.pipe";
import {ServerGroupStatusComponent} from "./server-group/server-group-status/server-group-status.component";
import {ServerGroupStatusesComponent} from "./server-group/server-group-statuses/server-group-statuses.component";
import {TestComponent} from "./test/test.component";

@NgModule({
    declarations: [
        AppComponent,
        BadgeAlignmentInlineComponent,
        BadgeAlignmentStackedComponent,
        BadgeDescriptionComponent,
        BadgeImagesComponent,
        BadgeListComponent,
        BadgeLocationComponent,
        BadgeNameInlineComponent,
        BadgeNamesPipe,
        BadgeNameStackedComponent,
        BadgePageComponent,
        BadgeTypePipe,
        BadgeVidiotIconComponent,
        CoordinatePipe,
        GameMapComponent,
        HomeComponent,
        MainNavComponent,
        ServerGroupPageComponent,
        ServerGroupSortPipe,
        ServerGroupStatusComponent,
        ServerGroupStatusesComponent,
        TestComponent
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
