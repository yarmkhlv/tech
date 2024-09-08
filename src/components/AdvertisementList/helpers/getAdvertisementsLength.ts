export async function getAdvertisementsLength() {
    const url = `http://localhost:3000/advertisements`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`,
            );
        }
        const data = await response.json();
        return data.length;
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return null;
    }
}
