import { atom } from "jotai";
import { Item } from "./interface/item";
import { ItemSet } from "./interface/itemSet";

const initItemSet: ItemSet[] = [
    {
        weapon: null,
        amulet: null,
        earRing: null,
        jacket: null,
        magicStone: null,
        pants: null,
        ring: null,
        shoes: null,
        shoulder: null,
        support: null,
        waist: null,
        wrist: null
    }
]

export const itemSetStore = atom<ItemSet[]>(initItemSet);