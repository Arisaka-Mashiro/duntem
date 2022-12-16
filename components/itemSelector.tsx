import { Avatar, Button, Input, List, Select, Space } from 'antd';
import { useState, useEffect } from "react";
import type { SelectProps } from 'antd';
import useSWR from 'swr';
import axios from "axios";
import { Item } from '../interface/item';
import { useAtom } from 'jotai';
import { itemSetStore, ITEM_SET_INIT_VALUE } from '../store';
import { ItemType } from '../interface/enums/itemType';
import { PlusOutlined } from '@ant-design/icons';
const { Search } = Input;

const ItemSelector: React.FC = () => {
    const hashTagList = [ "HP MAX", "HP 소모", "HP 조건", "HP 회복", "MP MAX", "MP 소모", "MP 조건", "MP 회복", "가드", "감전", "감전 데미지", "거대화", "골드", "공격 속도", "근접", "기본기 숙련", "기절", "대쉬", "대시 공격", "도약", "소울", "마법 부여 효과", "명속성 강화", "명속성 저항", "모든 속성 강화", "모든 속성 저항", "무력화", "큐브 조각", "무색 큐브 조각 소모 스킬", "무색 큐브 조각 미소모 스킬", "무적", "받는 데미지", "받는 피해 속성 전환", "방어력", "방어력 무시", "백스텝", "백어택", "보호막", "부활", "비 카운터", "비행", "빙결", "상태 이상 내성", "지속 시간 증가", "석화", "소모품", "소형화", "속성 부여", "속성 저항 조건", "수면", "수속성 강화", "수속성 저항", "순간이동", "슈퍼 아머", "스킬 MP 소모량 감소", "스킬 MP 소모량 증가", "스킬 공격력 증가", "스킬 레벨", "스킬 범위", "스킬 쿨타임", "아바타", "아이템 습득", "암속성 강화", "암속성 저항", "암흑", "약점 속성", "오브젝트", "이동 속도", "이동 속도 조건", "자세 회복", "장비 옵션 조작키", "저주", "적 HP 감소", "적중률", "적중률 조건", "점프", "점프 공격", "점프력", "중독", "중독 데미지", "지속 시간 감소", "질주", "출혈", "출혈 데미지", "충격파", "카모플라쥬", "카운터", "캐스팅 속도", "커맨드", "콤보", "퀵 스탠딩", "퀵슬롯", "크리쳐", "크리티컬 히트", "파티원", "평타", "피해 증가", "화상", "화상 데미지", "화속성 강화", "화속성 저항", "회피율", "종족 타입", "둔화", "혼란", "구속", "공격 속도 조건", "상태 이상 내성 조건", "상태 이상 데미지 조건", "오브젝트 데미지", "세팅 특화 장비", "융합 장비" ];
    const options: SelectProps['options'] = [];
    hashTagList.forEach(tag => {
        options.push({
            label: tag,
            value: tag,
        });
    });

    const [itemSetList, setItemSetList] = useAtom(itemSetStore);
    const [hashTags, setHashTags] = useState<string[]>([]);
    const [keyword, setKeyword] = useState<string>('');

    const fetcher = (url: string) => {
        if (hashTags.length === 0 && !keyword) return [];
        return axios.get(url).then((res) => res.data);
    };
    const { data, error } = useSWR<Item[]>(`/api/search-items?itemName=${keyword}&hashTag=${hashTags.join(',')}`, fetcher);

    const addItemSet = () => {
        setItemSetList([...itemSetList, ITEM_SET_INIT_VALUE]);
        console.log('itemSetList', itemSetList);
    };
    const equipItem = (index: number, item: Item) => {
        console.log('itemSetList', itemSetList);
        const [itemType] = item.itemTypeDetail.split(' ').slice(-1);
        switch (itemType) {
            case ItemType.WEAPON:
                itemSetList[index].weapon = item;
                break;
            case ItemType.JACKET:
                itemSetList[index].jacket = item;
                break;
            case ItemType.SHOULDER:
                itemSetList[index].shoulder = item;
                break;
            case ItemType.PANTS:
                itemSetList[index].pants = item;
                break;
            case ItemType.SHOES:
                itemSetList[index].shoes = item;
                break;
            case ItemType.WAIST:
                itemSetList[index].waist = item;
                break;
            case ItemType.AMULET:
                itemSetList[index].amulet = item;
                break;
            case ItemType.WRIST:
                itemSetList[index].wrist = item;
                break;
            case ItemType.RING:
                itemSetList[index].ring = item;
                break;
            case ItemType.SUPPORT:
                itemSetList[index].support = item;
                break;
            case ItemType.MAGIC_STON:
                itemSetList[index].magicStone = item;
                break;
            case ItemType.EARRING:
                itemSetList[index].earRing = item;
                break;
            default:
                throw new Error(`존재하지 않는 타입(${itemType})`);
        }
        setItemSetList(itemSetList);
    };
    const onSearch = (value: string) => {
        console.log(`onSearch ${value}`);
        setKeyword(value);
    };
    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
        setHashTags(value);
    };
    const handleClick = (item: Item) => {
        console.log(item);
        equipItem(0, item);
    }
  
    return (
        <Space direction="vertical" style={{ paddingLeft: 16 }}>
            <Button 
                type="primary"
                icon={<PlusOutlined />}
                onClick={addItemSet}
            >
                아이템 세트 추가
            </Button>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="아이템 해시태그 입력"
                defaultValue={[]}
                onChange={handleChange}
                options={options}
            />
            <Search placeholder="아이템 이름 검색" allowClear onSearch={onSearch} style={{ width: 400 }} />
            <List
                size="large"
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item 
                        style={{cursor: 'pointer'}}
                        onClick={() => handleClick(item)}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} shape='square' />}
                            title={item.itemName}
                            description={item.itemTypeDetail}
                        />
                    </List.Item>
                )}
            />
        </Space>
    );
  };
  
  export default ItemSelector;