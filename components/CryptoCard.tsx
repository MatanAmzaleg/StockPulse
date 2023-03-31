import { calculateChange2 } from '@/utils/format';

export default function CryptoCard({ currency, price, totalBuyAmount }: any) {
    console.log(totalBuyAmount);

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
            <p>{currency.amount.toFixed('8')}</p>
            <p>{pricePerCoin()}</p>
            <p
                className={
                    calculateChange2(+pricePerCoin(), totalBuyAmount) > 0
                        ? 'ascending'
                        : 'descending'
                }
            >
                {calculateChange2(+pricePerCoin(), totalBuyAmount).toFixed(2) +
                    '%'}{' '}
                | ${(+pricePerCoin() - totalBuyAmount).toFixed(2)}
            </p>
        </section>
    );
}
