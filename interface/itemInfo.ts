interface Option {
    level: number;
    explainDetail: string;
    damage: number;
    buff: number;
};
interface GrowInfo {
    total: { damage: number, buff: number, level: number }
    options: Option[]
};

export interface ItemInfo {
    itemId: string;
    itemName: string;
    itemType: string;
    itemTypeDetail: string;
    itemStatus: { name: string, value: string }[];
    growInfo: GrowInfo;
    hashtag: string[];
};