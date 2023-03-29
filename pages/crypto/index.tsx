import HotCryptoPreview from '@/components/HotCryptoPreview';
import PopularCryptoPreview from '@/components/PopularCryptoPreview';
import useAuth from '@/hooks/useAuth';
import useWebSockets from '@/hooks/useWebSockets';
import { formmatedDate } from '@/utils/format';
import { getCurrencyDataURL } from '@/utils/requests';
import axios from 'axios';
import { useState, useEffect } from 'react';

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

const notWorking = [
    'TONUSD',
    'OKBUSD',
    'FILUSD',
    'APTUSD',
    'LDOUSD',
    'FRAXUSD',
    'ETCUSD',
    'LEOUSD',
    'DAIUSD',
    'DOTUSD',
    'DASHUSD',
    'ATOMUSD',
    'ADAUSD',
    'XRPUSD',
    'BNBUSD',
    'USDCUSD',
    'BUSDUSD',
    'XMRUSD',
    'XLMUSD',
    'APTUSD',
    'TUSDUSD',
    'LDOUSD',
    'HBARUSD',
    'CROUSD',
    'VETUSD',
    'ARBUSD',
    'APEUSD',
    'QNTUSD',
    'ICPUSD',
    'STXUSD',
    'EOSUSD',
    'FTMUSD',
    'MANAUSD',
    'BITUSD',
    'EFLDUSD',
    'XTZUSD',
    'STRAXUSD',
    'GTCUSD',
    'LPTUSD',
    'LRCUSD',
    'COSUSD',
    'AIOZUSD',
    'MDTUSD',
    'IDEXUSD',
    'HEXUSD',
    'OGNUSD',
    'DOGAIUSD',
    'GLBUSD',
    'BMDAUSD',
    'PIUSD',
    'HODLUSD',
    'ODOGEUSD',
    'NFAIUSD',
    'RBNUSD',
    'CRPTUSD',
    'PENDLEUSD',
    'POAUSD',
    'MADUSD',
    'SRVUSD',
    'ATMUSD',
    'DIAUSD',
    'RLCUSD',
    'FLOWUSD',
    'ZECUSD',
    'RUNEUSD',
    'XECUSD',
    'KLAYUSD',
    'HTUSD',
    'ZILUSD',
    'ENJUSD',
];

export default function Home() {
    const { currencies } = useWebSockets(currenciesList);

    // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (!currencies) return <img className="loader" src="/loader.gif" alt="" />;

    return (
        <section className="main-content-sec flex column relative">
            {/* <button className='hamburger-btn' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>hamburger</button> */}
            <h1 className="main-title">Stock Market</h1>
            <p className="subtitle">Trending market group</p>
            {/* <button className="view-all">View All</button> */}
            {/* <section className="hot-crypto-sec">
                <h1>Hot 🔥</h1>
                <section className="hot-crypto-list flex">
                    {currenciesList.map((currency, idx) => (
                        <HotCryptoPreview
                            currencyKey={currenciesList[idx]}
                            key={currency}
                            crypto={
                                currencies[currency as keyof typeof currencies]!
                            }
                        />
                    ))}
                </section>
            </section> */}
            <section className="hot-crypto-sec">
                <h1>Hot 🔥</h1>
                <section className="hot-crypto-list flex wrap">
                    {currenciesList.slice(0, 5).map((currency, idx) => (
                        <HotCryptoPreview
                            currencyKey={currenciesList[idx]}
                            key={currency}
                            crypto={
                                currencies[currency as keyof typeof currencies]!
                            }
                            // ohlc={{ o: ohlc[idx].o, c: ohlc[idx].c }}
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
