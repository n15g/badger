import {Pipe, PipeTransform} from "@angular/core";
import {EnhancementCategory} from "coh-content-db";

@Pipe({
    name: "enhancementCategory"
})
export class EnhancementCategoryPipe implements PipeTransform {

    public transform(value: EnhancementCategory): IEnhancementCategory {
        switch (value) {
            case EnhancementCategory.ACCURACY:
                return {key: value, name: "Accuracy", class: "accuracy"};
            case EnhancementCategory.CONFUSE:
                return {key: value, name: "Confuse", class: "confuse"};
            case EnhancementCategory.DAMAGE:
                return {key: value, name: "Damage", class: "damage"};
            case EnhancementCategory.DEFENSE_BUFF:
                return {key: value, name: "Defense Buff", class: "defense-buff"};
            case EnhancementCategory.DEFENSE_DEBUFF:
                return {key: value, name: "Defense Debuff", class: "defense-debuff"};
            case EnhancementCategory.ENDURANCE_MODIFICATION:
                return {key: value, name: "Endurance Modification", class: "endurance-modification"};
            case EnhancementCategory.ENDURANCE_REDUCTION:
                return {key: value, name: "Endurance Reduction", class: "endurance-reduction"};
            case EnhancementCategory.FEAR:
                return {key: value, name: "Fear", class: "fear"};
            case EnhancementCategory.FLY_SPEED:
                return {key: value, name: "Fly Speed", class: "fly-speed"};
            case EnhancementCategory.HEALING:
                return {key: value, name: "Healing", class: "healing"};
            case EnhancementCategory.HOLD:
                return {key: value, name: "Hold", class: "hold"};
            case EnhancementCategory.IMMOBILIZE:
                return {key: value, name: "Immobilize", class: "immobilize"};
            case EnhancementCategory.INTANGIBILITY:
                return {key: value, name: "Intangibility", class: "intangibility"};
            case EnhancementCategory.INTERRUPT_DURATION:
                return {key: value, name: "Interrupt Duration", class: "interrupt-duration"};
            case EnhancementCategory.JUMP:
                return {key: value, name: "Jump", class: "jump"};
            case EnhancementCategory.KNOCKBACK:
                return {key: value, name: "Knockback", class: "knockback"};
            case EnhancementCategory.RANGE:
                return {key: value, name: "Range", class: "range"};
            case EnhancementCategory.RECHARGE_REDUCTION:
                return {key: value, name: "Recharge Reduction", class: "recharge-reduction"};
            case EnhancementCategory.RESIST_DAMAGE:
                return {key: value, name: "Resist Damage", class: "resist-damage"};
            case EnhancementCategory.RUN_SPEED:
                return {key: value, name: "Run Speed", class: "run-speed"};
            case EnhancementCategory.SLEEP:
                return {key: value, name: "Sleep", class: "sleep"};
            case EnhancementCategory.SLOW:
                return {key: value, name: "Slow", class: "slow"};
            case EnhancementCategory.STUN:
                return {key: value, name: "Stun", class: "stun"};
            case EnhancementCategory.TAUNT:
                return {key: value, name: "Taunt", class: "taunt"};
            case EnhancementCategory.TO_HIT_BUFF:
                return {key: value, name: "To-hit Buff", class: "to-hit-buff"};
            case EnhancementCategory.TO_HIT_DEBUFF:
                return {key: value, name: "To-hit Debuff", class: "to-hit-debuff"};
            default:
                return null;
        }
    }
}

export interface IEnhancementCategory {
    key: EnhancementCategory,
    name: string,
    class: string
}
