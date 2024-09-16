import { OPTIONS_FOR_SELECT_ELEMENTS_COUNT } from '../../components/shared/Select/helpers/variables';
import { IAction, IInitialState } from './types';

export const initStateAdvsReducer: IInitialState = {
    advertisementItems: [],
    currentPage: 0,
    countPagesForPagination: 0,
    countPerPage: OPTIONS_FOR_SELECT_ELEMENTS_COUNT[0],
};

export function advertisementsReducer(state: IInitialState, action: IAction) {
    const { type, payload } = action;
    switch (type) {
        case 'changedSelectedCount': {
            return { ...state, countPerPage: payload.countPerPage };
        }
        case 'changedCurrentPage': {
            return { ...state, currentPage: payload.currentPage };
        }
        case 'updStateBasedOnDataRequest': {
            const newCurrentPage =
                state.currentPage > payload.countPagesForPagination
                    ? payload.countPagesForPagination
                    : state.currentPage;
            return {
                ...state,
                currentPage: newCurrentPage,
                advertisementItems: [...payload.advertisementItems],
                countPagesForPagination: payload.countPagesForPagination,
            };
        }
        default: {
            throw Error('Unknown action: ' + type);
        }
    }
}
