import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {ContentDbService} from "../content-db/content-db.service";
import {IBadge} from "coh-content-db";

@Injectable()
export class BadgeResolver implements Resolve<IBadge> {

    constructor(private contentDbService: ContentDbService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IBadge {
        const serverGroupKey = route.params["serverGroupKey"];
        const badgeKey = route.params["badgeKey"];

        return this.contentDbService.getBadge(serverGroupKey, badgeKey);
    }
}
