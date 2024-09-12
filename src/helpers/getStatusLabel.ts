import { OrderStatus, statusLabels } from '../../types';

export const getStatusLabel = (
    status: (typeof OrderStatus)[keyof typeof OrderStatus],
) => {
    return statusLabels[status] || 'Неизвестный статус';
};
