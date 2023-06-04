import HotCryptoPreview from '@/components/HotCryptoPreview';
import PopularCryptoPreview from '@/components/PopularCryptoPreview';
import useWebSockets from '@/hooks/useWebSockets';

const currenciesList = [
    'BTCUSD',
    'ETHUSD',
    'USDTUSD',
    'YFIUSD',
    'AVAXUSD',
    'MATICUSD',
    'LTCUSD',
    'DOGEUSD',
    'SOLUSD',
    'SUSHIUSD',
    'SHIBUSD',
    'LINKUSD',
    'TRXUSD',
    'UNIUSD',
    'BCHUSD',
    'NEARUSD',
    'ALGOUSD',
    'GRTUSD',
    'AAVEUSD',
    'BATUSD',
    'MKRUSD',
];



export default function Home({currencies} : any) {

    return (
        <section className="main-content-sec flex column relative">
            <h1 className="main-title">Stock Market</h1>
            <p className="subtitle">Trending market group</p>

            <section className="hot-crypto-sec">
                <h1>Hot 🔥</h1>
                <section className="hot-crypto-list flex wrap">
                    {currenciesList.slice(0, 5).map((currency, idx) => (
                        <HotCryptoPreview
                            key={currency}
                            crypto={
                                currencies[currency as keyof typeof currencies]!
                            }
                        />
                    ))}
                </section>
            </section>

            <section className="most-popular-sec">
                <h1 className="main-title">Popular ⚡</h1>
                <section className="most-popular-list flex">
                    {currenciesList.slice(5, 12).map((currency) => (
                        <PopularCryptoPreview
                            key={currency}
                            crypto={
                                currencies[currency as keyof typeof currencies]!
                            }
                        />
                    ))}
                </section>
            </section>

            <section className="most-popular-sec">
                <h1 className="main-title">Trending 📈</h1>
                <section className="most-popular-list flex">
                    {currenciesList.slice(12).map((currency) => (
                        <PopularCryptoPreview
                            key={currency}
                            crypto={
                                currencies[currency as keyof typeof currencies]!
                            }
                        />
                    ))}
                </section>
            </section>
        </section>
    );
}

// export const getServerSideProps = async () => {
//     const todayFormat = formmatedDate(new Date());
//     const yesterdayFormat = formmatedDate(new Date(Date.now() - 864e5));

//     try {
//         const res = await Promise.all(
//             currenciesList
//                 .slice(0, 5)
//                 .map((c) =>
//                     axios
//                         .get(
//                             getCurrencyDataURL(
//                                 c.slice(0, -3),
//                                 todayFormat,
//                                 yesterdayFormat
//                             )
//                         )
//                         .then((res) => res.data)
//                 )
//         );

//         return {
//             props: {
//                 ohlc: res.map((res) => res.results[0]),
//             },
//         };
//     } catch (error) {
//         console.log('failed to fetch crypto details', error);
//         return {
//             props: {
//                 error,
//             },
//         };
//     }
// };
