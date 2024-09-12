import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { TOrder, TOrderItem } from '../../../../types';

import styles from './orderInfo.module.scss';
import { ReturnBtn } from '../../shared/Buttons/ReturnBtn';

const API_URL = import.meta.env.VITE_API_URL;

interface IPropsOrderInfo {
    id: string;
    closeModal: () => void;
}

const ERROR_TEXT = 'Данные по заказу не найдены';

export function OrderInfo({ id, closeModal }: IPropsOrderInfo) {
    const navigate = useNavigate();

    const [orderData, setOrderData] = useState<TOrderItem[] | null>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchOrderItems = async () => {
            if (id) {
                try {
                    const response = await fetch(`${API_URL}/orders/${id}`);
                    if (response.ok) {
                        const data: TOrder = await response.json();
                        if (!data.items || data.items.length < 1) {
                            setHasError(true);
                        }
                        setOrderData(data.items);
                    }
                } catch (error) {
                    console.error('Ошибка в получении объявления', error);
                    setHasError(true);
                }
            }
        };

        fetchOrderItems();
    }, [id]);

    const handleClick = (id: string) => {
        navigate(`/advertisement/${id}`);
    };

    if (hasError || !orderData || orderData.length < 1)
        return <p>{ERROR_TEXT}</p>;

    return (
        <div className={styles.orderInfoBlock}>
            <h2 className={styles.orderInfoBlockTitle}>Список товаров</h2>
            <ReturnBtn onClick={closeModal} />
            {orderData.map((item) => (
                <div
                    className={styles.advertisementItem}
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                >
                    <div className={styles.detailsContainer}>
                        <h3 className={styles.productName}>{item.name}</h3>
                        <p>Количество в заказе: {item.count}</p>
                    </div>
                    <div className={styles.imageContainer}>
                        <img
                            src={item.imageUrl}
                            alt={`Product ${item.name}`}
                            className={styles.img}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
