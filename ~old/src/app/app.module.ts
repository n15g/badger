import {NgModule} from '@angular/core';

import {AlternatesPipe} from './badge/alternates.pipe';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BadgeAlignmentInlineComponent} from './badge/badge-alignment-inline/badge-alignment-inline.component';
import {BadgeAlignmentStackedComponent} from './badge/badge-alignment-stacked/badge-alignment-stacked.component';
import {BadgeDescriptionComponent} from './badge/badge-description/badge-description.component';
import {BadgeIconsComponent} from './badge/badge-icons/badge-icons.component';
import {BadgeLinkComponent} from './badge/badge-link/badge-link.component';
import {BadgeListComponent} from './badge/badge-list/badge-list.component';
import {BadgeLocationComponent} from './badge/badge-location/badge-location.component';
import {BadgeNameInlineComponent} from './badge/badge-name-inline/badge-name-inline.component';
import {BadgeNamePipe} from './badge/badge-name.pipe';
import {BadgeNameStackedComponent} from './badge/badge-name-stacked/badge-name-stacked.component';
import {BadgePageComponent} from './badge/badge-page/badge-page.component';
import {BadgePipe} from './badge/badge.pipe';
import {BadgeResolver} from './badge/badge.resolver';
import {BadgeSortPipe} from './badge/badge-sort.pipe';
import {BadgeTextComponent} from './badge/badge-text/badge-text.component';
import {BadgeTypePipe} from './badge/badge-type.pipe';
import {BadgeTypeSelectComponent} from './badge/badge-type-select/badge-type-select.component';
import {BadgeVidiotIconComponent} from './badge/badge-vidiot-icon/badge-vidiot-icon.component';
import {BrowserModule} from '@angular/platform-browser';
import {ChangelogPageComponent} from './changelog/changelog-page.component';
import {CharacterListPageComponent} from './character/character-list-page/character-list-page.component';
import {CoordinatePipe} from './badge/coordinate.pipe';
import {EnhancementCategoriesPipe} from './common/enhancement-categories.pipe';
import {EnhancementCategoryPipe} from './common/enhancement-category.pipe';
import {FilterBadgeMapPipe} from './badge/filter-badge-map.pipe';
import {FilterBadgeSearchPipe} from './badge/filter-badge-search.pipe';
import {FilterBadgeTypePipe} from './badge/filter-badge-type.pipe';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {GameMapComponent} from './game-map/game-map/game-map.component';
import {GameMapSelectComponent} from './game-map/game-map-select/game-map-select.component';
import {HomeComponent} from './home/home.component';
import {InventionPartialsPipe} from './badge/invention-partials.pipe';
import {InventionTypesComponent} from './badge/invention-types/invention-types.component';
import {LinksStackedComponent} from './common/links-stacked/links-stacked.component';
import {MainNavComponent} from './main-nav/main-nav.component';
import {MarkdownModule} from 'ngx-markdown';
import {ModalModule, TabsModule, TooltipModule, TypeaheadModule} from 'ngx-bootstrap';
import {NgVarDirective} from './common/ng-var.directive';
import {PagePipe} from './common/page.pipe';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ReversePipe} from './common/reverse.pipe';
import {ServerGroupPageComponent} from './server-group/server-group-page/server-group-page.component';
import {ServerGroupResolver} from './server-group/server-group.resolver';
import {ServerGroupSortPipe} from './server-group/server-group-sort.pipe';
import {ServerGroupStatusComponent} from './server-group/server-group-status/server-group-status.component';
import {ServerGroupStatusesComponent} from './server-group/server-group-statuses/server-group-statuses.component';
import {SexIconPipe} from './badge/sex-icon.pipe';
import {SmartLinksPipe} from './common/smart-links.pipe';
import {NewCharacterModalComponent} from './character/new-character-modal/new-character-modal.component';
import {ServerGroupSelectComponent} from './server-group/server-group-select/server-group-select.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ArchetypeIconComponent} from './character/archetype-icon/archetype-icon.component';
import {ArchetypePipe} from './character/archetype.pipe';
import {ServerGroupPipe} from './server-group/server-group.pipe';
import {WebStorageModule} from 'ngx-store';
import {CharacterResolver} from './character/character.resolver';
import {CharacterPageComponent} from './character/character-page/character-page.component';
import {CharacterSortPipe} from './character/character-sort.pipe';
import {CharacterBadgesPipe} from './character/character-badges.pipe';
import {CharacterBadgeChecklistComponent} from './character/character-badge-checklist/character-badge-checklist.component';
import {BadgesByTypePipe} from './badge/badges-by-type.pipe';
import {CollectedOnlyPipe} from './character/collected-only.pipe';
import {CharacterBadgeDisplayComponent} from './character/character-badge-display/character-badge-display.component';
import {BadgeIconSrcPipe} from './badge/badge-image-src.pipe';
import {BadgeListIconsComponent} from './badge/badge-list-icons/badge-list-icons.component';
import {BadgePartialsPipe} from './badge/badge-partials.pipe';
import {CharacterExportModalComponent} from './character/character-export-modal/character-export-modal.component';
import {CharacterImportModalComponent} from './character/character-import-modal/character-import-modal.component';
import {FilterBadgeAlignmentPipe} from './badge/filter-badge-alignment.pipe';
import {BadgeAlignmentSelectComponent} from './badge/badge-alignment-select/badge-alignment-select.component';
import {CharacterRenameModalComponent} from './character/character-rename-modal/character-rename-modal.component';
import {GameMapPipe} from './game-map/game-map.pipe';
import {MainFooterComponent} from './main-footer/main-footer.component';
import {CollectedCountPipe} from './character/collected-count.pipe';
import {ChangelogSortPipe} from './changelog/changelog-sort.pipe';
import { CharacterLogParserModalComponent } from './character/character-log-parser-modal/character-log-parser-modal.component';
import { DragAndDropFileDirective } from './common/drag-and-drop-file.directive';
import { CharacterLogParserHowToModalComponent } from './character/character-log-parser-how-to-modal/character-log-parser-how-to-modal.component';
import {CharacterBadgeListIconsComponent} from './character/character-badge-list-icons/character-badge-list-icons.component';

