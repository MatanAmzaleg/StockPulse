import { CurrencyObjectMap, Transaction, Crypto } from '@/typings';

export function buyTransaction(crypto: Crypto, currencies: Array<Crypto>) {
    console.log('buyTransaction', crypto, currencies);
    const currencyIdx = currencies.findIndex(
        (c) => c.currency === crypto.currency
    );
    if (currencyIdx === -1) {
        currencies.push(crypto);
        return currencies;
    }

    console.log(currencyIdx);
    console.log(
        typeof currencies[currencyIdx].amount,
        typeof crypto.amount,
        currencies[currencyIdx].amount + crypto.amount
    );

    currencies[currencyIdx] = {
        currency: currencies[currencyIdx].currency,
        amount: currencies[currencyIdx].amount + crypto.amount,
    };

    return currencies;
}

export function sellTransaction(crypto: Crypto, currencies: Array<Crypto>) {
    console.log('sellTransaction', crypto, currencies);
    const currencyIdx = currencies.findIndex(
        (c) => c.currency === crypto.currency
    );
    if (currencyIdx === -1) {
        return currencies;
    }
    if (currencies[currencyIdx].amount === crypto.amount) {
        delete currencies[currencyIdx];
    } else {
        currencies[currencyIdx] = {
            currency: currencies[currencyIdx].currency,
            amount: currencies[currencyIdx].amount - crypto.amount,
        };
    }
    return currencies;
}
