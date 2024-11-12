import mongoose, { Connection } from "mongoose";

let defaultConnection: Connection | null = null;

const mongo: string = process.env.MONGODB_URI ?? "";

export const OpenDB = async () => {
  try {
    if (defaultConnection) return defaultConnection;

    const db = await mongoose.connect(mongo);

    defaultConnection = db.connection;
    console.log("Connected to database");
  } catch (error) {
    console.error({
      error: "Connection Error",
    });
  }
};

export const CloseDB = async () => {
  try {
    if (!defaultConnection) return;

    await defaultConnection.close();
    defaultConnection = null;

    console.log("Close Database");
  } catch (error) {
    console.log({
      error: "Error on close database",
    });
  }
};
