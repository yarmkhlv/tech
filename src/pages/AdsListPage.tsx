import { useCallback, useEffect, useState } from 'react';

import { Paginate } from '../components/Paginate/Paginate';
import { AdvertisementList } from '../components/AdvertisementList';
import { CustomSelect } from '../components/Select/CustomSelect';
import { Loader } from '../components/Loader';

import { Option } from '../components/Select/types';
import { TAdvertisment } from '../../types';

import {
    getAllAdvertisements,
    getFiltratedAdvertisements,
} from '../components/AdvertisementList/helpers';

const OPTIONS_FOR_SELECT = [
    {
        value: 10,
        label: '10',
    },
    {
        value: 20,
        label: '20',
    },
    {
        value: 30,
        label: '30',
    },
];

type AdvertismentState = TAdvertisment[] | null;

export function AdsListPage() {
    const [loading, setLoading] = useState(false);
    const [advertisementItems, setAdvertisementItems] =
        useState<AdvertismentState>([]);

    const [countAllItems, setCountAllItems] = useState<null | number>(null);

    const [countPagesForPagination, setCountPagesForPagination] = useState<
        null | number
    >(null);
    const [adCountPerPage, setAdCountPerPage] = useState(OPTIONS_FOR_SELECT[0]);
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    const handleChangeSelect = (option: Option) => {
        setAdCountPerPage(option);
    };

    const fetchAdvertisements = useCallback(async () => {
        setLoading(true);
        const start = currentPage * adCountPerPage.value;
        const response = await getFiltratedAdvertisements(
            start,
            adCountPerPage.value,
        );
        if (response !== null) {
            setAdvertisementItems(response);
            setLoading(false);
        }
    }, [currentPage, adCountPerPage.value]);

    useEffect(() => {
        if (!countAllItems || countAllItems < 1) return;
        const newCount = Math.ceil(countAllItems / adCountPerPage.value);
        setCountPagesForPagination(newCount);
        if (newCount < currentPage) {
            setCurrentPage(newCount - 1);
        } else {
            fetchAdvertisements();
        }
    }, [countAllItems, adCountPerPage.value]);

    useEffect(() => {
        const fetchLength = async () => {
            const response = await getAllAdvertisements();
            if (response !== null) {
                setCountAllItems(response.length);
                setLoading(false);
            }
        };
        fetchLength();
    }, []);

    useEffect(() => {
        fetchAdvertisements();
    }, [currentPage]);

    if (loading || !countPagesForPagination || !advertisementItems)
        return <Loader />;

    return (
        <>
            <Paginate
                onPageChange={handlePageChange}
                pageCount={countPagesForPagination}
                currentPage={currentPage}
            />
            <CustomSelect
                options={OPTIONS_FOR_SELECT}
                value={adCountPerPage}
                onChange={handleChangeSelect}
            />
            <AdvertisementList itemsDataAdv={advertisementItems} />
        </>
    );
}
