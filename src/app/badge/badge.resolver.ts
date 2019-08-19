import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {ContentDbService} from "../content-db/content-db.service";
import {IBadge} from "../content-db/badge-set/badge.interface";

@Injectable()
export class BadgeResolver implements Resolve<IBadge> {

    constructor(private contentDbService: ContentDbService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBadge> | IBadge {
        const badgeSetKey = route.params["badgeSetKey"];
        const badgeKey = route.params["badgeKey"];

        const badge = this.contentDbService.getBadge(badgeSetKey, badgeKey);

        return badge ? badge : throwError(`No badge with key [${badgeSetKey}:${badgeKey}]`);
    }

}
