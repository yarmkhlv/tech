import { useEffect, useState } from 'react';

import { Card } from '../Card';
import { Loader } from '../Loader';
import { CustomSelect } from '../Select/CustomSelect';

import ReactPaginate from 'react-paginate';

import { getFiltratedAdvertisements } from './helpers/getFiltratedAdvertisements';

import { Advertisment } from '../Card/types';
import { Option } from '../Select/types';

import styles from './advertisementList.module.scss';
import { getAdvertisementsLength } from './helpers/getAdvertisementsLength';

type AdvertismentState = Advertisment[] | null;

const options = [
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

export function AdvertisementList() {
    const [advertisementItems, setAdvertisementItems] =
        useState<AdvertismentState>([]);

    const [renderItems, setRenderItems] = useState<React.ReactNode[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [countAllItems, setCountAllItems] = useState(0);
    const [pageCount, setPageCount] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(
        options[0],
    );

    const handlePageChange = (event: { selected: number }) => {
        setCurrentPage(event.selected + 1);
    };

    const handleChangeSelect = (option: Option) => {
        setSelectedItemsPerPage(option);
    };

    useEffect(() => {
        const newPageCount = Math.ceil(
            countAllItems / selectedItemsPerPage.value,
        );
        setPageCount(newPageCount);
        if (newPageCount > 0 && newPageCount < currentPage) {
            setCurrentPage(newPageCount);
        }
    }, [countAllItems, selectedItemsPerPage.value]);

    useEffect(() => {
        const fetchLength = async () => {
            const response = await getAdvertisementsLength();
            if (response !== null) {
                setCountAllItems(response);
                setIsLoading(false);
            }
        };
        fetchLength();
    }, []);

    useEffect(() => {
        const fetchAdvertisements = async () => {
            setIsLoading(true);
            const start = (currentPage - 1) * selectedItemsPerPage.value;
            const response = await getFiltratedAdvertisements(
                start,
                selectedItemsPerPage.value,
            );
            if (response !== null) {
                setAdvertisementItems(response);
                setIsLoading(false);
            }
        };
        fetchAdvertisements();
    }, [currentPage, pageCount, selectedItemsPerPage.value]);

    useEffect(() => {
        if (!(advertisementItems && advertisementItems.length > 0)) return;
        const elements = advertisementItems.map((data) => (
            <Card key={data.id} {...data} />
        ));
        setRenderItems(elements);
    }, [advertisementItems]);

    if (isLoading || advertisementItems === null || !pageCount) {
        return <Loader />;
    }

    return (
        <>
            <ReactPaginate
                className={styles.pagination}
                pageLinkClassName={styles.page}
                activeLinkClassName={styles.pageActive}
                nextLinkClassName={styles.pageNext}
                previousLinkClassName={styles.pagePrevious}
                disabledLinkClassName={styles.pageDisabled}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageChange}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
            <CustomSelect
                options={options}
                value={selectedItemsPerPage}
                onChange={handleChangeSelect}
            />
            <div className={styles.advertisementListContainer}>
                {renderItems}
            </div>
        </>
    );
}
