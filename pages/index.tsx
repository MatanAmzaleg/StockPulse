import HotCryptoPreview from '@/components/HotCryptoPreview';
import PopularCryptoPreview from '@/components/PopularCryptoPreview';
import useWebSockets from '@/hooks/useWebSockets';
import { getCookie } from 'cookies-next';



const currenciesList = [
    'BTCUSD',
    'ETHUSD',
    'DOGEUSD',
    'USDTUSD',
    'SOLUSD',
    'SUSHIUSD',
    'YFIUSD',
];

export default function Home() {

    console.log(getCookie('loggedInUser'));
    
    const { currencies } = useWebSockets(currenciesList);

    if (!currencies) return   <img className='loader' src="/loader.gif" alt="" />;

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
                <h1 className="main-title">Popular this week</h1>
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
