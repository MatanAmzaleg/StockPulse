import { Currencies, Currency } from '@/typings';
import { useState, useEffect } from 'react';

export default function useWebSockets(symbols: string[]) {
    console.log(symbols);

    const [currencies, setCurrencies] = useState<Currencies>({});

    const updateCurrencies = (crypto: Currency) => {
        currencies[crypto.S as keyof typeof currencies] = crypto;
        setCurrencies({ ...currencies });
    };

    const handleData = (crypto: Currency) => {
        if (!crypto.S) return;

        const delay = 1000 * 3; //3ms
        const prevCurrency = currencies[crypto.S as keyof typeof currencies];

        if (prevCurrency?.t) {
            const incomingTS = new Date(crypto.t).getTime();
            const prevTS = new Date(prevCurrency.t).getTime();

            if (incomingTS - prevTS >= delay) updateCurrencies(crypto);
        } else {
            updateCurrencies(crypto);
        }
    };

    useEffect(() => {
        const url = 'wss://stream.data.alpaca.markets/v1beta1/crypto';
        const socket = new WebSocket(url);

        socket.onopen = () => {
            const authMessage = {
                action: 'auth',
                key: process.env.NEXT_PUBLIC_ALPACA_KEY,
                secret: process.env.NEXT_PUBLIC_ALPACA_SECRET,
            };
            socket.send(JSON.stringify(authMessage));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);

            if (data[0].msg === 'authenticated') {
                const subscribe = {
                    action: 'subscribe',
                    quotes: symbols,
                };
                socket.send(JSON.stringify(subscribe));
            }

            handleData(data[0]);
        };

        socket.onclose = () => {
            console.log('lost connection');
        };
        return () => {
            socket.close();
        };
    }, []);

    return { currencies };
}
