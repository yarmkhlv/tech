import { TAdvertisment } from '../../../types';
import { getTotalPagesFromLink } from './getTotalPagesFromHeader';

const API_URL = import.meta.env.VITE_API_URL;

export async function searchAdvertisements(
    name: string,
    pageCount: number = 1,
    limit: number = 10,
) {
    try {
        const response = await fetch(
            `${API_URL}/advertisements?name_like=${name}&_page=${pageCount}&_limit=${limit}`,
        );
        const data: TAdvertisment[] = await response.json();

        const linkHeader = response.headers.get('link');

        const totalPages = getTotalPagesFromLink(linkHeader);

        return {
            data,
            pages: totalPages || 1,
        };
    } catch (error) {
        console.error('Failed to fetch search advertisements:', error);
        return { data: null, pages: 1 };
    }
}
