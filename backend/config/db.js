import mongoose from "mongoose";

const connectDB = async (dbName, username, password) => {

  const MONGO_URI = `mongodb+srv://${username}:${password}@hameed.20n99cb.mongodb.net/${dbName}`;

  try {
    const conn = await mongoose.connect(MONGO_URI, {});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
export default connectDB;











// import mongoose from "mongoose";

// const ConnectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
// );
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// }