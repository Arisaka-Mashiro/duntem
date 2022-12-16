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
import ItemSetListCard from './itemSetListCard';
const { Search } = Input;

const itemSetList: React.FC = () => {
    const [itemSetList, setItemSetList] = useAtom(itemSetStore);

    const handleClick = (item: Item | null) => {
        console.log(item);
    }
  
    return (
        <Space direction="horizontal">
            {itemSetList.map((itemSet) => {
                return (
                    <ItemSetListCard itemSet={itemSet} />
                )
            })}
        </Space>
    );
  };
  
  export default itemSetList;