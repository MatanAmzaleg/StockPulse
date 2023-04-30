import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import { sendError } from 'next/dist/server/api-utils';
import User, { UserDocument } from '@/model/user.schema';
import {
    buyTransaction,
    checkBuyStatus,
    sellTransaction,
} from '../../../services/back/user.service';

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, transaction, crypto } = req.body;
    console.log(transaction);

    try {
        const user: UserDocument | null = await User.findOne({ email });
        if (!user) return sendError(res, 400, 'cannot find user');

        if (transaction.action === 'buy') {
            user.transactions.unshift(transaction);
            user.currencies = buyTransaction(crypto, user.currencies);
            user.coins -= transaction.price;
        } else {
            console.log('selling');
            const sellTransactionDetails = sellTransaction(crypto, user.currencies)
            if(sellTransactionDetails.status) {
                user.transactions.unshift({...transaction, status:'denied'});
                res.status(200).json({ message: sellTransactionDetails.status })
            }
            else{
                user.currencies = sellTransactionDetails.currencies;
                user.coins += transaction.price;
            }
        }
        await user.save();
        res.status(200).json({ message: 'transfer' });
    } catch (error) {
        return sendError(res, 400, (error as Error).message);
    }
}
