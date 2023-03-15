import mongoose from 'mongoose';

interface Connection {
    isConnected?: number;
}

const connection: Connection = {};

async function connect(): Promise<void> {
    try {
        if (connection.isConnected) {
            return;
        }

        console.log('logging error url', process.env.MONGO_DB_ATLAS_URL);

        const db = await mongoose.connect(`${process.env.MONGO_DB_ATLAS_URL}`);

        connection.isConnected = db.connections[0].readyState;
    } catch (e) {
        console.log('could not connect to Mongodb database', e);
    }
}

export default connect;
