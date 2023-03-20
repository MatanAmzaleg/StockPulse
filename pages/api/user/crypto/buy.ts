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
    console.log("buying cryptoooooooooo", email, crypto);

    try {
        const user: UserDocument | null = await User.findOne({
            email,
        });
        if (!user) return sendError(res, 404, 'User not found');

        if (!user.currencies[crypto.currency]) {
            user.currencies[crypto.currency] = crypto.amount;
            return;
        } else {
            user.currencies[crypto.currency] += crypto.amount;
        }

        console.log("buy user:::::::::::::::", user);
        

        await user.save(); // Save the updated user object
        res.status(200).json({ message: ' successfully buyed crypto' }); // Return a success response
    } catch (error) {
        return sendError(res, 400, (error as Error).message);
    }
}
