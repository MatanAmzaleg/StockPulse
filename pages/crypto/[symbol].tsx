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

    const handleTransaction = async(method : string, number : number) => {
      try{    
        const res = await fetch(`/api/user/getcoins?username=${getCookie('loggedInUser')}`)
        const userCoins = await res.json();
        console.log(userCoins);
        
        console.log("ok");
        const buyPrice = alpacaCrypto?.ap
        const amount = number
        
        console.log(number);
      }catch(err){
        console.log("failed to set transaction", err);
      }
      
      
    }

    if (!currencies || !data || !yesterdayData) {
        console.log('here now', currencies, data, yesterdayData);
        return <img className="loader" src="/loader.gif" alt="" />;
    }

    const [oc, setOc] = useState({ open: data.o, close: data.c, ts: data.t });
    const alpacaCrypto =
        currencies[(symbol + 'USD').toUpperCase() as keyof typeof currencies];
    console.log("symbol",symbol,"alpacaCrypto", alpacaCrypto, "data", data);

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
                <div className="card actions flex column">
                  <div className="input-container">
                  <input type="number" className='transaction-input'  onChange={(e) => setInputValue(parseFloat(e.target.value) )}/>
                  </div>
                  <div className="flex">
                    <button className="buy" onClick={() => handleTransaction('buy', inputValue)}>Buy</button>
                    <button className="sell" onClick={() => handleTransaction('sell', inputValue)}>Sell</button>
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
