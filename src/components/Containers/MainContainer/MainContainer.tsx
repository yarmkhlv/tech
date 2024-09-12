import styles from './mainContainer.module.scss';

interface IPropsMainContainer {
    children: React.ReactNode;
}

export const MainContainer = ({ children }: IPropsMainContainer) => {
    return <div className={styles.container}>{children}</div>;
};
