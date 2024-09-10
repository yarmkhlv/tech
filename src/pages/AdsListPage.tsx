import { useEffect, useState } from 'react';

import { Paginate } from '../components/Paginate/Paginate';
import { AdvertisementList } from '../components/AdvertisementList';
import { CustomSelect } from '../components/Select/CustomSelect';
import { Loader } from '../components/Loader';

import { Option } from '../components/Select/types';
import { TAdvertisment } from '../../types';
import { getAdvertisements } from '../helpers/api';

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

    useEffect(() => {
        setLoading(true);
        const fetchAdvertisements = async () => {
            const response = await getAdvertisements(
                currentPage + 1,
                adCountPerPage.value,
            );
            if (response !== null) {
                setCountPagesForPagination(response.pages);
                if (currentPage > response.pages) {
                    setCurrentPage(response.last - 1);
                }
                setAdvertisementItems(response.data);
                setLoading(false);
            }
        };
        fetchAdvertisements();
    }, [currentPage, adCountPerPage.value]);

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
