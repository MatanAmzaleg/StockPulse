import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../../services/back/db.service';
import User, { UserDocument } from '../../../../model/user.schema';
import { sendError } from 'next/dist/server/api-utils';

connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, crypto } = req.body;
    console.log(email, 'sell crypto', crypto);

    try {
        console.log('selling crypto');

        const user: UserDocument | null = await User.findOne({
            email,
        });
        if (!user) return sendError(res, 404, 'User not found');

        if (!user.currencies[crypto.currency]) return;
        else {
            console.log('found');

            if (user.currencies[crypto.currency] === crypto.amount) {
                delete user.currencies[crypto.currency];
                console.log('deleting');
            } else {
                console.log('amount: ', user.currencies[crypto.currency]);
                user.currencies[crypto.currency] -= crypto.amount;

                console.log('amount: ', user.currencies[crypto.currency]);
            }
        }
        // await User.updateOne({ email }, { $set: { user } });
        await user.save();
        console.log(user);

        res.status(200).json({ message: 'Transaction added successfully' }); // Return a success response
    } catch (error) {
        return sendError(res, 400, (error as Error).message);
    }
}
