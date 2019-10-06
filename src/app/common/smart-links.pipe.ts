import {Pipe, PipeTransform} from "@angular/core";
import {IServerGroup} from "coh-content-db";
import * as _ from 'lodash';
import {SafeHtml} from "@angular/platform-browser";
import {BadgeNamePipe} from "../badge/badge-name.pipe";
import {BadgePipe} from "../badge/badge.pipe";

@Pipe({
    name: "smartLinks"
})
export class SmartLinksPipe implements PipeTransform {


    constructor(
        private badge: BadgePipe,
        private badgeName: BadgeNamePipe
    ) {
    }

    public transform(html: string, args: { serverGroup: IServerGroup }): SafeHtml {
        html = _.replace(html, /\[badge:([^\]]*)]/g, (str, $1) => this.getBadgeLink(args.serverGroup, $1));

        return html;
    }

    private getBadgeLink(serverGroup, badgeKey) {
        const badge = this.badge.transform(badgeKey, serverGroup);

        return badge != null
            ? `<a href="/${serverGroup.key}/badge/${badgeKey}" class="smart-link ref">${this.badgeName.transform(badge)}</a>`
            : `<span class='smart-link ref bad-link'>${badgeKey}</span>`;
    }
}
