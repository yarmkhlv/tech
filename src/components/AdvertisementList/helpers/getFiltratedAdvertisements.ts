export async function getFiltratedAdvertisements(start = 0, limit = 10) {
    const url = `http://localhost:3000/advertisements?_start=${start}&_limit=${limit}`;

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
