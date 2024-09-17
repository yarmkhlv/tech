import { useState, useEffect, useContext } from 'react';

import { searchAdvertisements } from '../../../helpers/api/searchAdvertisements';
import { ClearBtn } from '../Buttons/ClearBtn/ClearBtn';

import { AdsListPageContext } from '../../../pages/AdsListPage';

import { MIN_LENGTH_TO_SEND_REQUEST } from '../../../helpers/variables/variables';

import { TAdvertisment } from '../../../../types';

import styles from './search.module.scss';

interface IPropsSearch {
    handleChangeState: (response: {
        data: TAdvertisment[];
        pages: number;
    }) => void;
    setIsDataFromSearch: (value: boolean) => void;
    isDataFromSearch: boolean;
}

export function Search({
    handleChangeState,
    setIsDataFromSearch,
    isDataFromSearch,
}: IPropsSearch) {
    const { countPerPage, currentPage } = useContext(AdsListPageContext);
    const [statusLoading, setStatusLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const onSearch = () => {
        if (searchValue.length < MIN_LENGTH_TO_SEND_REQUEST) {
            setErrorText('Недостаточно данных для поиска');
            return;
        }
        setStatusLoading(true);
        setErrorText('');

        const fetchAdvertisements = async () => {
            const response = await searchAdvertisements(
                searchValue,
                isDataFromSearch ? currentPage + 1 : 1,
                countPerPage.value,
            );
            if (response.data !== null && response.data.length > 0) {
                handleChangeState(response);
                setIsDataFromSearch(true);
            } else {
                setErrorText('По вашему запросу данных не найдено');
            }
            setStatusLoading(false);
        };

        fetchAdvertisements();
    };

    useEffect(() => {
        if (searchValue.length >= 1) return;
        setIsDataFromSearch(false);
        setErrorText('');
    }, [searchValue]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputContainer}>
                <input
                    onKeyDown={handleKeyDown}
                    type="text"
                    className={styles.searchInput}
                    value={searchValue}
                    onChange={(e) => {
                        setErrorText('');
                        setSearchValue(e.target.value);
                    }}
                    placeholder="Название объявления"
                />
                {errorText && (
                    <div className={styles.errorText}>{errorText}</div>
                )}
            </div>
            {statusLoading ? (
                <div className={styles.spinner} />
            ) : (
                <ClearBtn
                    className={styles.clearBtn}
                    onClick={() => {
                        setSearchValue('');
                    }}
                />
            )}
            <button className={styles.searchBtn} onClick={onSearch}>
                Поиск
            </button>
        </div>
    );
}
