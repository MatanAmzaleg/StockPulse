import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/back/db.service';
import User, { UserDocument } from '../../../model/user.schema';
import { sendError } from 'next/dist/server/api-utils';

connect();

export default async function handler(
    { method, query, body }: NextApiRequest,
    res: NextApiResponse
) {
    const { email, symbol } = body;
    if (!email || !symbol)
        sendError(res, 400, 'Please provide an email and a symbol');
    if (method !== 'POST') sendError(res, 405, 'Method not allowed');

    const user: UserDocument | null = await User.findOne({ email });
    if (!user) sendError(res, 400, 'User not found');

    const idx = user!.watchlist.findIndex((currency) => currency === symbol);
    let message: string = '';

    if (idx >= 0) {
        user?.watchlist.splice(idx, 1);
        message = 'Successfully removed from you watchlist';
    } else {
        user?.watchlist.push(symbol);
        message = 'Successfully added to you watchlist';
    }
    console.log(user);

    await user!.save();
    console.log(user);
    res.json({ message, isOnWatchlist: !(idx >= 0), newUser: user });
}
