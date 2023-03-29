import { Transaction } from "@/typings";

export function formmatedDate(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export function dateTimeFormat(date: Date) {
    return date
        .toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        })
        .replace('at', ',');
}

export function formattedPrice(price: number) {
    return price < 10
        ? '$' + price.toFixed(4)
        : new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
          }).format(price);
}

export function calculateChange(openingPrice: number, currentPrice: number) {
    const percentageChange = (1 - currentPrice / openingPrice) * 100;

    return {
        percentage: Math.abs(percentageChange).toFixed(2) + '%',
        orderType: percentageChange > 0 ? 'ascending' : 'descending',
    };
}

export function avgTransaction(transactions : Transaction[] , currency : string) {
    let totalAmount = 0;
    let totalRate = 0;
  
    transactions.forEach((transaction) => {
      if (transaction.symbol === currency) {
        totalAmount += transaction.amount;
        totalRate += transaction.price * transaction.amount;
      }
    });
  
    return totalRate / totalAmount;
  }

  
  export function calculateChange2(currentPrice : number, avgPriceBuy : number) {
    const change = (currentPrice - avgPriceBuy) / avgPriceBuy * 100;
    return change;
  }

