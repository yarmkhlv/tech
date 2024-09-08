import React, { useState, useRef, useEffect } from 'react';
import styles from './customSelect.module.scss';

import { Option } from './types';

interface CustomSelectProps {
    options: Option[];
    value: Option;
    onChange: (option: Option) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        onChange(option);
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
                <span className={styles.selectValue}>
                    {selectedOption.label}
                </span>
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
