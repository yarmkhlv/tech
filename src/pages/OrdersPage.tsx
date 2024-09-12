import { useEffect, useState } from 'react';

import { Paginate } from '../components/Paginate/Paginate';
import { CustomSelect } from '../components/Select/CustomSelect';
import { Loader } from '../components/Loader';
import Modal from '../components/Modal/Modal';

import { Option, TOptionSelect } from '../components/Select/helpers/types';
import { TOrder } from '../../types';
import { getOrders } from '../helpers/api/getOrders';

import { getStatusLabel } from '../helpers/getStatusLabel';
import { getFormattedDate } from '../helpers/getFormattedDate';
import {
    OPTIONS_FOR_SELECT_ELEMENTS_COUNT,
    OPTIONS_FOR_SELECT_STATUS,
} from '../components/Select/helpers/variables';
import { Switcher } from '../components/Switcher';

export type OrderState = TOrder[] | null;

export function OrdersPage() {
    const [loading, setLoading] = useState(false);
    const [orderItems, setOrderItems] = useState<OrderState>([]);

    const [countPagesForPagination, setCountPagesForPagination] = useState<
        null | number
    >(null);
    const [adCountPerPage, setAdCountPerPage] = useState(
        OPTIONS_FOR_SELECT_ELEMENTS_COUNT[0],
    );
    const [currentPage, setCurrentPage] = useState(0);

    const [selectedStatus, setSelectedStatus] = useState(
        OPTIONS_FOR_SELECT_STATUS[0],
    );
    const [sortPriceDesc, setSortPriceDesc] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChangeSwitcher = () => {
        setSortPriceDesc(!sortPriceDesc);
    };

    const handlePageChange = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };
    const handleChangeSelectCount = (option: Option) => {
        setAdCountPerPage(option);
    };
    const handleChangeSelectStatus = (option: Option) => {
        setSelectedStatus(option);
    };

    useEffect(() => {
        setLoading(true);
        const fetchOrders = async () => {
            const response = await getOrders(
                currentPage + 1,
                adCountPerPage.value,
                selectedStatus.value,
                sortPriceDesc,
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
    }, [currentPage, adCountPerPage.value, selectedStatus, sortPriceDesc]);

    if (loading || !countPagesForPagination || !orderItems) return <Loader />;

    return (
        <>
            <Paginate
                onPageChange={handlePageChange}
                pageCount={countPagesForPagination}
                currentPage={currentPage}
            />
            <CustomSelect
                options={OPTIONS_FOR_SELECT_ELEMENTS_COUNT}
                value={adCountPerPage}
                onChange={handleChangeSelectCount}
            />
            <CustomSelect
                options={OPTIONS_FOR_SELECT_STATUS}
                value={selectedStatus}
                onChange={handleChangeSelectStatus}
            />
            <Switcher
                switcherActive={sortPriceDesc}
                handleChangeSwitcher={handleChangeSwitcher}
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
