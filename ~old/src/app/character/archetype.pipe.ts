import {Pipe, PipeTransform} from "@angular/core";
import {IArchetype} from "coh-content-db/dist/types/archetype";
import {IServerGroup} from "coh-content-db";

@Pipe({
    name: "archetype"
})
export class ArchetypePipe implements PipeTransform {

    constructor() {
    }

    public transform(archetypeKey: string, serverGroup: IServerGroup): IArchetype | null {
        try {
            return serverGroup.getArchetype(archetypeKey);
        } catch {
            return null;
        }
    }
}

