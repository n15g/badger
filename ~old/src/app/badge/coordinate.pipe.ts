import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
    name: "coordinate"
})
export class CoordinatePipe implements PipeTransform {

    public transform(value: number, args?: any): string {
        return value ? value.toFixed(1) : "0.0";
    }

}

