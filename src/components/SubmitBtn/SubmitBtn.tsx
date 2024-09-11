import styles from './submitBtn.module.scss';

interface IPropsSubmitBtn {
    text: string;
}

export function SubmitBtn({ text }: IPropsSubmitBtn) {
    return (
        <button className={styles.submitButton} type="submit">
            {text}
        </button>
    );
}
