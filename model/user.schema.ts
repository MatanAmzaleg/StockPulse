import mongoose, { Document, Model } from "mongoose";

export interface UserDocument extends Document {
email: string;
password: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
email: {
type: String,
required: true,
unique: true,
},
password: {
type: String,
required: true,
},
});

const User: Model<UserDocument> =
mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;