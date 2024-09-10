import { useState, useEffect } from 'react';

import styles from './search.module.scss';

export function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    console.log(searchTerm, 'serachTerm');
    console.log(debouncedTerm, 'debouncedTerm');
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm.length >= 3) {
                setDebouncedTerm(searchTerm);
            }
        }, 2000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedTerm) {
            console.log(debouncedTerm, 'atFetch');
            fetch(
                `http://localhost:3000/advertisements?name_like=${debouncedTerm}`,
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    // Обработка полученных данных
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [debouncedTerm]);

    return (
        <div>
            <input
                type="text"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск объявления"
            />
        </div>
    );
}
