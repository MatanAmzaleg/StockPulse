import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../../services/back/db.service";
import User, { UserDocument } from "../../../../model/user.schema";

connect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, transaction } = req.body;
  console.log(email, transaction);

  try {
    const user: UserDocument | null = await User.findOne({
      email,
    });
    if (!user) {
      return sendError(res, "User not found", 404);
    }
    user.transactions.push(transaction); // Add the transaction to the array
    user.coins -= transaction.amount
    await user.save();
    res.status(200).json({ message: "Transaction added successfully" }); // Return a success response
  } catch (error) {
    return sendError(res, (error as Error).message);
  }
}

function sendError(res: NextApiResponse, error: string, status: number = 400) {
  return res.status(status).json({ error });
}
