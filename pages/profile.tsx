import CryptoCard from '@/components/CryptoCard';
import TransactionPreview from '@/components/TransactionPreview';

export default function profile() {
    const transactions = [
        {
            action: 'buy',
            symbol: 'btc',
            date: 126319289,
            status: 'approved',
            quantity: 1723,
            price: 300,
        },
        {
            action: 'sell',
            symbol: 'btc',
            date: 126319289,
            status: 'approved',
            quantity: 1723,
            price: 300,
        },
        {
            action: 'buy',
            symbol: 'btc',
            date: 126319289,
            status: 'waiting to confirm',
            quantity: 1723,
            price: 300,
        },
    ];
    return (
        <section className="profile-section">
            <header className="profile-header">
                <div className="profile-user">
                    <p className="greet">Good Morning</p>
                    <h1>Welcom Back, Smith</h1>
                </div>
                <div className="user-balance">
                    <h1>1000$ PulseCoins</h1>
                    <p>Current balance</p>
                </div>
            </header>
            <div className="profile-grid">
                <div className="card crypto-portfolio flex column space-between">
                    <h1 className="bolder"> My Crypto portfolio:</h1>
                    <h1 className="portfolio-worth">1342.15$</h1>
                    <h2>
                        Change: <span className="scending"> 14.75% | 150$</span>{' '}
                    </h2>
                </div>
                <div className="card my-cryptos flex column space-between">
                    <h1>My Cryptos:</h1>
                    <div className="cryptos flex column">
                        <CryptoCard></CryptoCard>
                        <CryptoCard></CryptoCard>
                        <CryptoCard></CryptoCard>
                        <CryptoCard></CryptoCard>
                    </div>
                </div>
                <div className="card transaction-container">
                    <h1>Transacrion History</h1>
                    <div className="transaction-list">
                        <div className="transaction-preview">
                            <p className="heading">Action</p>
                            <p className="heading">Currency</p>
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
