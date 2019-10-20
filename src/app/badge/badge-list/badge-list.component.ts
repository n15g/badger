import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {BadgeType, IBadge, IServerGroup} from "coh-content-db";
import {SessionStorage} from "ngx-store";
import {FilterBadgeTypePipe} from "../filter-badge-type.pipe";
import {FilterBadgeMapPipe} from "../filter-badge-map.pipe";
import {FilterBadgeSearchPipe} from "../filter-badge-search.pipe";
import {BadgeSortPipe, BadgeSortType} from "../badge-sort.pipe";
import {AlignmentFilterType, FilterBadgeAlignmentPipe} from "../filter-badge-alignment.pipe";
import {PagePipe} from "../../common/page.pipe";

@Component({
    selector: "badge-list",
    templateUrl: "./badge-list.component.html",
    styleUrls: ["./badge-list.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class BadgeListComponent implements OnInit {
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

    @SessionStorage("badge-list.sort")
    _sort: BadgeSortType = "" as BadgeSortType;

    get sort(): BadgeSortType {
        return this._sort;
    }

    set sort(value: BadgeSortType) {
        this._sort = value;
        this.update();
    }

    ngOnInit(): void {
        this.update();
    }

    update(): void {
        let badges = this.serverGroup.badges;
        badges = this.filterBadgeType.transform(badges, this._type);
        badges = this.filterBadgeMap.transform(badges, this._mapKey);
        badges = this.filterBadgeSearch.transform(badges, this._queryStr);
        badges = this.filterBadgeAlignmentPipe.transform(badges, this._alignment);
        badges = this.badgeSort.transform(badges, this._sort);

        this.totalItems = badges.length;

        if (this._page * this.itemsPerPage > this.totalItems) {
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
        this._sort = "" as BadgeSortType;
        this.page = 1;
        this.update();
    }
}
