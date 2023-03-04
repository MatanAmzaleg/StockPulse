import mongoose, { Document, Model } from "mongoose";
import { Currency, Transaction } from "@/typings";

export interface UserDocument extends Document {
  email: string;
  fullName: string;
  password: string;
  coins: number;
  currencies: [];
  transactions: [];
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
    required: false,
  },
  currencies: {
    type: [],
    required: false,
  },
  transactions: {
    type: [],
    required: false,
  },
});

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
