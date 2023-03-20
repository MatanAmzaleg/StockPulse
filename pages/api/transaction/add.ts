import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import User, { UserDocument } from '../../../model/user.schema';
import Transaction, { TransactionDocument } from '@/model/transaction.schema';
import { sendError } from 'next/dist/server/api-utils';

const db = connect().then((res) => res);
console.log(db);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { transactionCred } = req.body;
    console.log(transactionCred);

    try {
        const transaction: TransactionDocument | null =
            await Transaction.create(transactionCred);

        // user.transactions.push(transaction); // Add the transaction to the array
        // user.coins -= transaction.amount;
        // await user.save();
        res.status(200).json(transaction);
    } catch (error) {
        return sendError(res, 400, (error as Error).message);
    }
}
