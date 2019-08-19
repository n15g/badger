import {AlignmentFlags} from "./badge.interface";

export const ANY: AlignmentFlags = {h: true, v: true, p: true};
export const HERO_ONLY: AlignmentFlags = {h: true, v: false, p: false};
export const VILLAIN_ONLY: AlignmentFlags = {h: false, v: true, p: false};
export const PRAETORIAN_ONLY: AlignmentFlags = {h: false, v: false, p: true};
