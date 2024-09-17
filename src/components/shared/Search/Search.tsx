import { useEffect } from 'react';

import { ClearBtn } from '../Buttons/ClearBtn/ClearBtn';

import styles from './search.module.scss';

interface IPropsSearch {
    searchValue: string;
    setSearchValue: (value: string) => void;
    handleChangeDebouncedValue: (value: string) => void;
}

export function Search({
    searchValue,
    setSearchValue,
    handleChangeDebouncedValue,
}: IPropsSearch) {
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchValue.length >= 3) {
                handleChangeDebouncedValue(searchValue);
            } else {
                handleChangeDebouncedValue('');
            }
        }, 2000);

        return () => {
            clearTimeout(handler);
        };
    }),
        [searchValue];

    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    className={styles.searchInput}
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.currentTarget.value);
                    }}
                    placeholder="Название объявления"
                />
            </div>

            <ClearBtn
                className={styles.clearBtn}
                onClick={() => {
                    setSearchValue('');
                    handleChangeDebouncedValue('');
                }}
            />
        </div>
    );
}
