import {Component, Input} from "@angular/core";
import {EnhancementCategory} from "coh-content-db";

@Component({
    selector: "invention-types",
    templateUrl: "./invention-types.component.html",
    styleUrls: ["./invention-types.component.scss"]
})
export class InventionTypesComponent {
    @Input() public inventionTypes: EnhancementCategory[];
}
