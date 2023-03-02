import { Currency } from '@/typings';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface Props {
    crypto: Currency;
}

export default function PopulatCryptoPreview({ crypto }: Props) {
    const formattedPrice = (price: number) => {
        return price < 10
            ? '$' + price.toFixed(4)
            : new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
              }).format(price);
    };

    // const image = useRef<HTMLImageElement>();

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log(image?.current);
    //     }, 5000);
    // }, []);

    if (!crypto?.S) return <div className="">loading</div>;

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
