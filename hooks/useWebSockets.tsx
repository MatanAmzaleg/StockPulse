import { useState, useEffect } from 'react';

export default function useWebSockets(symbols: string[]) {
    const [btc, setBtc] = useState(null);
    const [eth, setEth] = useState(null);

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
                    quotes: ['BTCUSD'],
                };
                socket.send(JSON.stringify(subscribe));
            }
            if (data[0].S === 'BTCUSD') {
                setBtc({ ...data[0], name: 'Bitcoin' });
                console.log(data[0]);
            }
            if (data[0].S === 'ETHUSD') {
                setBtc({ ...data[0], name: 'Etherium' });
                console.log(data[0]);
            }
        };

        socket.onclose = () => {
            console.log('lost connection');
        };
    }, []);

    return { btc };
}
