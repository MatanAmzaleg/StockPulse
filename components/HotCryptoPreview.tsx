import Image from 'next/image';
import Link from 'next/link';
import { SlOptionsVertical } from 'react-icons/sl';
import { AiOutlineStar } from 'react-icons/ai';
import { Currency } from '@/typings';
import {
    formattedPrice,
    formmatedDate,
    dateTimeFormat,
    calculateChange,
} from '../utils/format';
import HotSkeleton from './skeleton/HotSkeleton';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getCurrencyDataURL } from '@/utils/requests';
import useAuth from '@/hooks/useAuth';
import { Star } from './Star';

interface Props {
    crypto: Currency;
    currencyKey: String;
}

export default function HotCryptoPreview({ crypto, currencyKey }: Props) {
    const graphRef = useRef(null);
    const [isOnWatchlist, setIsOnWatchlist] = useState<boolean>(false);
    const { addToWatchList, user } = useAuth();

    // useEffect(() => {
    //     // const start =  formmatedDate();
    //     // console.log(start);

    //     // axios
    //     //     .get(`https://data.sandbox.alpaca.markets/v1beta2/crypto/bars`, {
    //     //         params: {
    //     //             symbols: 'BTCUSD,EYHUSD',
    //     //             timeframe: '1Min',
    //     //             start: '2023-03-04T18:37:16.506Z',
    //     //         },
    //     //         headers: {
    //     //             'APCA-API-KEY-ID': process.env.NEXT_PUBLIC_ALPACA_KEY,
    //     //             'APCA-API-SECRET-KEY':
    //     //                 process.env.NEXT_PUBLIC_ALPACA_SECRET,
    //     //         },
    //     //     })
    //     //     .then((response) => {
    //     //         console.log(response);
    //     //     })
    //     //     .catch((error) => {
    //     //         console.error('failed to fetch data', error);
    //     //     });

    //     if (graphRef.current) {
    //         const chart = createChart(graphRef.current!, {
    //             crosshair: {
    //                 mode: CrosshairMode.Normal,
    //             },
    //         });
    //         const lineSeries = chart.addCandlestickSeries();
    //         lineSeries.setData([
    //             {
    //                 time: '2018-10-19',
    //                 open: 54.62,
    //                 high: 55.5,
    //                 low: 54.52,
    //                 close: 54.9,
    //             },
    //             {
    //                 time: '2018-10-22',
    //                 open: 55.08,
    //                 high: 55.27,
    //                 low: 54.61,
    //                 close: 54.98,
    //             },
    //             {
    //                 time: '2018-10-23',
    //                 open: 56.09,
    //                 high: 57.47,
    //                 low: 56.09,
    //                 close: 57.21,
    //             },
    //             {
    //                 time: '2018-10-24',
    //                 open: 57.0,
    //                 high: 58.44,
    //                 low: 56.41,
    //                 close: 57.42,
    //             },
    //             {
    //                 time: '2018-10-25',
    //                 open: 57.46,
    //                 high: 57.63,
    //                 low: 56.17,
    //                 close: 56.43,
    //             },
    //             {
    //                 time: '2018-10-26',
    //                 open: 56.26,
    //                 high: 56.62,
    //                 low: 55.19,
    //                 close: 55.51,
    //             },
    //             {
    //                 time: '2018-10-29',
    //                 open: 55.81,
    //                 high: 57.15,
    //                 low: 55.72,
    //                 close: 56.48,
    //             },
    //             {
    //                 time: '2018-10-30',
    //                 open: 56.92,
    //                 high: 58.8,
    //                 low: 56.92,
    //                 close: 58.18,
    //             },
    //             {
    //                 time: '2018-10-31',
    //                 open: 58.32,
    //                 high: 58.32,
    //                 low: 56.76,
    //                 close: 57.09,
    //             },
    //             {
    //                 time: '2018-11-01',
    //                 open: 56.98,
    //                 high: 57.28,
    //                 low: 55.55,
    //                 close: 56.05,
    //             },
    //             {
    //                 time: '2018-11-02',
    //                 open: 56.34,
    //                 high: 57.08,
    //                 low: 55.92,
    //                 close: 56.63,
    //             },
    //         ]);
    //     }
    // }, [graphRef.current]);

    useEffect(() => {
        if (!user || user.watchlist?.length === 0 || !crypto) return;
        setIsOnWatchlist(user.watchlist.includes(crypto.S));
    }, [crypto]);

    const onToggleWatchlist = async (event: React.MouseEvent) => {
        event.preventDefault();
        const res = await addToWatchList(crypto.S);
        console.log(res);

        setIsOnWatchlist(res.isOnWatchlist);
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

    if (!crypto) return <HotSkeleton />;

    return (
        <Link className="hot-crypto-preview" href={`/crypto/${crypto.S}`}>
            <article>
                <div className="upper-sec flex align-center">
                    <Image
                        src={`/${crypto.S}.svg`}
                        alt="apple"
                        className="icon-img"
                        width={50}
                        height={50}
                    />
                    <div className="title-sec flex column">
                        <h2 className="stock-title">{crypto.S}</h2>
                        <p className="stock-subtitle">
                            {crypto.name || 'coin'}
                        </p>
                    </div>
                    {/* <button onClick={openActions}>
                        <SlOptionsVertical className="opt-icon"></SlOptionsVertical>

                        {isOpen && (
                            <div className="actions">
                                <button
                                    onClick={() => addToWatchList(crypto.S)}
                                >
                                    add
                                </button>
                            </div>
                        )}
                    </button> */}
                    <button onClick={(e) => onToggleWatchlist(e)}>
                        {/* <AiOutlineStar
                            className={`opt-icon ${
                                isOnWishlist ? 'mark' : ''
                            } `}
                        /> */}
                        <Star isOnWatchlist={isOnWatchlist}></Star>
                    </button>
                </div>
                <div className="bottom-sec flex space-between align-center">
                    <div className="graph" ref={graphRef}>
                        {/* <p>{ohlc.o}</p>
                        <p>{ohlc.c}</p> */}
                    </div>
                    <div className="">
                        <h2 className="price-title">
                            {formattedPrice(crypto.bp)}
                        </h2>
                        {/* <h3>{calculateChange(, crypto.ap)}</h3> */}
                    </div>
                </div>
            </article>
        </Link>
    );
}
