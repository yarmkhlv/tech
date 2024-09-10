export async function getAdvertisements(page = 1, limit = 10) {
    const url = `http://localhost:3000/advertisements?_page=${page}&_limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`,
            );
        }

        const data = await response.json();

        const linkHeader = response.headers.get('link');

        const getTotalPagesFromLink = (linkHeader: string | null) => {
            if (!linkHeader) return null;

            const lastLinkRegex = /_page=(\d+)&_limit=\d+>; rel="last"/;
            const match = linkHeader.match(lastLinkRegex);

            if (match) {
                return parseInt(match[1], 10);
            } else {
                return null;
            }
        };

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
