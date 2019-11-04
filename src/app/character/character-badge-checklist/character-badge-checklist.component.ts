import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {BadgePartialType, BadgeType, IBadge, IBadgePartial, IServerGroup} from "coh-content-db";
import {SessionStorage} from "ngx-store";
import {BadgeSortDirection, BadgeSortPipe, BadgeSortType} from "../../badge/badge-sort.pipe";
import {FilterBadgeTypePipe} from "../../badge/filter-badge-type.pipe";
import {FilterBadgeMapPipe} from "../../badge/filter-badge-map.pipe";
import {FilterBadgeSearchPipe} from "../../badge/filter-badge-search.pipe";
import {CharacterBadgesPipe, ICharacterBadge, ICharacterBadgePartial} from "../character-badges.pipe";
import {ICharacter} from "../character";
import {ServerGroupPipe} from "../../server-group/server-group.pipe";
import {CharacterDbService} from "../character-db.service";
import * as _ from "lodash";
import {AlignmentFilterType, FilterBadgeAlignmentPipe} from "../../badge/filter-badge-alignment.pipe";
import {PagePipe} from "../../common/page.pipe";
import {faCircle} from '@fortawesome/free-regular-svg-icons';
import {faCheckCircle, faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: "character-badge-checklist",
    templateUrl: "./character-badge-checklist.component.html",
    styleUrls: ["./character-badge-checklist.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class CharacterBadgeChecklistComponent implements OnInit {
    public circle = faCircle;
    public check = faCheckCircle;
    public sortIcon = faSort;
    public sortAsc = faSortUp;
    public sortDesc = faSortDown;

    public badgeSortType: typeof BadgeSortType = BadgeSortType;
    public badgeSortDirection: typeof BadgeSortDirection = BadgeSortDirection;
    public badgeType: typeof BadgeType = BadgeType;

    @Input() public character: ICharacter;
    serverGroup: IServerGroup;
    badges: ICharacterBadge[];

    totalItems: number;
    pageCount: number = 1;

    selectAllModel: boolean;

    constructor(private serverGroupPipe: ServerGroupPipe,
                private filterBadgeType: FilterBadgeTypePipe,
                private filterBadgeMap: FilterBadgeMapPipe,
                private filterBadgeAlignmentPipe: FilterBadgeAlignmentPipe,
                private filterBadgeSearch: FilterBadgeSearchPipe,
                private pagePipe: PagePipe,
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
    }

    @SessionStorage("character-badge-list.mapKey")
    _mapKey: string = "";

    get mapKey(): string {
        return this._mapKey;
    }

    set mapKey(value: string) {
        this._mapKey = value;
        this.update();
    }

    @SessionStorage("badge-list.alignment")
    private _alignment: AlignmentFilterType = "" as AlignmentFilterType;

    get alignment(): AlignmentFilterType {
        return this._alignment;
    }

    set alignment(value: AlignmentFilterType) {
        this._alignment = value;
        this.update();
    }

    @SessionStorage("character-badge-list.queryStr")
    _queryStr: string = "";

    get queryStr(): string {
        return this._queryStr;
    }

    set queryStr(value: string) {
        this._queryStr = value;
        this.update();
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

    @SessionStorage('character-badge-list.sort')
    private _sortType: BadgeSortType = BadgeSortType.CANONICAL;

    get sortType(): BadgeSortType {
        return this._sortType;
    }

    @SessionStorage('character-badge-list.sort-direction')
    private _sortDirection: BadgeSortDirection = BadgeSortDirection.ASC;

    get sortDirection(): BadgeSortDirection {
        return this._sortDirection;
    }

    get badgeTypeFilter() {
        return BadgeType;
    }

    ngOnInit(): void {
        this.serverGroup = this.serverGroupPipe.transform(this.character.serverGroupKey);
        this.update();
    }

    update(): void {
        let badges = this.characterBadgesPipe.transform(this.character);
        badges = this.filterBadgeType.transform(badges, this._type);
        badges = this.filterBadgeMap.transform(badges, this._mapKey);
        badges = this.filterBadgeAlignmentPipe.transform(badges, this._alignment);
        badges = this.filterBadgeSearch.transform(badges, this._queryStr);
        badges = this.badgeSort.transform(badges, this._sortType, this._sortDirection);

        this.totalItems = badges.length;

        if ((this._page - 1) * this.itemsPerPage > this.totalItems) {
            this._page = 1;
        }

        badges = this.pagePipe.transform(badges, this._page, this.itemsPerPage);

        this.badges = badges;

        this.selectAllModel = _.every(badges, badge => badge.owned);
    }

    clearFilters() {
        this._type = "" as BadgeType;
        this._mapKey = "";
        this.queryStr = "";
        this._alignment = "" as AlignmentFilterType;
        this._sortType = "" as BadgeSortType;
        this._sortDirection = BadgeSortDirection.ASC;
        this.page = 1;
        this.update();
    }

    sort(sort: BadgeSortType) {
        this._sortDirection = (this._sortType !== sort || this._sortDirection === BadgeSortDirection.DESC)
            ? BadgeSortDirection.ASC
            : BadgeSortDirection.DESC;
        this._sortType = sort;
        this.update();
    }

    isSortedBy(type: BadgeSortType, direction?: BadgeSortDirection) {
        return this.sortType === type && (direction == undefined || this.sortDirection === direction);
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

    selectAll(value: boolean) {
        this.characterDb.collectBadgeBulk(this.character, this.badges, value);
        this.update();
    }

    trackByBadge(index: number, badge: IBadge): string {
        return badge.key;
    }
}
