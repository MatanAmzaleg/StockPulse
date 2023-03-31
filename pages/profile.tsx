import CryptoCard from '@/components/CryptoCard';
import TransactionPreview from '@/components/TransactionPreview';
import useAuth from '@/hooks/useAuth';
import useWebSockets from '@/hooks/useWebSockets';
import { Transaction } from '@/typings';
import { GetServerSidePropsContext } from 'next';
import {
    transactionAmount,
    calculateAllChange,
    getTotalTransactionsAmount,
    formattedPrice,
} from '@/utils/format';
import { useEffect, useState } from 'react';

export default function profile() {
    const { user } = useAuth();

    if (!user) return <div>Loading</div>;

    const { currencies } = useWebSockets(
        user!.currencies.map((c) => (c.currency + 'usd').toLocaleUpperCase())
    );
    const [greet, setGreet] = useState<string>('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            setGreet('Good Morning');
        } else if (hour >= 12 && hour < 19) {
            setGreet('Good Afternoon');
        } else if (hour >= 19 && hour < 23) {
            setGreet('Good Evening');
        } else {
            setGreet('Good Night');
        }
    }, []);

    const { totalUpdatedAmount, totalGain, totalUpdatedChange } =
        calculateAllChange(
            user?.currencies,
            currencies,
            getTotalTransactionsAmount(user.transactions)
        );

    return (
        <section className="profile-section">
            <header className="profile-header">
                <div className="profile-user">
                    <p className="greet">{greet}</p>
                    <h1>Welcom Back, {user?.fullName}</h1>
                </div>
                <div className="user-balance">
                    <h1>{user?.coins}$ PulseCoins</h1>
                    <p>Current balance</p>
                </div>
            </header>
            <div className="profile-grid">
                <div className="card crypto-portfolio flex column space-between">
                    <h1 className="bolder"> My Crypto portfolio:</h1>
                    <h1 className="portfolio-worth">
                        {formattedPrice(totalUpdatedAmount)}
                    </h1>
                    <h2>
                        Change:{' '}
                        <span className="ascending">
                            {totalUpdatedChange.toFixed(2) +
                                '%' +
                                ' | ' +
                                formattedPrice(totalGain)}
                        </span>{' '}
                    </h2>
                </div>
                <div className="card my-cryptos flex column">
                    <h1>Wallet</h1>
                    <section className="header flex space-between">
                        <div className="flex align-center">
                            <p className="bolder">Currency</p>
                        </div>
                        <p className="bolder">Amount</p>
                        <p className="bolder">USD worth</p>
                        <p className="bolder">Change</p>
                    </section>
                    <div className="cryptos flex column">
                        {user!.currencies.map((c) => (
                            <CryptoCard
                                totalBuyAmount={transactionAmount(
                                    user.transactions,
                                    c.currency
                                )}
                                price={
                                    currencies[
                                        (
                                            c.currency + 'USD'
                                        ).toLocaleUpperCase() as keyof typeof currencies
                                    ]?.bp
                                }
                                key={c.currency}
                                currency={c}
                            />
                        ))}
                    </div>
                </div>
                <div className="card transaction-container flex column">
                    <h1>Transacrion History</h1>
                    <div className="transaction-preview heading">
                        <p>Currency</p>
                        <p>Action</p>
                        <p>Date</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Status</p>
                    </div>
                    <div className="transaction-list">
                        {user!.transactions.map((t: Transaction) => (
                            <TransactionPreview key={t.date} transaction={t} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export const getServerSideProps = async ({
    req,
}: GetServerSidePropsContext) => {
    console.log('hello', req.headers.cookie);
    if (!req.headers.cookie?.includes('loggedInUser')) {
        console.log('goodbye', req.headers.cookie);

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
