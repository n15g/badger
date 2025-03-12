import {Pipe, PipeTransform} from "@angular/core";
import {EnhancementCategory} from "coh-content-db";
import {EnhancementCategoryPipe, IEnhancementCategory} from "./enhancement-category.pipe";
import * as _ from 'lodash';

@Pipe({
    name: "enhancementCategories"
})
export class EnhancementCategoriesPipe implements PipeTransform {

    public constructor(private enhancementCategory: EnhancementCategoryPipe) {
    }

    public transform(value: EnhancementCategory[]): IEnhancementCategory[] {
        return _.map(value, (enhancementCategory) => this.enhancementCategory.transform(enhancementCategory));
    }
}

