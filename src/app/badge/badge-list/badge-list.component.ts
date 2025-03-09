import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {BadgeType, IBadge, IServerGroup} from 'coh-content-db';
import {SessionStorage} from 'ngx-store';
import {FilterBadgeTypePipe} from '../filter-badge-type.pipe';
import {FilterBadgeMapPipe} from '../filter-badge-map.pipe';
import {FilterBadgeSearchPipe, FilterBadgeSearchType} from '../filter-badge-search.pipe';
import {BadgeSortDirection, BadgeSortPipe, BadgeSortType} from '../badge-sort.pipe';
import {AlignmentFilterType, FilterBadgeAlignmentPipe} from '../filter-badge-alignment.pipe';
import {PagePipe} from '../../common/page.pipe';
import {faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: "badge-list",
    templateUrl: "./badge-list.component.html",
    styleUrls: ["./badge-list.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class BadgeListComponent implements OnInit {
    public sortIcon = faSort;
    public sortAsc = faSortUp;
    public sortDesc = faSortDown;

    public badgeSortType: typeof BadgeSortType = BadgeSortType;
    public badgeSortDirection: typeof BadgeSortDirection = BadgeSortDirection;
    public badgeType: typeof BadgeType = BadgeType;

    @Input() public serverGroup: IServerGroup;
    badges: IBadge[];
    totalItems: number;
    pageCount: number = 1;

    constructor(private filterBadgeType: FilterBadgeTypePipe,
                private filterBadgeMap: FilterBadgeMapPipe,
                private filterBadgeSearch: FilterBadgeSearchPipe,
                private filterBadgeAlignmentPipe: FilterBadgeAlignmentPipe,
                private badgeSort: BadgeSortPipe,
                private pagePipe: PagePipe) {
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

    @SessionStorage("badge-list.mapKey")
    _mapKey: string = "";

    get mapKey(): string {
        return this._mapKey;
    }

    set mapKey(value: string) {
        this._mapKey = value;
        this.update();
    }

    @SessionStorage("badge-list.queryStr")
    _queryStr: string = "";

    get queryStr(): string {
        return this._queryStr;
    }

    set queryStr(value: string) {
        this._queryStr = value;
        this.update();
    }

    @SessionStorage("badge-list.searchType")
    _searchType: FilterBadgeSearchType = "names";

    get searchType(): FilterBadgeSearchType {
        return this._searchType;
    }

    set searchType(value: FilterBadgeSearchType) {
        console.log(value);
        this._searchType = value;
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

    @SessionStorage("badge-list.page")
    private _page: number = 1;

    get page(): number {
        return this._page;
    }

    set page(value: number) {
        this._page = value;
        this.update();
    }

    @SessionStorage("badge-list.itemsPerPage")
    private _itemsPerPage: number = 50;

    get itemsPerPage(): number {
        return this._itemsPerPage;
    }

    set itemsPerPage(value: number) {
        this._itemsPerPage = value;
        this.update();
    }

    @SessionStorage('badge-list.sort')
    private _sortType: BadgeSortType = BadgeSortType.CANONICAL;

    get sortType(): BadgeSortType {
        return this._sortType;
    }

    @SessionStorage('badge-list.sort-direction')
    private _sortDirection: BadgeSortDirection = BadgeSortDirection.ASC;

    get sortDirection(): BadgeSortDirection {
        return this._sortDirection;
    }

    ngOnInit(): void {
        this.update();
    }

    update(): void {
        let badges = this.serverGroup.badges;
        badges = this.filterBadgeType.transform(badges, this._type);
        badges = this.filterBadgeMap.transform(badges, this._mapKey);
        badges = this.filterBadgeSearch.transform(badges, this._searchType, this._queryStr);
        badges = this.filterBadgeAlignmentPipe.transform(badges, this._alignment);
        badges = this.badgeSort.transform(badges, this._sortType, this._sortDirection);

        this.totalItems = badges.length;

        if ((this._page - 1) * this.itemsPerPage > this.totalItems) {
            this._page = 1;
        }

        badges = this.pagePipe.transform(badges, this._page, this.itemsPerPage);

        this.badges = badges;
    }

    clearFilters() {
        this._type = "" as BadgeType;
        this._mapKey = "";
        this.queryStr = "";
        this._alignment = "" as AlignmentFilterType;
        this._sortType = "" as BadgeSortType;
        this._sortDirection = BadgeSortDirection.ASC;
        this._itemsPerPage = 50;
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
}
