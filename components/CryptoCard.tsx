export default function CryptoCard({ currency, price }: any) {
    const pricePerCoin = () => (price * currency.amount).toFixed(3);

    return (
        <section className="crypto-card-sec align-center">
            <div className="flex align-center">
                <img
                    src={`/${currency.currency}.svg`}
                    alt={currency.currency}
                />
                <p className="bold">{currency.currency}</p>
            </div>
            <p>{currency.amount}</p>
            <p>{pricePerCoin()}</p>
            <p className="scending">10% | 88$</p>
        </section>
    );
}
