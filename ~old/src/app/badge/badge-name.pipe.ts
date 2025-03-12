import {Pipe, PipeTransform} from "@angular/core";
import {IBadge} from "coh-content-db";
import * as _ from 'lodash';
import {AlternatesPipe} from "./alternates.pipe";
import {oc} from "ts-optchain";

@Pipe({
    name: "badgeName"
})
export class BadgeNamePipe implements PipeTransform {

    constructor(private alternates: AlternatesPipe) {
    }

    public transform(badge: IBadge, args?: any): string {
        const names = this.alternates.transform(oc(badge).names([{value: badge.key}]));

        return _(names)
            .map((name) => name.value)
            .join("/");
    }
}
