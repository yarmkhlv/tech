export function getTotalPagesFromLink(
    linkHeader: string | null,
): number | null {
    if (!linkHeader) return null;

    const lastLinkRegex = /_page=(\d+)&_limit=\d+>; rel="last"/;
    const match = linkHeader.match(lastLinkRegex);

    if (match) {
        return parseInt(match[1], 10);
    } else {
        return null;
    }
}
