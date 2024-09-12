import { useEffect, useState } from 'react';

import { AdvertisementList } from '../components/widgets/AdvertisementList';
import { Loader } from '../components/shared/Loader';
import { FormCreateAdvertisment } from '../components/widgets/Forms/FormCreateAdvertisment';
import Modal from '../components/shared/Modal/Modal';

import { getAdvertisements } from '../helpers/api';

import useModal from '../hooks/useModal';

import { Option } from '../components/shared/Select/helpers/types';
import { TAdvertisment } from '../../types';
import { OPTIONS_FOR_SELECT_ELEMENTS_COUNT } from '../components/shared/Select/helpers/variables';

import { AdManagment } from '../components/widgets/AdManagment/AdManagment';

export type AdvertismentState = TAdvertisment[] | null;

export function AdsListPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(false);
    const [advertisementItems, setAdvertisementItems] =
        useState<AdvertismentState>([]);

    const [countPagesForPagination, setCountPagesForPagination] = useState<
        null | number
    >(null);
    const [adCountPerPage, setAdCountPerPage] = useState(
        OPTIONS_FOR_SELECT_ELEMENTS_COUNT[0],
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [isDataFromSearch, setIsDataFromSearch] = useState(false);

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
            <AdManagment
                handlePageChange={handlePageChange}
                countPagesForPagination={countPagesForPagination}
                currentPage={currentPage}
                openModal={openModal}
                handleChangeSelect={handleChangeSelect}
                onChange={handleChangeSelect}
                isDataFromSearch={isDataFromSearch}
                setIsDataFromSearch={setIsDataFromSearch}
                setAdvertisementItems={setAdvertisementItems}
                setCurrentPage={setCurrentPage}
                setCountPagesForPagination={setCountPagesForPagination}
                adCountPerPage={adCountPerPage}
            />
            <AdvertisementList itemsDataAdv={advertisementItems} />
            <Modal isOpen={isOpen} onClose={closeModal}>
                <FormCreateAdvertisment closeForm={closeModal} />
            </Modal>
        </>
    );
}
