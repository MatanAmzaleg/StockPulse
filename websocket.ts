export function connectToAlpacaStream() {
    const url = 'wss://api.alpaca.markets/stream';
    const socket = new WebSocket(url);

    socket.addEventListener('open', (event) => {
        const authMessage = {
            action: 'authenticate',
            data: {
                key_id: process.env.NEXT_PUBLIC_ALPACA_KEY,
                secret_key: process.env.NEXT_PUBLIC_ALPACA_SECRET,
            },
        };
        socket.send(JSON.stringify(authMessage));
        const subscribeMessage = {
            action: 'listen',
            data: {
                streams: ['trade_updates'],
            },
        };
        socket.send(JSON.stringify(subscribeMessage));
        const listenMessage = {
            action: 'listen',
            data: {
                streams: ['T.TSLA'],
            },
        };
        socket.send(JSON.stringify(listenMessage));
    });

    socket.onmessage = async ({ data }) => {
        const message = await data.text();
        const { data: datas } = JSON.parse(message);
        console.log(datas);
    };

    socket.onclose = () => {
        console.log('WebSocket disconnected');
    };
}
