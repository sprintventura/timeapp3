"use server";

import { MongoClient } from "mongodb";
import { revalidatePath } from "next/cache";
const dbName = "worklog";
const collectionName = "hour_logs";
export const saveWorkLog = async (data: FormData) => {
	try {
		const name = data.get("name");
		const starttime = data.get("starttime");
		const endtime = data.get("endtime");
		const { db, close } = await getDb();
		await db.collection(collectionName).insertOne({
			name,
			starttime,
			endtime,
			createdAt: new Date(),
		});
		close();
		revalidatePath("/");
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const getWorkLog = async () => {
	try {
		const { db, close } = await getDb();
		const logs = await db.collection(collectionName).find().sort(
			{ _id: -1 }
		).toArray();
		close();
		return logs;
	} catch (e) {
		console.log(e);
		return [];
	}
};

const getDb = async () => {
	// get mongo db connection
	const uri = "mongodb://127.0.0.1:27017";
	const client = new MongoClient(uri);
	await client.connect();
	const db = client.db(dbName);
	return {
		db,
		close: async () => {
			await client.close();
		},
	};
};
