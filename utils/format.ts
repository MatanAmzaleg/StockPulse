import { Currency, Transaction, Crypto } from "@/typings";

export function fotmattedTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    .replace("at", ",");
}

export function formmatedDate(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export function dateTimeFormat(date: Date) {
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    .replace("at", ",");
}

export function formattedPrice(price: number) {
  return price < 10
    ? "$" + price.toFixed(2)
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
}

export function calculateChange(openingPrice: number, currentPrice: number) {
  const percentageChange = (1 - currentPrice / openingPrice) * 100;
  return {
    percentage: Math.abs(percentageChange).toFixed(2) + "%",
    orderType: currentPrice > openingPrice ? "ascending" : "descending",
  };
}

export function transactionAmount(
  transactions: Transaction[],
  currency: string
) {
  let totalAmount = 0;

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    if (transaction.symbol === currency) {
      if (transaction.action === "sell-all") {
        break;
      }

      if (transaction.action === "buy" && transaction.status === "approved") {
        totalAmount += transaction.price;
      } else if (transaction.status !== "denied") {
        totalAmount -= transaction.price;
      }
    }
  }

  return totalAmount;
}

export function calculateChange2(currentPrice: number, avgPriceBuy: number) {
  if (currentPrice === 0) return 0;
  const change = ((currentPrice - avgPriceBuy) / avgPriceBuy) * 100;
  return change;
}

export function calculateAllChange(
  currencies: Crypto[],
  prices: any,
  totalTransactionsAmount: number
) {
  let totalUpdatedAmount = 0;
  currencies.forEach((c, idx) => {
    totalUpdatedAmount +=
      c.amount * prices[(c.currency + "usd").toUpperCase()]?.bp;
  });

  const totalUpdatedChange = calculateChange2(
    totalUpdatedAmount,
    totalTransactionsAmount
  );
  let totalGain;
  if (totalUpdatedAmount === 0) totalGain = 0;
  else totalGain = totalUpdatedAmount - totalTransactionsAmount;
  return {
    totalUpdatedAmount,
    totalGain,
    totalUpdatedChange,
  };
}

export function getTotalTransactionsAmount(transactions: Transaction[]) {
  let totalAmount = 0;
  const soldCryptos: string[] = [];

  transactions.forEach((transaction) => {
    if (soldCryptos.includes(transaction.symbol)) return;

    if (transaction.action === "sell-all") {
      soldCryptos.push(transaction.symbol);
      return;
    } else if (
      transaction.action === "buy" &&
      transaction.status === "approved"
    ) {
      totalAmount += transaction.price;
    } else if (transaction.status !== "denied") {
      totalAmount -= transaction.price;
    }
  });
  return totalAmount;
}

export function calculateGreet() {
  const hours = new Date().getHours();
  if (hours > 5 && hours < 12) {
    return "Good Morning";
  } else if (hours > 12 && hours < 18) {
    return "Good Afternoon";
  } else if (hours > 18 && hours < 23) {
    return "Good Evening";
  } else if (hours > 23 && hours < 5) {
    return "Good Night";
  }
}
