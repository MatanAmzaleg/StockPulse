import Image from 'next/image';
import Link from 'next/link';
import { SlOptionsVertical } from 'react-icons/sl';
import { Currency } from '@/typings';
import { formattedPrice } from '../utils/format';

interface Props {
    crypto: Currency;
}

export default function HotCryptoPreview({ crypto }: Props) {
    if (!crypto) return <div className="hot-crypto-preview">loading</div>;

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
                    <SlOptionsVertical className="opt-icon"></SlOptionsVertical>
                </div>
                <div className="bottom-sec flex space-between align-center">
                    <div className="graph"></div>
                    <div className="">
                        <h2 className="price-title">
                            {formattedPrice(crypto.bp)}
                        </h2>
                        <h3>{crypto.as?.toFixed(2)}%</h3>
                    </div>
                </div>
            </article>
        </Link>
    );
}
