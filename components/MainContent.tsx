import useWebSockets from '@/hooks/useWebSockets';
import useStockSocket from '@/hooks/useStockSocket';
import HotCryptoPreview from './HotCryptoPreview';
import PopularCryptoPreview from './PopularCryptoPreview';

const currenciesList = [
    'BTCUSD',
    'ETHUSD',
    'DOGEUSD',
    'USDTUSD',
    'SOLUSD',
    'SUSHIUSD',
    'YFIUSD',
];

export default function MainContent() {
    const { currencies } = useWebSockets(currenciesList);
    // const { stocks } = useStockSocket(['AAPL']);

    return (
        <section className="main-content-sec flex column">
            <h1 className="main-title">Stock Market</h1>
            <p className="subtitle">Trending market group</p>
            <button className="view-all">View All</button>
            <div className="hot-crypto-list flex">
                {currenciesList.slice(0, 3).map((currency) => (
                    <HotCryptoPreview
                        key={currency}
                        crypto={
                            currencies[currency as keyof typeof currencies]!
                        }
                    />
                ))}
            </div>

            <section className="most-popular-sec">
                <h1 className="main-title">Most popular week</h1>
                <section className="little-cards-sec flex">
                    {currenciesList.slice(3).map((currency) => (
                        <PopularCryptoPreview
                            key={currency}
                            crypto={
                                currencies[currency as keyof typeof currencies]!
                            }
                        />
                    ))}
                </section>
            </section>
        </section>
    );
}
