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
import { FaBeer } from 'react-icons/fa';
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
                    <button className='star-icon' onClick={(e) => onToggleWatchlist(e)}>
                        {/* <AiOutlineStar
                            className={`opt-icon ${
                                isOnWishlist ? 'mark' : ''
                            } `}
                        /> */}
                        {/* <AiOutlineStar className='opt-icon'></AiOutlineStar> */}
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
