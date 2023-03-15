import axios from 'axios';
import {
    dateTimeFormat,
    formattedPrice,
    formmatedDate,
    calculateChange,
} from '@/utils/format';
import { useEffect, useRef, useState } from 'react';
import { getCurrencyDataURL } from '@/utils/requests';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useWebSockets from '@/hooks/useWebSockets';
import { createChart, CrosshairMode } from 'lightweight-charts';

export default function CryptoDetails({
    data,
    yesterdayData,
    chartData,
    error,
}: any) {
    const router = useRouter();
    const graphRef = useRef(null);
    const { symbol } = router.query;
    const [day, setDay] = useState('today');

    const { currencies } = symbol
        ? useWebSockets([(symbol + 'USD').toUpperCase()])
        : { currencies: {} };

    const selectDay = (day: string) => {
        setDay(day);
        const newOc = {
            open: day === 'today' ? data.o : yesterdayData.o,
            close: day === 'today' ? data.c : yesterdayData.c,
            ts: day === 'today' ? data.t : yesterdayData.t,
        };
        setOc(newOc);
    };

    useEffect(() => {
        if (graphRef.current) {
            const chart = createChart(graphRef.current!, {
                crosshair: {
                    mode: CrosshairMode.Normal,
                },
            });
            const lineSeries = chart.addCandlestickSeries();
            lineSeries.setData(chartData);
        }
    }, [graphRef.current]);

    if (!currencies || !data || !yesterdayData) {
        console.log('here now', currencies, data, yesterdayData);
        return <img className="loader" src="/loader.gif" alt="" />;
    }

    const [oc, setOc] = useState({ open: data.o, close: data.c, ts: data.t });
    const alpacaCrypto =
        currencies[(symbol + 'USD').toUpperCase() as keyof typeof currencies];
    console.log(symbol, alpacaCrypto, data);

    if (!alpacaCrypto) {
        console.log('here');
        return <img className="loader" src="/loader.gif" alt="" />;
    }

    return (
        <section className="crypto-details">
            <div className="logo">
                <Image
                    src={`/${symbol}.svg`}
                    alt="apple"
                    className="icon-img"
                    width={50}
                    height={50}
                />
                <h2>{alpacaCrypto?.S.toUpperCase()}</h2>
            </div>
            <div className="main-grid">
                <div className="card small-detaills">
                    <p className="symbol">{alpacaCrypto?.S}</p>
                    <h3 className="price">
                        {formattedPrice(alpacaCrypto!.bp)}
                    </h3>
                    <div className="">
                        <div className="percentage-container">
                            <Image
                                src={`/rising.svg`}
                                alt="rising"
                                className="arrow-img rising"
                                width={20}
                                height={20}
                            ></Image>
                            <p
                                className={
                                    Number(
                                        calculateChange(
                                            data.o,
                                            alpacaCrypto?.ap
                                        )
                                    ) < 0
                                        ? 'descending'
                                        : 'scending'
                                }
                            >
                                {calculateChange(data.o, alpacaCrypto?.ap)
                                    .toString()
                                    .padStart(2)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card open-close">
                    <div className="day-actions">
                        <button
                            onClick={() => selectDay('today')}
                            className={day === 'today' ? 'active' : ''}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => selectDay('yesterday')}
                            className={day === 'yesterday' ? 'active' : ''}
                        >
                            Yesterday
                        </button>
                    </div>
                    <table>
                        <tr>
                            <th>Pre-Market</th>
                            <th>Close</th>
                            <th>Open</th>
                        </tr>
                        <tr>
                            <td className="table-price">$130.00</td>
                            <td className="table-price">
                                {formattedPrice(oc.close)}
                            </td>
                            <td className="table-price">
                                {formattedPrice(oc.open)}
                            </td>
                        </tr>
                        <tr>
                            <td className="percentage-container">
                                <Image
                                    src={`/descending.svg`}
                                    alt="descending"
                                    className="arrow-img descending"
                                    width={20}
                                    height={20}
                                ></Image>
                                <p className="percentage descending ">-0.98</p>
                            </td>
                            <td className="table-date">
                                {dateTimeFormat(new Date(oc.ts))}
                            </td>
                            <td className="table-date">June 16, 4:00pm</td>
                        </tr>
                    </table>
                </div>
                <div className="card graph" ref={graphRef}></div>
                <div className="card details">
                    <h4>Details</h4>
                    <div className="details-grid">
                        {/* <span>Days Range</span>
                        <p>128.46 - 130px</p> */}
                        <span>Weighted Average</span>
                        <p>{formattedPrice(data.vw)}</p>
                        <span>Volume</span>
                        <p>{data.v.toFixed(2)}</p>
                        <span>High</span>
                        <p>{formattedPrice(data.h)}</p>
                        <span>Low</span>
                        <p>{formattedPrice(data.l)}</p>
                        <span>Total Transactions</span>
                        <p>{data.n.toFixed(2)}</p>
                    </div>
                </div>
                <div className="card actions">
                    <button className="buy">Buy</button>
                    <button className="sell">Sell</button>
                </div>
            </div>
        </section>
    );
}

