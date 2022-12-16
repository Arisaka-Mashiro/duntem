import { Avatar, Input, List, Select, Space } from 'antd';
import { useState, useEffect } from "react";
import type { SelectProps } from 'antd';
import useSWR from 'swr';
import axios from "axios";
import { Item } from '../interface/item';
import { useAtom } from 'jotai';
import { itemSetStore } from '../store';
import { ItemType } from '../interface/enums/itemType';
import { ItemSet, getItemList } from '../interface/itemSet';
const { Search } = Input;

type Props = {
    itemSet: ItemSet;
};

const itemSetListCard: React.FC<Props> = ({ itemSet }) => {
    const [itemSetList, setItemSetList] = useAtom(itemSetStore);

    const handleClick = (item: Item | null) => {
        console.log(item);
    }

    const itemList = getItemList(itemSet);

    return (
        <Space direction="vertical" style={{ width: 400 }}>
            <List
                size="large"
                bordered
                dataSource={itemList}
                rowKey={(item) => item?.itemId ?? 'no-item'}
                renderItem={(item, i) => {
                    return (
                        <List.Item
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleClick(item)}
                            key={i}
                        >
                            <List.Item.Meta
                                avatar={item?.itemId ? <Avatar src={`https://img-api.neople.co.kr/df/items/${item?.itemId}`} shape='square' /> : <Avatar shape='square' />}
                                title={item?.itemName}
                                description={item?.itemTypeDetail}
                            />
                        </List.Item>
                    );
                }}
            />
        </Space>
    );
};

export default itemSetListCard;