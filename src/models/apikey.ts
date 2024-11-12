import mongoose from "mongoose";

const ApikeySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    id: { type: String, required: true },
    access: { type: Array, default: [] },
    premium: { type: Boolean, default: false },
    limit: {
      use: { type: Number, default: 0 },
      max: { type: Number, default: 200 },
    },
  },
  { timestamps: true }
);

let Apikey = mongoose.models?.Apikey || mongoose.model("Apikey", ApikeySchema);

export default Apikey;
