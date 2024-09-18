import { TAdvertisment } from '../../../types';

export type AdvertismentState = TAdvertisment[] | null;

export interface IInitialState {
    advertisementItems: AdvertismentState;
    searchValue: string;
    searchDebouncedValue: string;
    currentPage: number;
    countPagesForPagination: number;
    countPerPage: {
        value: number;
        label: string;
    };
}

export interface IChangedSelectedCountPayload {
    countPerPage: {
        value: number;
        label: string;
    };
}

export interface IChangedCurrentPagePayload {
    currentPage: number;
}

export interface IUpdStateBasedOnDataRequestPayload {
    advertisementItems: TAdvertisment[];
    countPagesForPagination: number;
}

export interface IChangedSearchDebouncedValue {
    searchDebouncedValue: string;
}

export type IAction =
    | {
          type: 'changedSelectedCount';
          payload: IChangedSelectedCountPayload;
      }
    | {
          type: 'changedCurrentPage';
          payload: IChangedCurrentPagePayload;
      }
    | {
          type: 'updStateBasedOnDataRequest';
          payload: IUpdStateBasedOnDataRequestPayload;
      }
    | {
          type: 'changedSearchDebouncedValue';
          payload: IChangedSearchDebouncedValue;
      };
