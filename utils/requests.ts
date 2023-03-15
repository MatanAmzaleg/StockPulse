export function getCurrencyDataURL(
    symbol: string,
    today: string,
    yesterday: string
) {
    return `https://api.polygon.io/v2/aggs/ticker/X:${(
        symbol + 'USD'
    ).toUpperCase()}/range/1/day/${yesterday}/${today}?adjusted=true&sort=asc&limit=120&apiKey=${
        process.env.POLYGON_API_KEY
    }`;
}
