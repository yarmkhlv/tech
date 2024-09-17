import styles from './adManagment.module.scss';
import { Paginate } from '../../shared/Paginate/Paginate';
import { Search } from '../../shared/Search';
import { CustomSelect } from '../../shared/Select/CustomSelect';
import { OPTIONS_FOR_SELECT_ELEMENTS_COUNT } from '../../shared/Select/helpers/variables';
import { Option } from '../../shared/Select/helpers/types';

interface IPropsAdManagment {
    handleChangeDebouncedValue: (value: string) => void;
    handleChangePage: (selectedItem: { selected: number }) => void;
    handleChangeSelect: (option: Option) => void;
    openModal: () => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
}

export function AdManagment({
    handleChangeDebouncedValue,
    handleChangePage,
    handleChangeSelect,
    openModal,
    searchValue,
    setSearchValue,
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
