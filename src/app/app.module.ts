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
import {ChangelogPageComponent} from './changelog/changelog-page.component';
import {CharacterListPageComponent} from "./character/character-list-page/character-list-page.component";
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
import {ModalModule, TabsModule, TooltipModule, TypeaheadModule} from "ngx-bootstrap";
import {NgVarDirective} from "./common/ng-var.directive";
import {PagePipe} from "./common/page.pipe";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ReversePipe} from "./common/reverse.pipe";
import {ServerGroupPageComponent} from "./server-group/server-group-page/server-group-page.component";
import {ServerGroupResolver} from "./server-group/server-group.resolver";
import {ServerGroupSortPipe} from "./server-group/server-group-sort.pipe";
import {ServerGroupStatusComponent} from "./server-group/server-group-status/server-group-status.component";
import {ServerGroupStatusesComponent} from "./server-group/server-group-statuses/server-group-statuses.component";
import {SexIconPipe} from "./badge/sex-icon.pipe";
import {SmartLinksPipe} from "./common/smart-links.pipe";
import {NewCharacterModalComponent} from "./character/new-character-modal/new-character-modal.component";
import {ServerGroupSelectComponent} from "./server-group/server-group-select/server-group-select.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ArchetypeIconComponent} from "./character/archetype-icon/archetype-icon.component";
import {ArchetypePipe} from "./character/archetype.pipe";
import {ServerGroupPipe} from "./server-group/server-group.pipe";
import {WebStorageModule} from "ngx-store";
import {CharacterResolver} from "./character/character.resolver";
import {CharacterPageComponent} from "./character/character-page/character-page.component";
import {CharacterSortPipe} from "./character/character-sort.pipe";
import {CharacterBadgesPipe} from "./character/character-badges.pipe";
import {CharacterBadgeChecklistComponent} from "./character/character-badge-checklist/character-badge-checklist.component";
import {BadgesByTypePipe} from "./badge/badges-by-type.pipe";
import {CollectedOnlyPipe} from "./character/collected-only.pipe";
import {CharacterBadgeDisplayComponent} from "./character/character-badge-display/character-badge-display.component";
import {BadgeImageSrcPipe} from "./badge/badge-image-src.pipe";
import {BadgeListImagesComponent} from "./badge/badge-list-images/badge-list-images.component";
import {BadgePartialsPipe} from "./badge/badge-partials.pipe";
import {CharacterExportModalComponent} from './character/character-export-modal/character-export-modal.component';
import {CharacterImportModalComponent} from "./character/character-import-modal/character-import-modal.component";

@NgModule({
    declarations: [
        AlternatesPipe,
        AppComponent,
        ArchetypeIconComponent,
        ArchetypePipe,
        BadgeAlignmentInlineComponent,
        BadgeAlignmentStackedComponent,
        BadgeDescriptionComponent,
        BadgeImagesComponent,
        BadgeImageSrcPipe,
        BadgeLinkComponent,
        BadgeListComponent,
        BadgeListImagesComponent,
        BadgeLocationComponent,
        BadgeNameInlineComponent,
        BadgeNamePipe,
        BadgeNameStackedComponent,
        BadgePageComponent,
        BadgePartialsPipe,
        BadgePipe,
        BadgesByTypePipe,
        BadgeSortPipe,
        BadgeSortSelectComponent,
        BadgeTextComponent,
        BadgeTypePipe,
        BadgeTypeSelectComponent,
        BadgeVidiotIconComponent,
        ChangelogPageComponent,
        CharacterBadgeChecklistComponent,
        CharacterBadgeDisplayComponent,
        CharacterBadgesPipe,
        CharacterExportModalComponent,
        CharacterImportModalComponent,
        CharacterListPageComponent,
        CharacterPageComponent,
        CharacterSortPipe,
        CollectedOnlyPipe,
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
        NewCharacterModalComponent,
        NgVarDirective,
        PagePipe,
        ReversePipe,
        ServerGroupPageComponent,
        ServerGroupPipe,
        ServerGroupSelectComponent,
        ServerGroupSortPipe,
        ServerGroupStatusComponent,
        ServerGroupStatusesComponent,
        SexIconPipe,
        SmartLinksPipe,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FontAwesomeModule,
        FormsModule,
        MarkdownModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        TypeaheadModule.forRoot(),
        WebStorageModule,
    ],
    providers: [
        AlternatesPipe,
        ArchetypePipe,
        BadgeImageSrcPipe,
        BadgeNamePipe,
        BadgePartialsPipe,
        BadgePipe,
        BadgeResolver,
        BadgesByTypePipe,
        BadgeSortPipe,
        CharacterBadgesPipe,
        CharacterResolver,
        CharacterSortPipe,
        CollectedOnlyPipe,
        EnhancementCategoriesPipe,
        EnhancementCategoryPipe,
        FilterBadgeMapPipe,
        FilterBadgeSearchPipe,
        FilterBadgeTypePipe,
        InventionPartialsPipe,
        PagePipe,
        ReversePipe,
        ServerGroupPipe,
        ServerGroupResolver,
        SmartLinksPipe,
    ],
    entryComponents: [
        CharacterExportModalComponent,
        CharacterImportModalComponent,
        NewCharacterModalComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
