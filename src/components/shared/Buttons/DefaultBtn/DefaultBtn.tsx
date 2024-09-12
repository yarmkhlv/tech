import styles from './defaultBtn.module.scss';

interface IPropsDefaultBtn {
    text: string;
    onClick: () => void;
}

export function DefaultBtn({ onClick, text }: IPropsDefaultBtn) {
    return (
        <button type="button" className={styles.defaultBtn} onClick={onClick}>
            {text}
        </button>
    );
}
