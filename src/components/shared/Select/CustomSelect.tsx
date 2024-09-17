import { useState, useRef, useEffect, useContext } from 'react';

import { AdsListPageContext } from '../../../pages/AdsListPage';

import { Option, TOptionSelect } from './helpers/types';

import styles from './customSelect.module.scss';

interface CustomSelectProps {
    options: Option[] | TOptionSelect[];
    handleChangeSelect: (option: Option | TOptionSelect) => void;
}

export const CustomSelect = ({
    options,
    handleChangeSelect,
}: CustomSelectProps) => {
    const { countPerPage } = useContext(AdsListPageContext);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: Option) => {
        handleChangeSelect(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.customSelect} ref={containerRef}>
            <div className={styles.selectWrapper} onClick={toggleDropdown}>
                <span className={styles.selectValue}>{countPerPage.label}</span>
                <span className={styles.selectArrow}>▼</span>
            </div>
            {isOpen && (
                <div className={styles.selectOptions}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={styles.option}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
