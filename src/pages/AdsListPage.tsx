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
    const [searchValue, setSearchValue] = useState('');

    const [state, dispatch] = useReducer(
        advertisementsReducer,
        initStateAdvsReducer,
    );

    const handleChangeDebouncedValue = (value: string) => {
        dispatch({
            type: 'changedSearchDebouncedValue',
            payload: { searchDebouncedValue: value },
        });
    };
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
        setLoading(true);
        const fetchAdvertisements = async () => {
            const response = await getAdvertisements(
                state.currentPage + 1,
                state.countPerPage.value,
                state.searchDebouncedValue,
            );
            if (response !== null) {
                handleChangeState(response);
                setLoading(false);
            }
        };
        fetchAdvertisements();
    }, [
        state.currentPage,
        state.countPerPage.value,
        state.searchDebouncedValue,
    ]);

    if (loading || !state.countPagesForPagination || !state.advertisementItems)
        return <Loader />;

    return (
        <AdsListPageContext.Provider value={state}>
            <AdManagment
                handleChangeDebouncedValue={handleChangeDebouncedValue}
                handleChangePage={handleChangePage}
                handleChangeSelect={handleChangeSelect}
                openModal={openModal}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <AdvertisementList itemsDataAdv={state.advertisementItems} />
            <Modal isOpen={isOpen} onClose={closeModal}>
                <FormCreateAdvertisment closeForm={closeModal} />
            </Modal>
        </AdsListPageContext.Provider>
    );
}
