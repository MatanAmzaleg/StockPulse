import mongoose from 'mongoose';

interface Connection {
    isConnected?: number;
}

const connection: Connection = {};

async function connect(): Promise<void> {
    if (connection.isConnected) return;

    const db = await mongoose.connect(`${process.env.MONGO_DB_ATLAS_URL}`);

    connection.isConnected = db.connections[0].readyState;
}

export default connect;
