import HotCryptoPreview from '@/components/HotCryptoPreview';
import useAuth from '@/hooks/useAuth';
import useWebSockets from '@/hooks/useWebSockets';
import { Currency } from '@/typings';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

export default function Wishlist({currencies}: any) {
    const { user } = useAuth();

    if (!user) return <div>Loading</div>;

    // const router = useRouter();
    //   if (!user) router.push('/login')

    const watchlistCurrencies = user?.watchlist.map(
        (currency) => currency.toUpperCase() + 'USD'
    );

    return (
        <section className="wishlist-sec ">
            <header>
                <h1 className="main-title">My wishlist</h1>
                <p className="subtitle">Wishlist cryptos</p>
            </header>

            <section className="hot-crypto-sec">
                <section className="hot-crypto-list flex wrap">
                    {watchlistCurrencies?.map((currency, idx) => (
                        <HotCryptoPreview
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

export const getServerSideProps = async ({
    req,
}: GetServerSidePropsContext) => {
    if (!req.headers.cookie?.includes('loggedInUser')) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { user: '' },
    };
};
