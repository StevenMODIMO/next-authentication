import mongoose from "mongoose";

export async function dbConnect() {
  await mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("database connected: 🚀");
    })
    .catch((error) => console.log(error));
}
