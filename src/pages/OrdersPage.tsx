import { useEffect, useState } from 'react';

import { Paginate } from '../components/Paginate/Paginate';
import { CustomSelect } from '../components/Select/CustomSelect';
import { Loader } from '../components/Loader';
import Modal from '../components/Modal/Modal';

import { Option } from '../components/Select/types';
import { TOrder } from '../../types';
import { getOrders } from '../helpers/api/getOrders';

import { getStatusLabel } from '../helpers/getStatusLabel';
import { getFormattedDate } from '../helpers/getFormattedDate';

const OPTIONS_FOR_SELECT = [
    {
        value: 10,
        label: '10',
    },
    {
        value: 20,
        label: '20',
    },
    {
        value: 30,
        label: '30',
    },
];

export type OrderState = TOrder[] | null;

export function OrdersPage() {
    const [loading, setLoading] = useState(false);
    const [orderItems, setOrderItems] = useState<OrderState>([]);

    const [countPagesForPagination, setCountPagesForPagination] = useState<
        null | number
    >(null);
    const [adCountPerPage, setAdCountPerPage] = useState(OPTIONS_FOR_SELECT[0]);
    const [currentPage, setCurrentPage] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handlePageChange = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };
    const handleChangeSelect = (option: Option) => {
        setAdCountPerPage(option);
    };

    useEffect(() => {
        setLoading(true);
        const fetchOrders = async () => {
            const response = await getOrders(
                currentPage + 1,
                adCountPerPage.value,
            );
            if (response !== null) {
                setCountPagesForPagination(response.pages);
                if (currentPage > response.pages) {
                    setCurrentPage(response.pages - 1);
                }
                setOrderItems(response.data);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [currentPage, adCountPerPage.value]);

    if (loading || !countPagesForPagination || !orderItems) return <Loader />;

    return (
        <>
            <Paginate
                onPageChange={handlePageChange}
                pageCount={countPagesForPagination}
                currentPage={currentPage}
            />
            <CustomSelect
                options={OPTIONS_FOR_SELECT}
                value={adCountPerPage}
                onChange={handleChangeSelect}
            />
            {orderItems?.length > 0 && (
                <div
                    style={{
                        marginTop: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '20px',
                    }}
                >
                    {orderItems.map((order) => (
                        <div key={order.id}>
                            <p>Количество товаров : {order.items.length}</p>
                            <p>Стоимость заказа : {order.total}</p>
                            <p>
                                Дата создания заказа :{' '}
                                {getFormattedDate(order.createdAt)}
                            </p>
                            <p>Статус : {getStatusLabel(order.status)}</p>
                            <p>Номер заказа : {order.id}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
