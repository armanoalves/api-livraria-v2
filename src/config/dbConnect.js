import mongoose from "mongoose";

mongoose.connect("mongodb+srv://armanoalves:963852741@cluster.vk10mjl.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;