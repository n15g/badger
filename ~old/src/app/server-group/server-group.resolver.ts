import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {ContentDbService} from "../content-db/content-db.service";
import {IServerGroup} from "coh-content-db";

@Injectable()
export class ServerGroupResolver implements Resolve<IServerGroup> {

    constructor(private contentDbService: ContentDbService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IServerGroup {
        const serverGroupKey = route.params["serverGroupKey"];

        return this.contentDbService.getServerGroup(serverGroupKey);
    }
}
