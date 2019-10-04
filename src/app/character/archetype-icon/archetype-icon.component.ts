import {Component, Input} from '@angular/core';
import {IArchetype} from "coh-content-db/dist/types/archetype";

@Component({
    selector: 'archetype-icon',
    templateUrl: './archetype-icon.component.html',
    styleUrls: ['./archetype-icon.component.scss']
})
export class ArchetypeIconComponent {
    @Input() public archetype: IArchetype;

    public getSrc() {
        return `./assets/archetype/${this.archetype.key}.png`;
    }
}
