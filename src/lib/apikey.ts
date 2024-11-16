import mongoose from "mongoose";
import Apikey from "../models/apikey";
import { CloseDB, OpenDB } from "./connection";
import { generateUUID } from "./generate";

export const handleApikey = async (id: string, close: boolean = true) => {
  try {
    const apikey = await Apikey.findOne({ id });

    if (!apikey) return false;
    await Apikey.findOneAndUpdate(
      { id },
      { $set: { "limit.use": apikey.limit.use + 1 } }
    );

    return true;
  } catch (error) {
    return { error: "Error handle apikey" };
  } finally {
    if (close) await CloseDB();
  }
};

export const CreateApikey = async (name: string) => {
  try {
    await OpenDB();
    const id = generateUUID(25);

    const apikey = new Apikey({
      _id: new mongoose.Types.ObjectId(),
      name,
      id,
    });
    await apikey.save();

    return await Apikey.findOne({ id });
  } catch (error) {
    return { error };
  } finally {
    await CloseDB();
  }
};
