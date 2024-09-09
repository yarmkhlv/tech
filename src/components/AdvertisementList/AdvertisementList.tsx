import { useEffect, useState } from 'react';

import { Card } from '../Card';

import { TAdvertisment } from '../../../types';

import styles from './advertisementList.module.scss';

interface IPropsAdvertisementList {
    itemsDataAdv: TAdvertisment[] | null;
}

export function AdvertisementList({ itemsDataAdv }: IPropsAdvertisementList) {
    const [renderItems, setRenderItems] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        if (!(itemsDataAdv && itemsDataAdv.length > 0)) return;
        const elements = itemsDataAdv.map((data) => (
            <Card key={data.id} {...data} />
        ));
        setRenderItems(elements);
    }, [itemsDataAdv]);

    if (itemsDataAdv === null || itemsDataAdv.length < 1) {
        return null;
    }

    return (
        <div className={styles.advertisementListContainer}>{renderItems}</div>
    );
}
