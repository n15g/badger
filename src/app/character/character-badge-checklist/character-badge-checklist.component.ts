import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {BadgePartialType, BadgeType, IBadgePartial, IServerGroup} from "coh-content-db";
import {SessionStorage} from "ngx-store";
import {BadgeSortPipe, BadgeSortType} from "../../badge/badge-sort.pipe";
import {FilterBadgeTypePipe} from "../../badge/filter-badge-type.pipe";
import {FilterBadgeMapPipe} from "../../badge/filter-badge-map.pipe";
import {FilterBadgeSearchPipe} from "../../badge/filter-badge-search.pipe";
import {CharacterBadgesPipe, ICharacterBadge, ICharacterBadgePartial} from "../character-badges.pipe";
import {ICharacter} from "../character";
import {ServerGroupPipe} from "../../server-group/server-group.pipe";
import {CharacterDbService} from "../character-db.service";
import * as _ from "lodash";

@Component({
    selector: "character-badge-checklist",
    templateUrl: "./character-badge-checklist.component.html",
    styleUrls: ["./character-badge-checklist.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class CharacterBadgeChecklistComponent implements OnInit {
    @Input() public character: ICharacter;
    serverGroup: IServerGroup;
    badges: ICharacterBadge[] = [];

    totalItems: number = this.badges.length;
    pageCount: number = 1;

    constructor(private serverGroupPipe: ServerGroupPipe,
                private filterBadgeType: FilterBadgeTypePipe,
                private filterBadgeMap: FilterBadgeMapPipe,
                private filterBadgeSearch: FilterBadgeSearchPipe,
                private badgeSort: BadgeSortPipe,
                private characterBadgesPipe: CharacterBadgesPipe,
                private characterDb: CharacterDbService) {
    }

    @SessionStorage("badge-list.type")
    _type: BadgeType = "" as BadgeType;

    get type(): BadgeType {
        return this._type;
    }

    set type(value: BadgeType) {
        this._type = value;
        this.update();
        this._page = 1;
    }

    @SessionStorage("character-badge-list.mapKey")
    _mapKey: string = "";

    get mapKey(): string {
        return this._mapKey;
    }

    set mapKey(value: string) {
        this._mapKey = value;
        this.update();
        this._page = 1;
    }

    @SessionStorage("character-badge-list.queryStr")
    _queryStr: string = "";

    get queryStr(): string {
        return this._queryStr;
    }

    set queryStr(value: string) {
        this._queryStr = value;
        this.update();
        this._page = 1;
    }

    @SessionStorage("character-badge-list.page")
    private _page: number = 1;

    get page(): number {
        return this._page;
    }

    set page(value: number) {
        this._page = value;
        this.update();
    }

    @SessionStorage("character-badge-list.itemsPerPage")
    private _itemsPerPage: number = 50;

    get itemsPerPage(): number {
        return this._itemsPerPage;
    }

    set itemsPerPage(value: number) {
        this._itemsPerPage = value;
    }

    @SessionStorage("character-badge-list.sort")
    _sort: BadgeSortType = "" as BadgeSortType;

    get sort(): BadgeSortType {
        return this._sort;
    }

    set sort(value: BadgeSortType) {
        this._sort = value;
        this.update();
    }

    ngOnInit(): void {
        this.serverGroup = this.serverGroupPipe.transform(this.character.serverGroupKey);
        this.update();
    }

    update(): void {
        let badges = this.serverGroup.badges;
        badges = this.filterBadgeType.transform(badges, this._type);
        badges = this.filterBadgeMap.transform(badges, this._mapKey);
        badges = this.filterBadgeSearch.transform(badges, this._queryStr);
        badges = this.badgeSort.transform(badges, this._sort);

        this.totalItems = badges.length;

        this.badges = this.characterBadgesPipe.transform(badges, this.character);
    }

    clearFilters() {
        this._type = "" as BadgeType;
        this._mapKey = "";
        this.queryStr = "";
        this.page = 1;
        this.update();
    }

    collectBadge(badge: ICharacterBadge, value: boolean) {
        this.character = this.characterDb.collectBadge(this.character, badge, value);
    }

    collectPartial(partial: IBadgePartial, value: boolean, count?: number) {
        this.character = this.characterDb.collectPartial(this.character, partial, value, count);
    }

    getPlusOneInvention(badge: ICharacterBadge): ICharacterBadgePartial {
        return _.find(badge.partials, (partial) => partial.type === BadgePartialType.INVENTION_PLUS_ONE);
    }
}
