import { getTotalPagesFromLink } from './getTotalPagesFromHeader';

export async function getOrders(page: number = 1, limit: number = 10) {
    const url = `http://localhost:3000/orders?_page=${page}&_limit=${limit}`;

    try {
        const response = await fetch(url);
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
