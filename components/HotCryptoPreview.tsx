import Image from 'next/image';
import Link from 'next/link';
import { SlOptionsVertical } from 'react-icons/sl';
import { Currency } from '@/typings';

interface Props {
    crypto: Currency;
}

export default function HotCryptoPreview({ crypto }: Props) {
    const formattedPrice = (price: number) => {
        return price < 10
            ? '$' + price.toFixed(4)
            : new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
              }).format(price);
    };

    if (!crypto?.S) return <div className="">loading</div>;

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
                            {crypto.name || 'crypto'}
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
                        <h3>{crypto.as.toFixed(2)}%</h3>
                    </div>
                </div>
            </article>
        </Link>
    );
}
