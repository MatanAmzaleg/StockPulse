import mongoose, { Document, Model } from 'mongoose';

export interface TransactionDocument extends Document {
    id?: string;
    email: string;
    action: string;
    symbol: string;
    symbolName: string;
    date: number;
    status: string;
    amount: number;
    price: number;
}

const transactionSchema = new mongoose.Schema<TransactionDocument>({
    email: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    symbolName: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Transaction: Model<TransactionDocument> =
    mongoose.models.Transaction ||
    mongoose.model<TransactionDocument>('Transaction', transactionSchema);

export default Transaction;
