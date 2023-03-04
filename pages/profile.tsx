import TransactionPreview from '@/components/TransactionPreview';

export default function profile() {
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
                <div className="card">hello</div>
                <div className="card">hello</div>
                <div className="card">hello</div>
                <div className="card transaction-container">
                    <h1>Transacrion History</h1>
                    <div className="transaction-list">
                        {/* <TransactionPreview transaction={user.transactions}/> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
