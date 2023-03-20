import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import User, { UserDocument } from '../../../model/user.schema';
import Transaction, { TransactionDocument } from '@/model/transaction.schema';
import { sendError } from 'next/dist/server/api-utils';

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { transaction } = req.body;
    console.log(transaction);

    try {
        const newTransaction: TransactionDocument | null =
            await Transaction.create(transaction);
        // user.transactions.push(transaction); // Add the transaction to the array
        // user.coins -= transaction.amount;
        // await user.save();
        res.status(200).json(newTransaction);
    } catch (error) {
        return sendError(res, 400, (error as Error).message);
    }
}
