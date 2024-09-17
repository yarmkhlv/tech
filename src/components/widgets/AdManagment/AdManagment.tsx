import styles from './adManagment.module.scss';
import { Paginate } from '../../shared/Paginate/Paginate';
import { Search } from '../../shared/Search';
import { CustomSelect } from '../../shared/Select/CustomSelect';
import { OPTIONS_FOR_SELECT_ELEMENTS_COUNT } from '../../shared/Select/helpers/variables';
import { Option } from '../../shared/Select/helpers/types';
import { TAdvertisment } from '../../../../types';

interface IPropsAdManagment {
    handleChangePage: (selectedItem: { selected: number }) => void;
    handleChangeSelect: (option: Option) => void;
    handleChangeState: (response: {
        data: TAdvertisment[];
        pages: number;
    }) => void;
    isDataFromSearch: boolean;
    setIsDataFromSearch: (value: boolean) => void;
    openModal: () => void;
}

export function AdManagment({
    handleChangePage,
    handleChangeSelect,
    handleChangeState,
    isDataFromSearch,
    setIsDataFromSearch,
    openModal,
}: IPropsAdManagment) {
    return (
        <>
            <Paginate onPageChange={handleChangePage} />
            <div className={styles.wrapperForSelectAndSearch}>
                <CustomSelect
                    options={OPTIONS_FOR_SELECT_ELEMENTS_COUNT}
                    handleChangeSelect={handleChangeSelect}
                />
                <Search
                    handleChangeState={handleChangeState}
                    setIsDataFromSearch={setIsDataFromSearch}
                    isDataFromSearch={isDataFromSearch}
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
