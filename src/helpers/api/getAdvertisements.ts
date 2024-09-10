export async function getAdvertisements(page = 1, limit = 10) {
    const url = `http://localhost:3000/advertisements?_page=${page}&_per_page=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`,
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return null;
    }
}
