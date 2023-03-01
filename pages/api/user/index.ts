import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const users = { name: 'guy' };
        // const users = await userService.query(filterBy)
        res.send(users);
    } catch (err) {
        // res.status(500).send({ err: 'Failed to get users' })
    }
}
