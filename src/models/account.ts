import mongoose from "mongoose";

const AccSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    userID: { type: String },
    email: { type: String, required: true },
    money: { type: Number, default: 0 },
    password: { type: String },
    status: { type: String, default: "Status" },
    image: { type: String },
  },
  { timestamps: true }
);

let Account = mongoose.models?.Account || mongoose.model("Account", AccSchema);

export default Account;
