export default function CryptoCard({ currency }: any) {
    return (
        <section className="crypto-card-sec">
            <div className="flex align-center">
                <img src={`/${currency.symbol}.svg`} alt={currency.symbol} />
                <p className="bold">{currency.symbolName}</p>
            </div>
            <p className="scending">600.00$</p>
            <p className="scending">10% | 88$</p>
        </section>
    );
}
