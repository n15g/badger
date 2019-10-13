import {Pipe, PipeTransform} from "@angular/core";
import {IGameMap, IServerGroup} from "coh-content-db";

@Pipe({
    name: "smartLinks"
})
export class GameMapPipe implements PipeTransform {

    public transform(mapKey: string, serverGroup: IServerGroup): IGameMap | null {
        return serverGroup.getMap(mapKey);
    }
}
