import { UserDocument } from '@/model/user.schema';
import axios from 'axios';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

export const userService = {
    addToWatchList,
    handleTransaction,
};

async function addToWatchList(email: string, symbol: String) {
    return await axios.post(`api/user/${email}`, symbol);
}

async function handleTransaction(
    email: string,
    price: number,
    action: string,
    cryptoPrice: number,
    symbol: string,
    buyPrice: number
) {
    try {
        const transaction = {
            date: Date.now(),
            price: price,
            amount: +(price / cryptoPrice).toFixed(8),
            action,
            status: 'approved',
            symbol: symbol,
            symbolName: symbol,
            buyPrice,
        };

        const crypto = {
            currency: symbol,
            amount: +(price / cryptoPrice).toFixed(8),
        };

        console.log(transaction);
        
        return await axios.post(`/api/user/transfer`, {
            email,
            transaction,
            crypto,
        });
    } catch (err) {
        console.log('failed to set transaction', err);
    }
}
