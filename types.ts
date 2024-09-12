export type TAdvertisment = {
    /* Уникальный идентификатор. */
    id: string;
    /* Название. */
    name: string;
    /* Описание. */
    description?: string;
    /* Цена. */
    price: number;
    /* Дата и время создания. */
    createdAt: string;
    /* Количество просмотров. */
    views: number;
    /* Количество лайков. */
    likes: number;
    /* Ссылка на изображение. */
    imageUrl?: string;
};

export const OrderStatus = {
    Created: 0,
    Paid: 1,
    Transport: 2,
    DeliveredToThePoint: 3,
    Received: 4,
    Archived: 5,
    Refund: 6,
} as const;

export type TOrderItem = TAdvertisment & { count: number };

export const statusLabels: { [key: number]: string } = {
    [OrderStatus.Created]: 'Создан',
    [OrderStatus.Paid]: 'Оплачен',
    [OrderStatus.Transport]: 'В пути',
    [OrderStatus.DeliveredToThePoint]: 'Доставлен в пункт',
    [OrderStatus.Received]: 'Получен',
    [OrderStatus.Archived]: 'Архивирован',
    [OrderStatus.Refund]: 'Возврат',
};

export type TOrder = {
    /* Уникальный идентификатор. */
    id: string;
    /* Статус. */
    status: (typeof OrderStatus)[keyof typeof OrderStatus];
    /* Дата и время создания. */
    createdAt: string;
    /* Дата и время завершения. */
    finishedAt?: string;
    /* Товары в заказе. */
    items: Array<TOrderItem>;
    /* Способ доставки(Почта, СДЭК...) */
    deliveryWay: string;
    /* Сумма заказа */
    total: number;
};

type TImage = {
    /* Уникальный идентификатор. */
    id: number;
    /* Ссылка. */
    url: string;
    /* Название. */
    name: string;
};
