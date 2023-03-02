export function getCurrencyDataURL(
    symbol: string,
    todayFormat: string,
    yesterdayFormat: string
) {
    return `https://api.polygon.io/v2/aggs/ticker/X:${(
        symbol + 'USD'
    ).toUpperCase()}/range/1/day/${yesterdayFormat}/${todayFormat}?adjusted=true&sort=asc&limit=120&apiKey=${
        process.env.POLYGON_API_KEY
    }`;
}

export function getPreviousOHLC(symbol: string) {
    return `https://api.polygon.io/v2/aggs/ticker/${(
        symbol + 'USD'
    ).toUpperCase()}/prev`;
}
