import { CurrencyObjectMap, Transaction, Crypto } from "@/typings";

export function buyTransaction(crypto: Crypto, currencies: Array<Crypto>) {
  console.log("buyTransaction", crypto, currencies);
  const currencyIdx = currencies.findIndex(
    (c) => c.currency === crypto.currency
  );
  if (currencyIdx === -1) {
    currencies.push(crypto);
    return currencies;
  }

  currencies[currencyIdx] = {
    currency: currencies[currencyIdx].currency,
    amount: currencies[currencyIdx].amount + crypto.amount,
  };

  return currencies;
}

export function sellTransaction(crypto: Crypto, currencies: Array<Crypto>) {
  // console.log('sellTransaction', crypto, currencies);
  const currencyIdx = currencies.findIndex(
    (c) => c.currency === crypto.currency
  );
  if (currencyIdx === -1) {
    return { currencies };
  }
  if (currencies[currencyIdx].amount < crypto.amount) {
    return { status: "not enough cash", currencies };
  }
  if (currencies[currencyIdx].amount === crypto.amount) {
    delete currencies[currencyIdx];
  } else {
    currencies[currencyIdx] = {
      currency: currencies[currencyIdx].currency,
      amount: currencies[currencyIdx].amount - crypto.amount,
    };
  }
  return { status: "selled succesfully", currencies };
}

export function sellAllCrypto(
  crypto: Crypto,
  currencies: Array<Crypto>,
  buyPrice: number
) {
  const currencyIdx = currencies.findIndex(
    (c) => c.currency === crypto.currency
  );
  const selledAmount = currencies[currencyIdx].amount * buyPrice;
  const amount = currencies[currencyIdx].amount;
  const currency = currencies[currencyIdx].currency;
  currencies.splice(currencyIdx, 1);

  return {
    status: `${currency.toUpperCase()} worth $${selledAmount.toFixed(
      2
    )} has been sold succesfully.`,
    currencies,
    selledAmount,
    amount,
  };
}
