import {NgModule} from "@angular/core";

import {AlternatesPipe} from "./badge/alternates.pipe";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {BadgeAlignmentInlineComponent} from "./badge/badge-alignment-inline/badge-alignment-inline.component";
import {BadgeAlignmentStackedComponent} from "./badge/badge-alignment-stacked/badge-alignment-stacked.component";
import {BadgeDescriptionComponent} from "./badge/badge-description/badge-description.component";
import {BadgeImagesComponent} from "./badge/badge-images/badge-images.component";
import {BadgeLinkComponent} from './badge/badge-link/badge-link.component';
import {BadgeListComponent} from "./badge/badge-list/badge-list.component";
import {BadgeLocationComponent} from "./badge/badge-location/badge-location.component";
import {BadgeNameInlineComponent} from "./badge/badge-name-inline/badge-name-inline.component";
import {BadgeNamePipe} from "./badge/badge-name.pipe";
import {BadgeNameStackedComponent} from "./badge/badge-name-stacked/badge-name-stacked.component";
import {BadgePageComponent} from "./badge/badge-page/badge-page.component";
import {BadgePipe} from "./badge/badge.pipe";
import {BadgeResolver} from "./badge/badge.resolver";
import {BadgeTextComponent} from './badge/badge-text/badge-text.component';
import {BadgeTypePipe} from "./badge/badge-type.pipe";
import {BadgeVidiotIconComponent} from './badge/badge-vidiot-icon/badge-vidiot-icon.component';
import {BrowserModule} from "@angular/platform-browser";
import {CoordinatePipe} from "./badge/coordinate.pipe";
import {EnhancementCategoryPipe} from "./common/enhancement-category.pipe";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {GameMapComponent} from "./game-map/game-map/game-map.component";
import {HomeComponent} from "./home/home.component";
import {InventionPartialsPipe} from "./badge/invention-partials.pipe";
import {InventionTypesComponent} from "./badge/invention-types/invention-types.component";
import {LinksStackedComponent} from './common/links-stacked/links-stacked.component';
import {MainNavComponent} from "./main-nav/main-nav.component";
import {MarkdownModule} from "ngx-markdown";
import {NgVarDirective} from "./common/ng-var.directive";
import {ServerGroupPageComponent} from "./server-group/server-group-page/server-group-page.component";
import {ServerGroupResolver} from "./server-group/server-group.resolver";
import {ServerGroupSortPipe} from "./server-group/server-group-sort.pipe";
import {ServerGroupStatusComponent} from "./server-group/server-group-status/server-group-status.component";
import {ServerGroupStatusesComponent} from "./server-group/server-group-statuses/server-group-statuses.component";
import {SexIconPipe} from "./badge/sex-icon.pipe";
import {SmartLinksPipe} from "./common/smart-links.pipe";
import {EnhancementCategoriesPipe} from "./common/enhancement-categories.pipe";

@NgModule({
    declarations: [
        AlternatesPipe,
        AppComponent,
        BadgeAlignmentInlineComponent,
        BadgeAlignmentStackedComponent,
        BadgeDescriptionComponent,
        BadgeImagesComponent,
        BadgeLinkComponent,
        BadgeListComponent,
        BadgeLocationComponent,
        BadgeNameInlineComponent,
        BadgeNamePipe,
        BadgeNameStackedComponent,
        BadgePageComponent,
        BadgePipe,
        BadgeTextComponent,
        BadgeTypePipe,
        BadgeVidiotIconComponent,
        CoordinatePipe,
        EnhancementCategoryPipe,
        EnhancementCategoriesPipe,
        GameMapComponent,
        HomeComponent,
        InventionPartialsPipe,
        InventionTypesComponent,
        LinksStackedComponent,
        MainNavComponent,
        NgVarDirective,
        ServerGroupPageComponent,
        ServerGroupSortPipe,
        ServerGroupStatusComponent,
        ServerGroupStatusesComponent,
        SexIconPipe,
        SmartLinksPipe,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FontAwesomeModule,
        FormsModule,
        MarkdownModule.forRoot(),
    ],
    providers: [
        AlternatesPipe,
        BadgeNamePipe,
        BadgePipe,
        BadgeResolver,
        EnhancementCategoryPipe,
        EnhancementCategoriesPipe,
        InventionPartialsPipe,
        ServerGroupResolver,
        SmartLinksPipe,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
