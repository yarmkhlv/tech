import { useContext, useEffect, useState } from 'react';

import { AdvertisementList } from '../components/widgets/AdvertisementList';
import { AdManagment } from '../components/widgets/AdManagment/AdManagment';
import { Loader } from '../components/shared/Loader';
import { FormCreateAdvertisment } from '../components/widgets/Forms/FormCreateAdvertisment';
import Modal from '../components/shared/Modal/Modal';

import {
    AdsListPageContext,
    AdsListPageHandlersContext,
} from '../context/AdsListPageContext';

import { getAdvertisements } from '../helpers/api';

import useModal from '../hooks/useModal';

import { TAdvertisment } from '../../types';

export type AdvertismentState = TAdvertisment[] | null;

export function AdsListPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(false);

    const {
        currentPage,
        countPerPage,
        searchDebouncedValue,
        countPagesForPagination,
        advertisementItems,
    } = useContext(AdsListPageContext);

    const { handleChangeState } = useContext(AdsListPageHandlersContext);

    useEffect(() => {
        setLoading(true);
        const fetchAdvertisements = async () => {
            const response = await getAdvertisements(
                currentPage + 1,
                countPerPage.value,
                searchDebouncedValue,
            );
            if (response !== null) {
                handleChangeState(response);
                setLoading(false);
            }
        };
        fetchAdvertisements();
    }, [currentPage, countPerPage.value, searchDebouncedValue]);

    if (loading || !countPagesForPagination || !advertisementItems)
        return <Loader />;

    return (
        <>
            <AdManagment openModal={openModal} />
            <AdvertisementList itemsDataAdv={advertisementItems} />
            <Modal isOpen={isOpen} onClose={closeModal}>
                <FormCreateAdvertisment closeForm={closeModal} />
            </Modal>
        </>
    );
}
