import styles from './container.module.scss';

interface IContainerProps {
    children: React.ReactNode;
}

export const Container = ({ children }: IContainerProps) => {
    return <div className={styles.container}>{children}</div>;
};
