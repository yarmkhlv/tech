import { createContext, useEffect, useReducer, useState } from 'react';

import {
    advertisementsReducer,
    initStateAdvsReducer,
} from '../reducers/advertisements/reducer';

import { AdvertisementList } from '../components/widgets/AdvertisementList';
import { AdManagment } from '../components/widgets/AdManagment/AdManagment';
import { Loader } from '../components/shared/Loader';
import { FormCreateAdvertisment } from '../components/widgets/Forms/FormCreateAdvertisment';
import Modal from '../components/shared/Modal/Modal';

import { getAdvertisements } from '../helpers/api';

import useModal from '../hooks/useModal';

import { Option } from '../components/shared/Select/helpers/types';
import { TAdvertisment } from '../../types';

export type AdvertismentState = TAdvertisment[] | null;

export const AdsListPageContext = createContext(initStateAdvsReducer);

export function AdsListPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(false);

    const [state, dispatch] = useReducer(
        advertisementsReducer,
        initStateAdvsReducer,
    );
    const [isDataFromSearch, setIsDataFromSearch] = useState(false);

    const handleChangePage = (event: { selected: number }) => {
        dispatch({
            type: 'changedCurrentPage',
            payload: { currentPage: event.selected },
        });
    };
    const handleChangeSelect = (option: Option) => {
        dispatch({
            type: 'changedSelectedCount',
            payload: { countPerPage: option },
        });
    };
    const handleChangeState = (response: {
        data: TAdvertisment[];
        pages: number;
    }) => {
        dispatch({
            type: 'updStateBasedOnDataRequest',
            payload: {
                advertisementItems: response.data,
                countPagesForPagination: response.pages,
            },
        });
    };

    useEffect(() => {
        if (isDataFromSearch) return;
        setLoading(true);
        const fetchAdvertisements = async () => {
            const response = await getAdvertisements(
                state.currentPage + 1,
                state.countPerPage.value,
            );
            if (response !== null) {
                handleChangeState(response);
                setLoading(false);
            }
        };
        fetchAdvertisements();
    }, [state.currentPage, state.countPerPage.value, isDataFromSearch]);

    if (loading || !state.countPagesForPagination || !state.advertisementItems)
        return <Loader />;

    return (
        <AdsListPageContext.Provider value={state}>
            <AdManagment
                handleChangePage={handleChangePage}
                handleChangeSelect={handleChangeSelect}
                handleChangeState={handleChangeState}
                openModal={openModal}
                isDataFromSearch={isDataFromSearch}
                setIsDataFromSearch={setIsDataFromSearch}
            />
            <AdvertisementList itemsDataAdv={state.advertisementItems} />
            <Modal isOpen={isOpen} onClose={closeModal}>
                <FormCreateAdvertisment closeForm={closeModal} />
            </Modal>
        </AdsListPageContext.Provider>
    );
}
