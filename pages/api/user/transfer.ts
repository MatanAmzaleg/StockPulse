import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../services/back/db.service";
import { sendError } from "next/dist/server/api-utils";
import User, { UserDocument } from "@/model/user.schema";
import { buyTransaction } from "../../../services/back/user.service";

connect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, transaction, crypto } = req.body;
  console.log(transaction);

  try {
    const user: UserDocument | null = await User.findOne({ email });
    if (!user) return sendError(res, 400, "cannot find user");
    user.transactions.push(transaction); // Add the transaction to the array
    if (transaction.action === "buy") {
      user.coins -= transaction.price;
      buyTransaction(crypto)
    }
    await user.save();
    res.status(200).json({ message: "transfer" });
  } catch (error) {
    return sendError(res, 400, (error as Error).message);
  }
}
