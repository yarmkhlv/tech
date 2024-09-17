import { TAdvertisment } from '../../../types';
import { getTotalPagesFromLink } from './getTotalPagesFromHeader';

const API_URL = import.meta.env.VITE_API_URL;

export async function getAdvertisements(
    page: number = 1,
    limit: number = 10,
    searchValue: string = '',
) {
    const url = `${API_URL}/advertisements?_page=${page}&_limit=${limit}`;
    const urlWithSearch = `${API_URL}/advertisements?name_like=${searchValue}&_page=${page}&_limit=${limit}`;
    const choosedUrl = urlWithSearch.length > 2 ? urlWithSearch : url;
    try {
        const response = await fetch(choosedUrl);
        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`,
            );
        }

        const data: TAdvertisment[] = await response.json();
        const linkHeader = response.headers.get('link');
        const totalPages = getTotalPagesFromLink(linkHeader) || 1;
        return {
            data,
            pages: totalPages,
        };
    } catch (error) {
        console.error('Failed to fetch advertisements:', error);
        return null;
    }
}
