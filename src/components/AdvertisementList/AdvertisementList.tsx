import { useEffect, useState } from 'react';

import { Card } from '../Card';
import { Loader } from '../Loader';

import { getAdvertisements } from './helpers/getAdvertisements ';

import styles from './advertisementList.module.scss';

export function AdvertisementList() {
    const [advertisementItems, setAdvertisementItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log(advertisementItems, 'advertisementItems');
    useEffect(() => {
        const fetchAdvertisements = async () => {
            setIsLoading(true);
            const response = await getAdvertisements();
            if (response !== null) {
                setAdvertisementItems(response);
                setIsLoading(false);
            }
        };
        fetchAdvertisements();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={styles.advertisementListContainer}>
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    );
}
