import { Currencies, Currency } from '@/typings';
import { useState, useEffect } from 'react';

export default function useWebSockets(symbols: string[]) {
    const [currencies, setCurrencies] = useState<Currencies>({});

    const handleData = (crypto: Currency) => {
        if (!crypto.S) return;
        currencies[crypto.S as keyof typeof currencies] = crypto;
        setCurrencies({ ...currencies });
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
            if (data[0].msg === 'authenticated') {
                const subscribe = {
                    action: 'subscribe',
                    quotes: symbols,
                };
                socket.send(JSON.stringify(subscribe));
            }
            console.log(data);

            handleData(data[0]);
        };

        socket.onclose = () => {
            console.log('lost connection');
        };
    }, []);

    return { currencies };
}
