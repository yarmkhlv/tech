import styles from './adManagment.module.scss';
import { Paginate } from '../../shared/Paginate/Paginate';
import { Search } from '../../shared/Search';
import { CustomSelect } from '../../shared/Select/CustomSelect';
import { OPTIONS_FOR_SELECT_ELEMENTS_COUNT } from '../../shared/Select/helpers/variables';
import { AdvertismentState } from '../../../pages/AdsListPage';
import { Option, TOptionSelect } from '../../shared/Select/helpers/types';

interface IPropsAdManagment {
    handlePageChange: (selectedItem: { selected: number }) => void;
    handleChangeSelect: (option: Option) => void;
    adCountPerPage: {
        value: number;
        label: string;
    };
    countPagesForPagination: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    setCountPagesForPagination: (pages: number) => void;
    onChange: (option: Option | TOptionSelect) => void;
    isDataFromSearch: boolean;
    setIsDataFromSearch: (value: boolean) => void;
    setAdvertisementItems: React.Dispatch<
        React.SetStateAction<AdvertismentState>
    >;
    openModal: () => void;
}

export function AdManagment({
    handlePageChange,
    handleChangeSelect,
    adCountPerPage,
    countPagesForPagination,
    currentPage,
    setCurrentPage,
    setCountPagesForPagination,
    isDataFromSearch,
    setIsDataFromSearch,
    setAdvertisementItems,
    openModal,
}: IPropsAdManagment) {
    return (
        <>
            <Paginate
                onPageChange={handlePageChange}
                pageCount={countPagesForPagination}
                currentPage={currentPage}
            />
            <div className={styles.wrapperForSelectAndSearch}>
                <CustomSelect
                    options={OPTIONS_FOR_SELECT_ELEMENTS_COUNT}
                    value={adCountPerPage}
                    onChange={handleChangeSelect}
                />
                <Search
                    isDataFromSearch={isDataFromSearch}
                    setIsDataFromSearch={setIsDataFromSearch}
                    setAdvertisementItems={setAdvertisementItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setCountPagesForPagination={setCountPagesForPagination}
                    adCountPerPage={adCountPerPage.value}
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
