import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, method, body } = req;
    const { id } = query;

    try {
        if (method === 'DELETE') {
            // await userService.remove(id)
            // res.send({ msg: 'Deleted successfully' })
        } else if (method === 'PUT') {
            // const savedUser = await userService.update(body)
            // res.send(savedUser)
        } else if (method === 'POST') {
        }
    } catch (err) {
        // res.status(500).send({ err: 'Failed to get users' })
    }
}
