import { calculateChange2, formattedPrice } from "@/utils/format";
import Link from 'next/link';

export default function CryptoCard({ currency, price, totalBuyAmount }: any) {
  const pricePerCoin = () => (price * currency.amount).toFixed(3);
console.log(currency);

  return (
    <section className="crypto-card-sec align-center">
      <div className="flex align-center">
      <Link className="div flex align-center" href={`/crypto/${currency.currency}`}>
        <img src={`/${currency.currency}.svg`} alt={currency.currency} />
        <p className="bold">{currency.currency}</p>
      </Link>
      </div>
      <p>{currency.amount.toFixed("8")}</p>
      <p>{pricePerCoin()}</p>
      <p
        className={
          calculateChange2(+pricePerCoin(), totalBuyAmount) > 0
            ? "ascending"
            : "descending"
        }
      >
        {calculateChange2(+pricePerCoin(), totalBuyAmount).toFixed(2) + "%"} |{" "}
        {formattedPrice(+pricePerCoin() - totalBuyAmount)}
      </p>
    </section>
  );
}
