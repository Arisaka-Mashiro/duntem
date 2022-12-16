import { atom } from "jotai";
import { Item } from "./interface/item";
import { ItemSet } from "./interface/itemSet";

export const ITEM_SET_INIT_VALUE: ItemSet = {
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
};

const initItemSet: ItemSet[] = [
    ITEM_SET_INIT_VALUE
];

export const itemSetStore = atom<ItemSet[]>(initItemSet);