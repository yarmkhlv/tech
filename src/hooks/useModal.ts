import { useState, useCallback, useEffect } from 'react';

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Закрытие модального окна по нажатию клавиши Escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, closeModal]);

    return {
        isOpen,
        openModal,
        closeModal,
    };
};

export default useModal;
