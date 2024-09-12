import styles from './returnBtn.module.scss';

interface IPropsCloseEditBtn {
    onClick: () => void;
    className?: string;
}

export function ReturnBtn({ onClick, className }: IPropsCloseEditBtn) {
    return (
        <button
            type="button"
            className={className ?? styles.returnBtn}
            onClick={onClick}
        >
            <svg
                role="img"
                aria-hidden="true"
                data-icon="arrow"
                viewBox="0 0 24 24"
                name="arrow"
            >
                <path d="m11 7.41-5.3 5.3a1 1 0 0 1-1.4-1.42l7-7a1 1 0 0 1 1.4 0l7 7a1 1 0 0 1-1.4 1.42L13 7.4V19a1 1 0 1 1-2 0V7.41Z"></path>
            </svg>
        </button>
    );
}
