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
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import useAuth from '@/hooks/useAuth';

const candleStickOption = {
    ascendingColor: '#7326d2',
    descendingColor: '#c9c4d1',
};

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
    const [inputValue, setInputValue] = useState<number>(0);
    const { user } = useAuth();

    const { currencies } = symbol
        ? useWebSockets([(symbol + 'USD').toUpperCase()])
        : { currencies: {} };

    const selectDay = (day: string) => {
        setDay(day);
        const { o, c, t } = day === 'today' ? data : yesterdayData;
        setOc({ open: o, close: c, ts: t });
    };

    useEffect(() => {
        if (!graphRef.current) return;
        const { ascendingColor, descendingColor } = candleStickOption;

        const chart = createChart(graphRef.current!, {
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            // width: '100%',
        });
        const lineSeries = chart.addCandlestickSeries({
            upColor: ascendingColor,
            borderUpColor: ascendingColor,
            wickUpColor: ascendingColor,
            downColor: descendingColor,
            borderDownColor: descendingColor,
            wickDownColor: descendingColor,
            // borderRadius: 5,
        });
        lineSeries.setData(chartData);
        chart.timeScale().fitContent();
    }, [graphRef.current]);

    const handleTransaction = async (action: string) => {
        if (!user) return alert('please login first');

        if (action === 'buy' && inputValue > user.coins)
            return alert('need more cash to preform action');

        try {
            const userEmail = getCookie('loggedInUser');
            const res = await axios.get(
                `/api/user/getcoins?username=${userEmail}`
            );
            const userCoins = await res.data;

            console.log(userCoins);

            const transaction = {
                date: Date.now(),
                price: inputValue,
                amount: +(inputValue / alpacaCrypto?.ap!).toFixed(8),
                action,
                status: 'approved',
                symbol: alpacaCrypto?.S,
                symbolName: alpacaCrypto?.S,
            };
            const crypto = {
                currency: alpacaCrypto?.S,
                amount: +(inputValue / alpacaCrypto?.ap!).toFixed(8),
            };
            console.log('ok');

            await axios.post(`/api/user/transfer`, {
                email: user.email,
                transaction,
                crypto,
            });

            console.log(action);

            console.log(inputValue);
        } catch (err) {
            console.log('failed to set transaction', err);
        }
    };

    if (!currencies || !data || !yesterdayData) {
        console.log('here now', currencies, data, yesterdayData);
        return <img className="loader" src="/loader.gif" alt="" />;
    }

    const [oc, setOc] = useState({ open: data.o, close: data.c, ts: data.t });
    const alpacaCrypto =
        currencies[(symbol + 'USD').toUpperCase() as keyof typeof currencies];
    console.log('symbol', symbol, 'alpacaCrypto', alpacaCrypto, 'data', data);

    const [prevPrice, setPrevPrice] = useState([alpacaCrypto?.bp]);

    useEffect(() => {
        if (prevPrice.length > 1) prevPrice.push(alpacaCrypto?.bp);
        console.log(prevPrice);
    }, [alpacaCrypto?.bp]);

    if (!alpacaCrypto) {
        console.log('here');
        return <img className="loader" src="/loader.gif" alt="" />;
    }

    const { percentage, orderType } = calculateChange(data.o, alpacaCrypto?.ap);

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
                                src={`/${orderType}.svg`}
                                alt={orderType}
                                className={`arrow-img ${orderType}`}
                                width={20}
                                height={20}
                            ></Image>
                            <p className={orderType}>{percentage}</p>
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
                            <th>prev-Close</th>
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
                <div className="card actions flex column">
                    <div className="input-container">
                        <input
                            type="number"
                            className="transaction-input"
                            onChange={(e) =>
                                setInputValue(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <div className="flex">
                        <button
                            className="buy"
                            onClick={() => handleTransaction('buy')}
                        >
                            Buy
                        </button>
                        <button
                            className="sell"
                            onClick={() => handleTransaction('sell')}
                        >
                            Sell
                        </button>
                    </div>
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
