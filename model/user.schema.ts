import mongoose, { Document, Model } from 'mongoose';
import { CurrencyObjectMap } from '@/typings';

export interface UserDocument extends Document {
    email: string;
    fullName: string;
    password: string;
    coins: number;
    currencies: CurrencyObjectMap;
    watchlist: [];
}

const userSchema = new mongoose.Schema<UserDocument>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    coins: {
        type: Number,
        required: false,
    },
    currencies: {
        type: Object,
        required: false,
    },
    watchlist: {
        type: [],
        required: false,
    },
});

const User: Model<UserDocument> =
    mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export default User;
