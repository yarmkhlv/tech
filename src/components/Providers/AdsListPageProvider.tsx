import { useReducer, ReactNode, useState } from 'react';

import {
    advertisementsReducer,
    initStateAdvsReducer,
} from '../../reducers/advertisements/reducer';

import {
    AdsListPageContext,
    AdsListPageHandlersContext,
} from '../../context/AdsListPageContext';

import { TAdvertisment } from '../../../types';
import { Option } from '../shared/Select/helpers/types';

interface IPropsAdsListPageProvider {
    children: ReactNode;
}

export function AdsListPageProvider({ children }: IPropsAdsListPageProvider) {
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

    const handlers = {
        setSearchValue,
        handleChangeDebouncedValue,
        handleChangePage,
        handleChangeSelect,
        handleChangeState,
    };

    return (
        <AdsListPageContext.Provider value={{ ...state, searchValue }}>
            <AdsListPageHandlersContext.Provider value={handlers}>
                {children}
            </AdsListPageHandlersContext.Provider>
        </AdsListPageContext.Provider>
    );
}
