import Image from 'next/image';
import { Currency } from '@/typings';
import { formattedPrice } from '../utils/format';

interface Props {
    crypto: Currency;
}

export default function PopulatCryptoPreview({ crypto }: Props) {
    if (!crypto) return <div className="popular-crypto-preview">loading</div>;

    return (
        <article className="popular-crypto-preview flex column space-between">
            <Image
                // ref={image}
                src={`/${crypto.S}.svg`}
                alt={crypto.S}
                className="icon-img"
                width={45}
                height={45}
            />
            <div className="title-sec flex ">
                <h1 className="stock-title">{crypto?.S}</h1>
                <p className="stock-subtitle">{crypto?.name || 'crypto'}</p>
            </div>
            <h1>{formattedPrice(crypto?.bp)}</h1>
        </article>
    );
}
