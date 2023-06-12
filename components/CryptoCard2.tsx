import { calculateChange2, formattedPrice } from "@/utils/format";
import Link from "next/link";
import { parse } from "path";

export default function CryptoCard2({ currency, price, totalBuyAmount, handleTransaction }: any) {
  const pricePerCoin = () => (price * currency.amount).toFixed(3);

  return (
    <section className="crypto-card-sec2 flex align-center">
        <div className="column">

      <div className="flex align-center">
        <div className="div flex align-center">
          <p><span className="bolder">Amount:</span> {currency.amount.toFixed("6")}</p>
          <img src={`/${currency.currency}.svg`} alt={currency.currency} />
        </div>
      </div>
        <p><span className="bolder">Worth: </span>${pricePerCoin()}</p>
        {!currency ? (
            <h1>Lodaing...</h1>
            ) : (
                <p>
            <span className="bolder">Change: </span>
            <span className={
                calculateChange2(+pricePerCoin(), totalBuyAmount) > 0
                ? "ascending"
                : "descending"
            }>
            {calculateChange2(+pricePerCoin(), totalBuyAmount).toFixed(2) + "%"}{" "}
            | {formattedPrice(+pricePerCoin() - totalBuyAmount)}
            </span>
          </p>
        )}
        </div>
        <button className="sell" onClick={() => handleTransaction("sell-all")}>
              Sell all
            </button>
      
    </section>
  );
}
