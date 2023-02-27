export default function useWebSockets() {
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

        const listenMessage = {
            action: 'listen',
            data: {
                streams: ['T.SPY'],
            },
        };
        socket.send(JSON.stringify(listenMessage));
    });

    socket.onmessage = async ({ data }) => {
        const message = await data.text();
        const msg = JSON.parse(message);
        console.log(msg);
    };

    socket.onclose = () => {
        console.log('WebSocket disconnected');
    };
    return {};
}
