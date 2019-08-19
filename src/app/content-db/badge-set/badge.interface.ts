import {AlternateNameType} from "./alternate-name-type.enum";
import {ILink} from "../../util/link.interface";
import {BadgeType} from "../badge-type.enum";

export interface IBadge {
    readonly key: string;
    readonly badgeSetKey: string;
    readonly type: BadgeType;
    readonly canonicalName: string;
    readonly alternateNames: IAlternateName[];
    readonly alignment: AlignmentFlags;
    readonly badgeText?: string;
    readonly acquisition?: string;
    readonly imageNames?: string[];
    readonly notes?: string;
    readonly links: ILink[];

    readonly mapKey?: string;
    readonly location?: number[];
    readonly vidiotMapNumber?: number;
}

export interface IAlternateName {
    readonly type: AlternateNameType,
    readonly value: string
}

export interface AlignmentFlags {
    h: boolean,
    v: boolean,
    p: boolean
}
