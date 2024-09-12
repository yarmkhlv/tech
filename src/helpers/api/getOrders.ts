import { getTotalPagesFromLink } from './getTotalPagesFromHeader';

const API_URL = import.meta.env.VITE_API_URL;

export async function getOrders(
    page: number = 1,
    limit: number = 10,
    status: number,
    sortPriceDesc: boolean,
) {
    const urlSortPriceAsc = `${API_URL}/orders?_page=${page}&_limit=${limit}&status=${status}&_sort=total&_order=asc`;
    const urlSortPriceDesc = `${API_URL}/orders?_page=${page}&_limit=${limit}&status=${status}&_sort=total&_order=desc`;

    try {
        const response = await fetch(
            sortPriceDesc ? urlSortPriceDesc : urlSortPriceAsc,
        );
        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`,
            );
        }

        const data = await response.json();

        const linkHeader = response.headers.get('link');

        const totalPages = getTotalPagesFromLink(linkHeader);

        return {
            data,
            pages: totalPages || 1,
        };
    } catch (error) {
        console.error('Failed to fetch advertisements:', error);
        return null;
    }
}