@NgModule({
    declarations: [
        AlternatesPipe,
        AppComponent,
        ArchetypeIconComponent,
        ArchetypePipe,
        BadgeAlignmentInlineComponent,
        BadgeAlignmentSelectComponent,
        BadgeAlignmentStackedComponent,
        BadgeDescriptionComponent,
        BadgeIconsComponent,
        BadgeIconSrcPipe,
        BadgeLinkComponent,
        BadgeListComponent,
        BadgeListIconsComponent,
        BadgeLocationComponent,
        BadgeNameInlineComponent,
        BadgeNamePipe,
        BadgeNameStackedComponent,
        BadgePageComponent,
        BadgePartialsPipe,
        BadgePipe,
        BadgesByTypePipe,
        BadgeSortPipe,
        BadgeTextComponent,
        BadgeTypePipe,
        BadgeTypeSelectComponent,
        BadgeVidiotIconComponent,
        ChangelogPageComponent,
        ChangelogSortPipe,
        CharacterBadgeChecklistComponent,
        CharacterBadgeDisplayComponent,
        CharacterBadgeListIconsComponent,
        CharacterBadgesPipe,
        CharacterExportModalComponent,
        CharacterImportModalComponent,
        CharacterListPageComponent,
        CharacterPageComponent,
        CharacterRenameModalComponent,
        CharacterSortPipe,
        CollectedCountPipe,
        CollectedOnlyPipe,
        CoordinatePipe,
        EnhancementCategoriesPipe,
        EnhancementCategoryPipe,
        FilterBadgeAlignmentPipe,
        FilterBadgeMapPipe,
        FilterBadgeSearchPipe,
        FilterBadgeTypePipe,
        GameMapComponent,
        GameMapPipe,
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
        MainFooterComponent,
        CharacterLogParserModalComponent,
        DragAndDropFileDirective,
        CharacterLogParserHowToModalComponent,
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
        BadgeIconSrcPipe,
        BadgeNamePipe,
        BadgePartialsPipe,
        BadgePipe,
        BadgeResolver,
        BadgesByTypePipe,
        BadgeSortPipe,
        ChangelogSortPipe,
        CharacterBadgesPipe,
        CharacterResolver,
        CharacterSortPipe,
        CollectedCountPipe,
        CollectedOnlyPipe,
        EnhancementCategoriesPipe,
        EnhancementCategoryPipe,
        FilterBadgeAlignmentPipe,
        FilterBadgeMapPipe,
        FilterBadgeSearchPipe,
        FilterBadgeTypePipe,
        GameMapPipe,
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
        CharacterRenameModalComponent,
        CharacterLogParserModalComponent,
        NewCharacterModalComponent,
        CharacterLogParserHowToModalComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
