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

export function getCryptoCompareUrl(symbol: string) {
    return `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${symbol.toUpperCase()}&tsym=USD&limit=24&toTs=-1&api_key=${
        process.env.NEXT_PUBLIC_CRYPTO_COMPARE_KEY
    }`;
}