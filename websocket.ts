export function connectToAlpacaStream(symbols: string[]) {
    const url = 'wss://stream.data.alpaca.markets/v1beta1/crypto';
    const socket = new WebSocket(url);
    let crypto: any = null;

    socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

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
        // console.log(data[0]);
        return data[0];
        // crypto = data[key];
        for (let key in data) {
            const type = data[key].T;
            if (type === 'q') {
                // console.log('got a quote');
            }
        }
        // console.log(crypto);
    };
    // return crypto;
}
