'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection("cet4")
	// console.log(collection);
	const res = await collection.limit(100).get()
	return res
};
