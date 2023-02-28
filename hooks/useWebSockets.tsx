import { useState } from 'react';

export default function useWebSockets(symbols: string[]) {
    const [crypto, setCrypto] = useState(null);

    const url = 'wss://stream.data.alpaca.markets/v1beta1/crypto';
    const socket = new WebSocket(url);

    socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data[0].msg === 'connected') {
            const authMessage = {
                action: 'auth',
                key: process.env.NEXT_PUBLIC_ALPACA_KEY,
                secret: process.env.NEXT_PUBLIC_ALPACA_SECRET,
            };
            socket.send(JSON.stringify(authMessage));
        }
        if (data[0].msg === 'authenticated') {
            const subscribe = {
                action: 'subscribe',
                // trades: ['AAPL'],
                quotes: [...symbols],
                // bars: ['ETHUSD'],
            };
            socket.send(JSON.stringify(subscribe));
        }
        for (let key in data) {
            const type = data[key].T;

            if (type === 'q') {
                console.log('got a quote');
                setCrypto(data[key]);
            }
        }
    };

    socket.onclose = () => {
        console.log('bye');
    };
    return { crypto };
}
