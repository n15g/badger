import {Component, Input} from '@angular/core';
import {ILink} from "coh-content-db/dist/types/link";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import {oc} from "ts-optchain";

const PARAGON_WIKI = "https://paragonwiki.com/wiki";

@Component({
    selector: 'links-stacked',
    templateUrl: './links-stacked.component.html',
    styleUrls: ['./links-stacked.component.scss']
})
export class LinksStackedComponent {
    @Input() public links: ILink[];

    public externalLinkIcon = faExternalLinkAlt;

    public getLogo(link: ILink) {
        const href = oc(link).href("");
        if (href.startsWith(PARAGON_WIKI)) {
            return "paragon-wiki";
        } else if (href.startsWith("https://forums.homecomingservers.com") || href.startsWith("https://hcwiki.cityofheroes.dev")) {
            return "homecoming";
        } else {
            return null;
        }
    }
}
