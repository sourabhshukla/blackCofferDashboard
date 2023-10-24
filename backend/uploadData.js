import { config } from "dotenv";
import { MongoClient } from "mongodb";
import { data } from "./data.js";

config();
console.log(process.env.DB_URI);

async function connectToCluster(uri) {
  let monggoClient;
  try {
    monggoClient = new MongoClient(uri);
    console.log("Connection to MongoDB Atlas cluster....");
    await monggoClient.connect();
    console.log("Successfully connected to MongoDB Atlas");
    return monggoClient;
  } catch (err) {
    console.log("Connection to MongoDB Atlas failed!", err);
    process.exit();
  }
}

async function uploadData() {
  let mongoClient;
  const uri = process.env.MONGO_URI;
  try {
    mongoClient = await connectToCluster(uri);
    formatData();
    console.log("Data Upload Started...");
    const db = mongoClient.db("mockDatabase");
    const collection = db.collection("mockData");
    await collection.insertMany(data);
    console.log("Data Uploaded Successfully...");
  } catch (error) {
    console.log("Some thing went wrong", error);
  } finally {
    await mongoClient.close();
  }
}

function formatData() {
  const numericKeys = [
    "start_year",
    "end_year",
    "intensity",
    "impact",
    "relevance",
    "likelihood",
  ];
  data.forEach((item) => {
    Object.keys(item).forEach((key, idx) => {
      //      console.log(item);
      if (item[key] === "") {
        if (numericKeys.includes(key)) {
          item[key] = null;
        } else {
          item[key] = "Others";
        }
      }
    });
  });
}

uploadData();
