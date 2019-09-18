import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
import {IServerGroup, ServerGroupStatus} from "coh-content-db";

@Pipe({
    name: "serverGroupSort"
})
export class ServerGroupSortPipe implements PipeTransform {

    transform(value: IServerGroup[], args?: any): IServerGroup[] {
        return _(value)
            .sortBy([
                statusAmount,
                "name"
            ]).value();
    }
}

export function statusAmount(serverGroup: IServerGroup) {
    return _(serverGroup.status).reduce((sigma, status) => {
        switch (status) {
            case ServerGroupStatus.WORK_IN_PROGRESS:
                return sigma + 1;
            case ServerGroupStatus.SUNSET:
                return sigma + 2;
        }
        return sigma;
    }, 0);
}
