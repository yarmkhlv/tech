import { useContext } from 'react';

import { Paginate } from '../../shared/Paginate/Paginate';
import { Search } from '../../shared/Search';
import { CustomSelect } from '../../shared/Select/CustomSelect';
import { OPTIONS_FOR_SELECT_ELEMENTS_COUNT } from '../../shared/Select/helpers/variables';

import {
    AdsListPageContext,
    AdsListPageHandlersContext,
} from '../../../context/AdsListPageContext';

import styles from './adManagment.module.scss';

interface IPropsAdManagment {
    openModal: () => void;
}

export function AdManagment({ openModal }: IPropsAdManagment) {
    const { searchValue, countPerPage } = useContext(AdsListPageContext);

    const {
        setSearchValue,
        handleChangePage,
        handleChangeSelect,
        handleChangeDebouncedValue,
    } = useContext(AdsListPageHandlersContext);

    return (
        <>
            <Paginate onPageChange={handleChangePage} />
            <div className={styles.wrapperForSelectAndSearch}>
                <CustomSelect
                    countPerPage={countPerPage}
                    options={OPTIONS_FOR_SELECT_ELEMENTS_COUNT}
                    handleChangeSelect={handleChangeSelect}
                />
                <Search
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleChangeDebouncedValue={handleChangeDebouncedValue}
                />
            </div>
            <div className={styles.containerCreateBtn}>
                <button
                    className={styles.createBtn}
                    onClick={openModal}
                    type="button"
                >
                    Создать объявление
                </button>
            </div>
        </>
    );
}
