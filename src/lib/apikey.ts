import mongoose from "mongoose";
import Apikey from "../models/apikey";
import { CloseDB, OpenDB } from "./connection";
import { generateUUID } from "./generate";

export const handleApikey = async (id: string, close: boolean = true) => {
  try {
    const apikey = await Apikey.findOne({ id });

    if (!apikey) return false;

    if (apikey.limit.use + 1 > apikey.limit.max)
      throw new Error("Max limit uses");
    await Apikey.findOneAndUpdate(
      { id },
      { $set: { "limit.use": apikey.limit.use + 1 } }
    );

    return true;
  } catch (error) {
    throw new Error("Error on handle Apikey");
  } finally {
    if (close) await CloseDB();
  }
};

export const CreateApikey = async (name: string, close: boolean = true) => {
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
    if (close) await CloseDB();
  }
};
