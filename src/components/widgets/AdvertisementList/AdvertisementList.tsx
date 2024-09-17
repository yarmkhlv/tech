import { useEffect, useState } from 'react';

import { Card } from '../../shared/Card';

import { TAdvertisment } from '../../../../types';

import styles from './advertisementList.module.scss';

interface IPropsAdvertisementList {
    itemsDataAdv: TAdvertisment[] | null;
}

export function AdvertisementList({ itemsDataAdv }: IPropsAdvertisementList) {
    const [renderItems, setRenderItems] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        if (!(itemsDataAdv && itemsDataAdv.length > 0)) return;
        const elements = itemsDataAdv.map((item: TAdvertisment) => {
            if (!item.id) return;
            return <Card key={item.id} {...item} />;
        });
        setRenderItems(elements);
    }, [itemsDataAdv]);

    if (itemsDataAdv === null || itemsDataAdv.length < 1) {
        return <p>Нет данных</p>;
    }

    return (
        <div className={styles.advertisementListContainer}>{renderItems}</div>
    );
}
