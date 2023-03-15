export default function CryptoCard({ currency, price }: any) {
    const pricePerCoin = () => (price * currency.amount).toFixed(3);

    return (
        <section className="crypto-card-sec">
            <div className="flex align-center">
                <img src={`/${currency.symbol}.svg`} alt={currency.symbol} />
                <p className="bold">{currency.symbolName}</p>
            </div>
            <p className="scending">{currency.amount}</p>
            <p className="scending">{pricePerCoin()}</p>
            <p className="scending">10% | 88$</p>
        </section>
    );
}
