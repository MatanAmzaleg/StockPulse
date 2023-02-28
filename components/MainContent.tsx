import HotCryptoList from './HotCryptoList';
import SmallStockCard from './SmallStockCard';
import { useEffect, useState } from 'react';
import useWebSockets from '@/hooks/useWebSockets';
import HotCryptoPreview from './HotCryptoPreview';
import PopularCryptoPreview from './PopularCryptoPreview';

export default function MainContent() {
    const { currencies } = useWebSockets([
        'BTCUSD',
        'ETHUSD',
        'DOGEUSD',
        'USDTUSD',
        'SOLUSD',
        'SUSHIUSD',
        'YFIUSD',
    ]);

    return (
        <section className="main-content-sec flex column">
            <h1 className="main-title">Stock Market</h1>
            <p className="subtitle">Trending market group</p>
            <div className="hot-crypto-list flex">
                <HotCryptoPreview crypto={currencies.BTCUSD!} />
                <HotCryptoPreview crypto={currencies.ETHUSD!} />
                <HotCryptoPreview crypto={currencies.DOGEUSD!} />
            </div>

            <section className="most-popular-sec">
                <h1 className="main-title">Most popular week</h1>
                <section className="little-cards-sec flex">
                    <PopularCryptoPreview crypto={currencies.USDTUSD!} />
                    <PopularCryptoPreview crypto={currencies.SOLUSD!} />
                    <PopularCryptoPreview crypto={currencies.SUSHIUSD!} />
                    <PopularCryptoPreview crypto={currencies.YFIUSD!} />
                </section>
            </section>
        </section>
    );
}
