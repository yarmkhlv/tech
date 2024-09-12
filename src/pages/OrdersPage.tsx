import { useEffect, useState } from 'react';

import { Paginate } from '../components/shared/Paginate/Paginate';
import { CustomSelect } from '../components/shared/Select/CustomSelect';
import { Loader } from '../components/shared/Loader';
import Modal from '../components/shared/Modal/Modal';

import { Option } from '../components/shared/Select/helpers/types';
import { TOrder } from '../../types';
import { getOrders } from '../helpers/api/getOrders';

import { getStatusLabel } from '../helpers/getStatusLabel';
import { getFormattedDate } from '../helpers/getFormattedDate';
import {
    OPTIONS_FOR_SELECT_ELEMENTS_COUNT,
    OPTIONS_FOR_SELECT_STATUS,
} from '../components/shared/Select/helpers/variables';
import { Switcher } from '../components/shared/Switcher';
import useModal from '../hooks/useModal';
import { ContentContainer } from '../components/Containers/ContentContainer';
import { DefaultBtn } from '../components/shared/Buttons/DefaultBtn';
import { OrderInfo } from '../components/widgets/OrderInfo/OrderInfo';

export type OrderState = TOrder[] | null;

export function OrdersPage() {
    const { isOpen, openModal, closeModal } = useModal();
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

    const [selectedOrderId, setSelectedOrderId] = useState<string>('');

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
        <ContentContainer>
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
                text="Отсортировать стоимость по убыванию"
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
                        <div
                            key={order.id}
                            style={{
                                maxWidth: '350px',
                                padding: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: '10px',
                                border: '1px solid black',
                                borderRadius: '4px',
                            }}
                        >
                            <p>Номер заказа : {order.id}</p>
                            <p>Статус : {getStatusLabel(order.status)}</p>
                            <p>Количество товаров : {order.items.length}</p>
                            <p>Стоимость заказа : {order.total}</p>
                            <p>
                                Дата создания заказа :
                                {getFormattedDate(order.createdAt)}
                            </p>

                            <DefaultBtn
                                text="Показать товары"
                                onClick={() => {
                                    setSelectedOrderId(order.id);
                                    openModal();
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}
            <Modal isOpen={isOpen} onClose={closeModal}>
                <OrderInfo id={selectedOrderId} closeModal={closeModal} />
            </Modal>
        </ContentContainer>
    );
}
