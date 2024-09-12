import styles from './contentContainer.module.scss';

interface IPropsMainContainer {
    children: React.ReactNode;
}

export const ContentContainer = ({ children }: IPropsMainContainer) => {
    return <div className={styles.container}>{children}</div>;
};
