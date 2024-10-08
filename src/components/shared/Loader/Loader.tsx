import styles from './loader.module.scss';

export const Loader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
        </div>
    );
};
