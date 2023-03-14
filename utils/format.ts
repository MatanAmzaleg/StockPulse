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


export function calculateChange(openingPrice : number, currentPrice : number) {
    const change = currentPrice ! / openingPrice !
    const percentageChange = (1 - change) * 100
    return percentageChange.toFixed(2) + '%'
  }
