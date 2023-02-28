import HotCryptoList from './HotCryptoList';
import SmallStockCard from './SmallStockCard';
import { useEffect, useState } from 'react';
import useWebSockets from '@/hooks/useWebSockets';
import HotCryptoPreview from './HotCryptoPreview';

export default function MainContent() {
    const { currencies } = useWebSockets(['BTCUSD', 'ETHUSD', 'DOGEUSD']);

    const hotCryptoList = [
        { title: 'btc', subtitle: 'bitcoin', price: 100, percent: 20 },
        { title: 'eth', subtitle: 'etherium', price: 100, percent: 20 },
    ];

    return (
        <section className="main-content-sec flex column">
            <h1 className="main-title">Stock Market</h1>
            <p className="subtitle">Trending market group</p>
            {/* <HotCryptoList hotList={[cur]}></HotCryptoList> */}
            <div className="hot-crypto-list flex">
                <HotCryptoPreview crypto={currencies.BTCUSD!} />
                <HotCryptoPreview crypto={currencies.ETHUSD!} />
                <HotCryptoPreview crypto={currencies.DOGEUSD!} />
            </div>

            <section className="most-popular-sec">
                <h1 className="main-title">Most popular week</h1>
                <section className="little-cards-sec flex space-between">
                    <SmallStockCard></SmallStockCard>
                </section>
            </section>
        </section>
    );
}
