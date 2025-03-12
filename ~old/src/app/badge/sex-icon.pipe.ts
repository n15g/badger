import {Pipe, PipeTransform} from "@angular/core";
import {Alternate, IAlternateValue} from "coh-content-db";
import {oc} from "ts-optchain";
import {faMars, faVenus, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Pipe({
    name: "sexIcon"
})
export class SexIconPipe implements PipeTransform {

    public transform(value: IAlternateValue): IconDefinition {
        switch (oc(value).type()) {
            case Alternate.M:
            case Alternate.MH:
            case Alternate.MV:
            case Alternate.MP:
                return faMars;
            case Alternate.F:
            case Alternate.FH:
            case Alternate.FV:
            case Alternate.FP:
                return faVenus;
            default:
                return null;
        }
    }
}
