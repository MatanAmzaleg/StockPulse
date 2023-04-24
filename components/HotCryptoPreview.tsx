import Image from 'next/image';
import Link from 'next/link';
import { Currency } from '@/typings';
import { formattedPrice } from '../utils/format';
import HotSkeleton from './skeleton/HotSkeleton';
import { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { Star } from './Star';
import { AiOutlineStar } from 'react-icons/ai';

interface Props {
    crypto: Currency;
}

export default function HotCryptoPreview({ crypto }: Props) {
    const graphRef = useRef(null);
    const [isOnWatchlist, setIsOnWatchlist] = useState<boolean>(false);
    const { addToWatchList, user } = useAuth();

    useEffect(() => {
        if (!user || user.watchlist?.length === 0 || !crypto) return;
        setIsOnWatchlist(user.watchlist.includes(crypto.S));
    }, [crypto]);

    const onToggleWatchlist = async (event: React.MouseEvent) => {
        event.preventDefault();
        console.log(crypto);
        
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
                        <AiOutlineStar className="opt-icon" />
                        {/* <Star isOnWatchlist={isOnWatchlist}></Star> */}
                    </button>
                </div>
                <div className="bottom-sec flex space-between align-center">
                    <div className="graph" ref={graphRef}></div>
                    <div className="">
                        <h2 className="price-title">
                            {formattedPrice(crypto.bp)}
                        </h2>
                    </div>
                </div>
            </article>
        </Link>
    );
}
