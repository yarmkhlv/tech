import { useState, useEffect } from 'react';

import { AdvertismentState } from '../../pages/AdsListPage';

import { searchAdvertisements } from '../../helpers/api/searchAdvertisements';
import { ClearBtn } from '../ClearBtn/ClearBtn';

import { MIN_LENGTH_TO_SEND_REQUEST } from '../../helpers/variables/variables';
import styles from './search.module.scss';

interface IPropsSearch {
    isDataFromSearch: boolean;
    setIsDataFromSearch: (value: boolean) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
    setAdvertisementItems: React.Dispatch<
        React.SetStateAction<AdvertismentState>
    >;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    setCountPagesForPagination: (pages: number) => void;
    adCountPerPage: number;
}

export function Search({
    isDataFromSearch,
    setIsDataFromSearch,
    searchValue,
    setSearchValue,
    setAdvertisementItems,
    currentPage,
    setCurrentPage,
    setCountPagesForPagination,
    adCountPerPage,
}: IPropsSearch) {
    const [statusLoading, setStatusLoading] = useState(false);
    const [errorText, setErrorText] = useState('');

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
                adCountPerPage,
            );
            if (response.data !== null && response.data.length > 0) {
                setCountPagesForPagination(response.pages);
                if (currentPage > response.pages) {
                    setCurrentPage(response.pages - 1);
                }
                setAdvertisementItems(response.data);
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
