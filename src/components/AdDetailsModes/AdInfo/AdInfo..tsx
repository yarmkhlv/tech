import styles from './AdInfo.module.scss';

import { formatCurrency } from '../../../helpers/formatCurrency';

import { TAdvertisment } from '../../../../types';

interface IPropsAdInfo {
    advertisement: TAdvertisment;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AdInfo({ advertisement, setIsEditing }: IPropsAdInfo) {
    const { name, description, price, views, likes, imageUrl } = advertisement;
    return (
        <div className={styles.adInfoBlock}>
            <div className={styles.imageContainer}>
                <img
                    src={imageUrl}
                    alt={`Product ${name}`}
                    className={styles.img}
                />
            </div>
            <div className={styles.detailsContainer}>
                <h2 className={styles.productName}>{name}</h2>
                {description && (
                    <p className={styles.productDescription}>{description}</p>
                )}
                <p className={styles.productPrice}>{formatCurrency(price)}</p>
                <div className={styles.interactions}>
                    <p className={styles.likes}>👍{likes}</p>
                    <p className={styles.views}>👁️{views}</p>
                </div>
                <button
                    type="button"
                    className={styles.editButton}
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>
            </div>
        </div>
    );
}
