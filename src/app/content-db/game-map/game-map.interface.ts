import {GameMapKey} from "./game-map-key";
import {ILink} from "../../util/link.interface";

export interface IGameMap {
    readonly key: GameMapKey;
    readonly name: string;
    readonly links: ILink[];
}
