import { Advertisment } from './types';

import styles from './card.module.scss';
import { formatCurrency } from './helpers/formatCurrency';

export function Card({ name, price, views, likes, imageUrl }: Advertisment) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.imgContainer}>
                <img
                    className={styles.img}
                    src={imageUrl}
                    alt="Product Image"
                />
            </div>
            <div className={styles.infoContainer}>
                <h3 className={styles.title}>{name}</h3>
                <p className={styles.price}>{formatCurrency(price)}</p>
                <div className={styles.stats}>
                    <div className={styles.views}>
                        <span>{views}</span>
                    </div>
                    <div className={styles.likes}>
                        <span>{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
