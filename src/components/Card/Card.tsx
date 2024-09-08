import styles from './card.module.scss';

export function Card() {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src="" alt="Product Image" />
            </div>
            <div className={styles.infoContainer}>
                <h3 className={styles.title}>Ремень Pinko</h3>
                <p className={styles.price}>10 600₽</p>
                <div className={styles.stats}>
                    <div className={styles.views}>
                        <span>80</span>
                    </div>
                    <div className={styles.likes}>
                        <span>7</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
