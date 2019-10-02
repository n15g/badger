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
import {BadgeSortPipe} from "./badge/badge-sort.pipe";
import {BadgeSortSelectComponent} from "./badge/badge-sort-select/badge-sort-select.component";
import {BadgeTextComponent} from './badge/badge-text/badge-text.component';
import {BadgeTypePipe} from "./badge/badge-type.pipe";
import {BadgeTypeSelectComponent} from "./badge/badge-type-select/badge-type-select.component";
import {BadgeVidiotIconComponent} from './badge/badge-vidiot-icon/badge-vidiot-icon.component';
import {BrowserModule} from "@angular/platform-browser";
import {CoordinatePipe} from "./badge/coordinate.pipe";
import {EnhancementCategoriesPipe} from "./common/enhancement-categories.pipe";
import {EnhancementCategoryPipe} from "./common/enhancement-category.pipe";
import {FilterBadgeMapPipe} from "./badge/filter-badge-map.pipe";
import {FilterBadgeSearchPipe} from "./badge/filter-badge-search.pipe";
import {FilterBadgeTypePipe} from "./badge/filter-badge-type.pipe";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {GameMapComponent} from "./game-map/game-map/game-map.component";
import {GameMapSelectComponent} from "./game-map/game-map-select/game-map-select.component";
import {HomeComponent} from "./home/home.component";
import {InventionPartialsPipe} from "./badge/invention-partials.pipe";
import {InventionTypesComponent} from "./badge/invention-types/invention-types.component";
import {LinksStackedComponent} from './common/links-stacked/links-stacked.component';
import {MainNavComponent} from "./main-nav/main-nav.component";
import {MarkdownModule} from "ngx-markdown";
import {NgVarDirective} from "./common/ng-var.directive";
import {PagePipe} from "./common/page.pipe";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ServerGroupPageComponent} from "./server-group/server-group-page/server-group-page.component";
import {ServerGroupResolver} from "./server-group/server-group.resolver";
import {ServerGroupSortPipe} from "./server-group/server-group-sort.pipe";
import {ServerGroupStatusComponent} from "./server-group/server-group-status/server-group-status.component";
import {ServerGroupStatusesComponent} from "./server-group/server-group-statuses/server-group-statuses.component";
import {SexIconPipe} from "./badge/sex-icon.pipe";
import {SmartLinksPipe} from "./common/smart-links.pipe";

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
        BadgeSortPipe,
        BadgeSortSelectComponent,
        BadgeTextComponent,
        BadgeTypePipe,
        BadgeTypeSelectComponent,
        BadgeVidiotIconComponent,
        CoordinatePipe,
        EnhancementCategoriesPipe,
        EnhancementCategoryPipe,
        FilterBadgeMapPipe,
        FilterBadgeSearchPipe,
        FilterBadgeTypePipe,
        GameMapComponent,
        GameMapSelectComponent,
        HomeComponent,
        InventionPartialsPipe,
        InventionTypesComponent,
        LinksStackedComponent,
        MainNavComponent,
        NgVarDirective,
        PagePipe,
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
        PaginationModule.forRoot(),
    ],
    providers: [
        AlternatesPipe,
        BadgeNamePipe,
        BadgePipe,
        BadgeResolver,
        BadgeSortPipe,
        EnhancementCategoriesPipe,
        EnhancementCategoryPipe,
        FilterBadgeMapPipe,
        FilterBadgeSearchPipe,
        FilterBadgeTypePipe,
        InventionPartialsPipe,
        PagePipe,
        ServerGroupResolver,
        SmartLinksPipe,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
