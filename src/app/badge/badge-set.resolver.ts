import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {ContentDbService} from "../content-db/content-db.service";
import {IBadgeSet} from "../content-db/badge-set/badge-set.interface";

@Injectable()
export class BadgeSetResolver implements Resolve<IBadgeSet> {

    constructor(private contentDbService: ContentDbService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBadgeSet> | IBadgeSet {
        const badgeSetKey = route.params["badgeSetKey"];

        const badgeSet = this.contentDbService.getBadgeSet(badgeSetKey);

        return badgeSet ? badgeSet : throwError(`No badge set with key [${badgeSetKey}]`);
    }

}
