import { Item } from "./item";

export interface ItemSet {
    weapon: Item | null;
    jacket: Item | null;
    shoulder: Item | null;
    pants: Item | null;
    shoes: Item | null;
    waist: Item | null;
    amulet: Item | null;
    wrist: Item | null;
    ring: Item | null;
    support: Item | null;
    magicStone: Item | null;
    earRing: Item | null;
};

export function getItemList(itemSet: ItemSet) {
    return [
        itemSet.weapon,
        itemSet.jacket,
        itemSet.shoulder,
        itemSet.pants,
        itemSet.shoes,
        itemSet.waist,
        itemSet.amulet,
        itemSet.wrist,
        itemSet.ring,
        itemSet.support,
        itemSet.magicStone,
        itemSet.earRing,
    ]
};