export const getServerSideProps = async ({ params }: { params: any }) => {
    try {
        const todayFormat = formmatedDate(new Date());
        const yesterdayFormat = formmatedDate(new Date(Date.now() - 864e5));
        const dayBeforeLastFormat = formmatedDate(
            new Date(Date.now() - 864e5 * 2)
        );

        const response = await axios.get(
            getCurrencyDataURL(params.symbol, todayFormat, yesterdayFormat)
        );

        const yesterdayData = await axios.get(
            getCurrencyDataURL(
                params.symbol,
                yesterdayFormat,
                dayBeforeLastFormat
            )
        );

        const res = await axios.get(
            `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${params.symbol.toUpperCase()}&tsym=USD&limit=24&toTs=-1&api_key=d9d34cf88d1fc50c8d8d16f867eef794a92f7f01f1fd85856a788a52a1c78aba`
        );

        return {
            props: {
                data: response.data.results[0],
                yesterdayData: yesterdayData.data.results[0],
                chartData: res.data.Data.Data,
                // chartData: [
                //     {
                //         time: '2018-10-19',
                //         open: 54.62,
                //         high: 55.5,
                //         low: 54.52,
                //         close: 54.9,
                //     },
                //     {
                //         time: '2018-10-22',
                //         open: 55.08,
                //         high: 55.27,
                //         low: 54.61,
                //         close: 54.98,
                //     },
                //     {
                //         time: '2018-10-23',
                //         open: 56.09,
                //         high: 57.47,
                //         low: 56.09,
                //         close: 57.21,
                //     },
                //     {
                //         time: '2018-10-24',
                //         open: 57.0,
                //         high: 58.44,
                //         low: 56.41,
                //         close: 57.42,
                //     },
                //     {
                //         time: '2018-10-25',
                //         open: 57.46,
                //         high: 57.63,
                //         low: 56.17,
                //         close: 56.43,
                //     },
                //     {
                //         time: '2018-10-26',
                //         open: 56.26,
                //         high: 56.62,
                //         low: 55.19,
                //         close: 55.51,
                //     },
                //     {
                //         time: '2018-10-29',
                //         open: 55.81,
                //         high: 57.15,
                //         low: 55.72,
                //         close: 56.48,
                //     },
                //     {
                //         time: '2018-10-30',
                //         open: 56.92,
                //         high: 58.8,
                //         low: 56.92,
                //         close: 58.18,
                //     },
                //     {
                //         time: '2018-10-31',
                //         open: 58.32,
                //         high: 58.32,
                //         low: 56.76,
                //         close: 57.09,
                //     },
                //     {
                //         time: '2018-11-01',
                //         open: 56.98,
                //         high: 57.28,
                //         low: 55.55,
                //         close: 56.05,
                //     },
                //     {
                //         time: '2018-11-02',
                //         open: 56.34,
                //         high: 57.08,
                //         low: 55.92,
                //         close: 56.63,
                //     },
                // ],
            },
        };
    } catch (err) {
        console.log('failed to fetch crypto details', err);
        return {
            props: {
                error: err,
            },
        };
    }
};
