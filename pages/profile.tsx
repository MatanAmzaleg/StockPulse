import CryptoCard from '@/components/CryptoCard';
import TransactionPreview from '@/components/TransactionPreview';
import useAuth from '@/hooks/useAuth';
import useWebSockets from '@/hooks/useWebSockets';

export default function profile() {
    const transactions = [
        {
            action: 'buy',
            symbol: 'btc',
            symbolName: 'Bitcoin',
            date: 126319289,
            status: 'approved',
            quantity: 1723,
            price: 300,
        },
        {
            action: 'sell',
            symbol: 'btc',
            symbolName: 'Bitcoin',
            date: 126319289,
            status: 'approved',
            quantity: 1723,
            price: 300,
        },
        {
            action: 'buy',
            symbol: 'btc',
            symbolName: 'Bitcoin',
            date: 126319289,
            status: 'pending',
            quantity: 1723,
            price: 300,
        },
    ];

    const userCurrencies = [
        {
            symbol: 'btc',
            symbolName: 'bitcoin',
            amount: 1.23,
        },
        {
            symbol: 'eth',
            symbolName: 'ethereium',
            amount: 123,
        },
        {
            symbol: 'sushi',
            symbolName: 'Sushi',
            amount: 5322,
        },
        // {
        //     symbol: 'sushi',
        //     symbolName: 'Sushi',
        //     amount: 5322,
        // },
        // {
        //     symbol: 'sushi',
        //     symbolName: 'Sushi',
        //     amount: 5322,
        // },
    ];

    const { user } = useAuth();
    const { currencies } = useWebSockets(
        userCurrencies.map((currency) =>
            (currency.symbol + 'usd').toLocaleUpperCase()
        )
    );

    return (
        <section className="profile-section">
            <header className="profile-header">
                <div className="profile-user">
                    <p className="greet">Good Morning</p>
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
                    <h1 className="portfolio-worth">1342.15$</h1>
                    <h2>
                        Change: <span className="scending">14.75% | 150$</span>{' '}
                    </h2>
                </div>
                <div className="card my-cryptos flex column space-between">
                    <h1>My Cryptos:</h1>
                    <div className="cryptos flex column">
                        {userCurrencies.map((currency) => (
                            <CryptoCard
                                price={
                                    currencies[
                                        (
                                            currency.symbol + 'USD'
                                        ).toLocaleUpperCase() as keyof typeof currencies
                                    ]?.bp
                                }
                                currency={currency}
                            />
                        ))}
                    </div>
                </div>
                <div className="card transaction-container">
                    <h1>Transacrion History</h1>
                    <div className="transaction-list">
                        <div className="transaction-preview">
                            <p className="heading">Currency</p>
                            <p className="heading">Action</p>
                            <p className="heading">Date</p>
                            <p className="heading">Price</p>
                            <p className="heading">Quantity</p>
                            <p className="heading">Status</p>
                        </div>
                        {/* <TransactionPreview transaction={user.transactions}/> */}
                        {transactions.map((t) => (
                            <TransactionPreview transaction={t} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
