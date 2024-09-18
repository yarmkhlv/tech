import { createContext } from 'react';

import { initStateAdvsReducer } from '../reducers/advertisements/reducer';

import { TAdvertisment } from '../../types';
import { AdvertismentState } from '../pages/AdsListPage';
import { Option } from '../components/shared/Select/types';

interface AdsListPageContextState {
    searchValue: string;
    searchDebouncedValue: string;
    advertisementItems: AdvertismentState;
    currentPage: number;
    countPagesForPagination: number;
    countPerPage: Option;
}

interface AdsListPageHandlers {
    setSearchValue: (value: string) => void;
    handleChangeDebouncedValue: (value: string) => void;
    handleChangePage: (event: { selected: number }) => void;
    handleChangeSelect: (option: Option) => void;
    handleChangeState: (response: {
        data: TAdvertisment[];
        pages: number;
    }) => void;
}

export const AdsListPageContext =
    createContext<AdsListPageContextState>(initStateAdvsReducer);
export const AdsListPageHandlersContext = createContext<AdsListPageHandlers>(
    null!,
);
