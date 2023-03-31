import Image from 'next/image';
import { Currency } from '@/typings';
import { formattedPrice } from '../utils/format';
import Link from 'next/link';
import PopularSkeleton from './skeleton/PopularSkeleton';
import { AiOutlineStar } from 'react-icons/ai';

interface Props {
    crypto: Currency;
}

export default function PopularCryptoPreview({ crypto }: Props) {
    if (!crypto) return <PopularSkeleton />;

    return (
        <Link
            className="popular-crypto-preview flex column space-between"
            href={`/crypto/${crypto.S}`}
        >
            <AiOutlineStar className='opt-icon'></AiOutlineStar>
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
            <h1 className="price-title">{formattedPrice(crypto?.bp)}</h1>
        </Link>
    );
}
