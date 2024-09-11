import { useEffect, useState } from 'react';

import { Paginate } from '../components/Paginate/Paginate';
import { AdvertisementList } from '../components/AdvertisementList';
import { CustomSelect } from '../components/Select/CustomSelect';
import { Search } from '../components/Search';
import { Loader } from '../components/Loader';

import { Option } from '../components/Select/types';
import { TAdvertisment } from '../../types';
import { getAdvertisements } from '../helpers/api';

import styles from './adsListPage.module.scss';

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

export type AdvertismentState = TAdvertisment[] | null;

export function AdsListPage() {
    const [loading, setLoading] = useState(false);
    const [advertisementItems, setAdvertisementItems] =
        useState<AdvertismentState>([]);

    const [countPagesForPagination, setCountPagesForPagination] = useState<
        null | number
    >(null);
    const [adCountPerPage, setAdCountPerPage] = useState(OPTIONS_FOR_SELECT[0]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isDataFromSearch, setIsDataFromSearch] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const handlePageChange = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };
    const handleChangeSelect = (option: Option) => {
        setAdCountPerPage(option);
    };

    useEffect(() => {
        if (isDataFromSearch) return;
        setLoading(true);
        const fetchAdvertisements = async () => {
            const response = await getAdvertisements(
                currentPage + 1,
                adCountPerPage.value,
            );
            if (response !== null) {
                setCountPagesForPagination(response.pages);
                if (currentPage > response.pages) {
                    setCurrentPage(response.pages - 1);
                }
                setAdvertisementItems(response.data);
                setLoading(false);
            }
        };
        fetchAdvertisements();
    }, [currentPage, adCountPerPage.value, isDataFromSearch]);

    if (loading || !countPagesForPagination || !advertisementItems)
        return <Loader />;

    return (
        <>
            <Paginate
                onPageChange={handlePageChange}
                pageCount={countPagesForPagination}
                currentPage={currentPage}
            />
            <div className={styles.wrapperForSelectAndSearch}>
                <CustomSelect
                    options={OPTIONS_FOR_SELECT}
                    value={adCountPerPage}
                    onChange={handleChangeSelect}
                />
                <Search
                    isDataFromSearch={isDataFromSearch}
                    setIsDataFromSearch={setIsDataFromSearch}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setAdvertisementItems={setAdvertisementItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setCountPagesForPagination={setCountPagesForPagination}
                    adCountPerPage={adCountPerPage.value}
                />
            </div>
            <AdvertisementList itemsDataAdv={advertisementItems} />
        </>
    );
}
