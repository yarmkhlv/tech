export function formatCurrency(value: number): string {
    return (
        value
            .toLocaleString('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 0,
            })
            .replace('₽', '')
            .trim() + ' ₽'
    );
}
