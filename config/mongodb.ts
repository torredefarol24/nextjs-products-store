import { MongoClient } from "mongodb"

declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined
}

const env = process.env.APP_ENV

const uri = env === "development" ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI_LCL

const options = {}

if (!uri) {
	throw new Error("Please add your Mongo URI to .env.local")
}

const client = new MongoClient(uri, options)
const clientPromise = client.connect()
const dbName = uri.split("/").pop()

export { clientPromise, dbName }
